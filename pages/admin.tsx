import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import superjson from 'superjson';
import { ArrowLeft, BadgeCheck, Ban, CheckCircle2, ClipboardList, Flag, HeartHandshake, LoaderCircle, LogOut, RefreshCw, ShieldCheck, Star, Users, XCircle } from 'lucide-react';
import { toast } from '../helpers/toast';
import styles from './admin.module.css';

async function readJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = superjson.parse<T & { error?: string }>(text);
  if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const session = await readJson<{ user: { role: string } | null }>(await fetch('/_api/auth/me', { cache: 'no-store' }));
      if (!session.user) { navigate('/login', { replace: true }); return; }
      if (session.user.role !== 'admin') { navigate('/dashboard', { replace: true }); return; }
      setData(await readJson<any>(await fetch('/_api/admin/overview', { cache: 'no-store' })));
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not load admin workspace.'); }
    finally { setLoading(false); }
  }, [navigate]);

  useEffect(() => { void load(); }, [load]);

  async function action(action: string, id: string, note?: string) {
    setBusyId(id);
    try {
      const result = await readJson<{ message: string }>(await fetch('/_api/admin/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: superjson.stringify({ action, id, ...(note ? { note } : {}) }) }));
      toast.success(result.message || 'Admin action completed.');
      await load();
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not complete that action.'); }
    finally { setBusyId(''); }
  }

  async function signOut() {
    try { await fetch('/_api/auth/logout', { method: 'POST' }); } finally { navigate('/login', { replace: true }); }
  }

  if (loading || !data) return <main className={styles.loading}><LoaderCircle size={30}/><p>Loading admin workspace…</p></main>;
  const stats = data.stats || {};
  return <main className={styles.page}>
    <header className={styles.topbar}><Link to="/" className={styles.brand}><span><HeartHandshake size={22}/></span>SkillConnect</Link><div className={styles.topActions}><Link to="/" className={styles.back}><ArrowLeft size={15}/> Public site</Link><button className={styles.outlineButton} onClick={() => void load()}><RefreshCw size={15}/> Refresh</button><button className={styles.outlineButton} onClick={signOut}><LogOut size={15}/> Sign out</button></div></header>
    <section className={styles.welcome}><div><span className={styles.kicker}>SKILLCONNECT CONTROL ROOM</span><h1>Admin overview</h1><p>Review worker profiles, moderate feedback, resolve reports and keep the local marketplace safe.</p></div><span className={styles.adminSeal}><ShieldCheck size={28}/></span></section>

    <section className={styles.stats}>{[
      {label:'Customers',value:stats.customers,icon:Users},{label:'Worker profiles',value:stats.workers,icon:BadgeCheck},{label:'Total bookings',value:stats.bookings,icon:ClipboardList},{label:'Completed jobs',value:stats.completed,icon:CheckCircle2},{label:'Awaiting verification',value:stats.pendingWorkers,icon:ShieldCheck},{label:'Flagged reviews',value:stats.flaggedReviews,icon:Flag},{label:'Open complaints',value:stats.openComplaints,icon:XCircle},{label:'Average rating',value:stats.averageRating||'—',icon:Star},
    ].map(({label,value,icon:Icon})=><article className={styles.statCard} key={label}><span><Icon size={18}/></span><small>{label}</small><strong>{value ?? 0}</strong></article>)}</section>

    <section className={styles.panel}><div className={styles.panelHeader}><div><span className={styles.kicker}>NEW APPLICATIONS</span><h2>Worker verification</h2><p>Only verified worker profiles are shown in public search.</p></div><span className={styles.count}>{data.workers?.length || 0} pending</span></div>
      {!data.workers?.length ? <div className={styles.empty}><CheckCircle2 size={28}/><b>All caught up!</b><p>No worker profiles are waiting for review.</p></div> : <div className={styles.tableList}>{data.workers.map((w:any)=><article className={styles.reviewCard} key={w.id}><div className={styles.personIcon}><Users size={18}/></div><div className={styles.mainInfo}><b>{w.name}</b><span>{w.skill} · {w.area}</span><p>{w.headline}</p><small>{w.email} · {w.experience} years · ₹{w.hourlyRate}/hr</small></div><div className={styles.rowActions}><button disabled={busyId===w.id} className={styles.primaryButton} onClick={()=>void action('verify-worker',w.id)}><CheckCircle2 size={14}/> Verify</button><button disabled={busyId===w.id} className={styles.dangerButton} onClick={()=>{const note=window.prompt('Reason for requesting changes (optional):')||'Please review your profile and try again.';void action('reject-worker',w.id,note)}}><XCircle size={14}/> Needs changes</button></div></article>)}</div>}
    </section>

    <div className={styles.twoPanels}><section className={styles.panel}><div className={styles.panelHeader}><div><span className={styles.kicker}>COMMUNITY TRUST</span><h2>Review moderation</h2><p>Flagged or pending reviews need a decision.</p></div><span className={styles.count}>{data.reviews?.length || 0}</span></div>
      {!data.reviews?.length ? <div className={styles.empty}><Star size={27}/><b>No reviews to moderate</b><p>New flagged reviews will appear here.</p></div> : <div className={styles.tableList}>{data.reviews.map((r:any)=><article className={styles.compactCard} key={r.id}><div className={styles.reviewRating}><Star size={14} fill="currentColor"/>{r.rating}/5</div><b>{r.customerName} → {r.workerName}</b><p>{r.text || 'Rating submitted without a comment.'}</p>{r.flagReason && <small>Flag reason: {r.flagReason}</small>}<div className={styles.rowActions}><button className={styles.primaryButton} disabled={busyId===r.id} onClick={()=>void action('approve-review',r.id)}>Approve</button><button className={styles.dangerButton} disabled={busyId===r.id} onClick={()=>void action('remove-review',r.id,'Removed during admin moderation.')}>Remove</button></div></article>)}</div>}
    </section>

    <section className={styles.panel}><div className={styles.panelHeader}><div><span className={styles.kicker}>CUSTOMER SUPPORT</span><h2>Open complaints</h2><p>Track reports until they are resolved or dismissed.</p></div><span className={styles.count}>{data.complaints?.length || 0}</span></div>
      {!data.complaints?.length ? <div className={styles.empty}><CheckCircle2 size={27}/><b>No open complaints</b><p>Any open reports will appear here.</p></div> : <div className={styles.tableList}>{data.complaints.map((c:any)=><article className={styles.compactCard} key={c.id}><span className={styles.complaintTag}>{c.status}</span><b>{c.reason}</b><p>{c.details}</p><small>Reported by {c.reporterName} · Booking {c.bookingId}</small><div className={styles.rowActions}><button className={styles.primaryButton} disabled={busyId===c.id} onClick={()=>void action('resolve-complaint',c.id,'Reviewed and resolved by the SkillConnect admin team.')}>Resolve</button><button className={styles.dangerButton} disabled={busyId===c.id} onClick={()=>void action('dismiss-complaint',c.id,'Reviewed and dismissed by the SkillConnect admin team.')}>Dismiss</button></div></article>)}</div>}
    </section></div>

    <section className={styles.panel}><div className={styles.panelHeader}><div><span className={styles.kicker}>ACCOUNT SAFETY</span><h2>User management</h2><p>Deactivated accounts cannot sign in; existing sessions are revoked.</p></div><span className={styles.count}>{data.users?.length || 0} recent</span></div>
      <div className={styles.tableList}>{(data.users || []).map((u:any)=><article className={styles.userRow} key={u.id}><div className={styles.personIcon}><Users size={17}/></div><div className={styles.mainInfo}><b>{u.fullName}</b><span>{u.email}</span></div><span className={styles.rolePill}>{u.role}</span><span className={`${styles.activePill} ${u.isActive ? styles.active : styles.inactive}`}>{u.isActive ? 'Active' : 'Inactive'}</span>{u.role !== 'admin' && <button disabled={busyId===u.id} className={u.isActive ? styles.dangerButton : styles.primaryButton} onClick={()=>void action(u.isActive?'deactivate-user':'activate-user',u.id)}>{u.isActive ? <><Ban size={14}/> Deactivate</> : <><CheckCircle2 size={14}/> Activate</>}</button>}</article>)}</div>
    </section>
    <footer className={styles.footer}>SkillConnect admin · Handle every profile, review and report with care.</footer>
  </main>;
}