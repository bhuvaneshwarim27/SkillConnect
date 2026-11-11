import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import superjson from 'superjson';
import { ArrowLeft, Bell, BriefcaseBusiness, CalendarDays, CheckCircle2, Clock3, HeartHandshake, LoaderCircle, LogOut, MapPin, RefreshCw, ShieldCheck, UserRound, XCircle } from 'lucide-react';
import { toast } from '../helpers/toast';
import styles from './dashboard.module.css';

type User = { id: string; fullName: string; email: string; phone: string; role: 'customer' | 'worker' | 'admin'; lang: string };
type Booking = { id: string; customerId: string; workerId: string; date: string; slot: string; address: string; description: string; estimatedHours: number; status: string; finalPrice: number | null; customerName: string; workerName: string; skill: string; area: string; phone: string | null; canChat: boolean; canReview?: boolean };
type Notice = { id: string; title: string; body: string; readAt: Date | string | null; createdAt: Date | string; kind: string; bookingId: string | null };
type WorkerProfile = { id: string; status: string; headline: string; bio: string; experience: number; hourlyRate: number; available: boolean; skill: string; area: string };

async function readJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  let data: T & { error?: string };
  try { data = superjson.parse<T & { error?: string }>(text); }
  catch { throw new Error(response.ok ? 'The server returned an unreadable response. Please try again.' : 'The server could not load this information. Please refresh in a moment.'); }
  if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [profile, setProfile] = useState<WorkerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState('');

  const load = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const me = await readJson<{ user: User | null }>(await fetch('/_api/auth/me', { cache: 'no-store' }));
      if (!me.user) { navigate('/login', { replace: true }); return; }
      if (me.user.role === 'admin') { navigate('/admin', { replace: true }); return; }
      setUser(me.user);
      const results = await Promise.all([
        readJson<{ bookings: Booking[] }>(await fetch('/_api/bookings/list', { cache: 'no-store' })),
        readJson<{ notifications: Notice[] }>(await fetch('/_api/notifications', { cache: 'no-store' })),
        me.user.role === 'worker' ? readJson<{ profile: WorkerProfile }>(await fetch('/_api/worker/profile', { cache: 'no-store' })).catch(() => null) : Promise.resolve(null),
      ]);
      setBookings(results[0].bookings || []);
      setNotices(results[1].notifications || []);
      setProfile(results[2]?.profile || null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not load your dashboard.');
    } finally { if (showLoader) setLoading(false); }
  }, [navigate]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => { const refreshOnFocus = () => { if (document.visibilityState === 'visible') void load(false); }; const hasPending = bookings.some(b => b.status === 'requested'); // floot-polling-ok: only pending booking decisions are refreshed; worker acceptance is a user action and this page has no push subscription wired yet.
    const timer = hasPending ? window.setInterval(() => { if (document.visibilityState === 'visible') void load(false); }, 5000) : undefined; window.addEventListener('focus', refreshOnFocus); document.addEventListener('visibilitychange', refreshOnFocus); return () => { if (timer) window.clearInterval(timer); window.removeEventListener('focus', refreshOnFocus); document.removeEventListener('visibilitychange', refreshOnFocus); }; }, [load, bookings]);

  async function bookingAction(booking: Booking, action: 'accept' | 'reject' | 'start' | 'complete' | 'cancel') {
    let finalPrice: number | undefined;
    if (action === 'complete') {
      const answer = window.prompt('Enter the agreed final price in rupees:', String(Math.round(booking.estimatedHours * 250)));
      if (answer === null) return;
      finalPrice = Number(answer);
      if (!Number.isInteger(finalPrice) || finalPrice < 0 || finalPrice > 10000000) { toast.error('Enter a valid final price in rupees.'); return; }
    }
    setBusyId(booking.id);
    try {
      await readJson<{ message: string }>(await fetch('/_api/bookings/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: superjson.stringify({ bookingId: booking.id, action, ...(finalPrice === undefined ? {} : { finalPrice }) }) }));
      toast.success('Booking updated.');
      await load();
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not update booking.'); }
    finally { setBusyId(''); }
  }

  async function markNotificationsRead() {
    try {
      await readJson<{ message: string }>(await fetch('/_api/notifications/read', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: superjson.stringify({ all: true }) }));
      setNotices(current => current.map(n => ({ ...n, readAt: n.readAt || new Date() })));
      toast.success('Notifications marked as read.');
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not update notifications.'); }
  }

  async function leaveReview(booking: Booking) {
    const ratingText = window.prompt('Rate this completed job from 1 to 5 stars:', '5');
    if (ratingText === null) return;
    const rating = Number(ratingText);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) { toast.error('Please enter a rating from 1 to 5.'); return; }
    const text = window.prompt('Share a short review (optional):', '') ?? '';
    try {
      const result = await readJson<{ message: string }>(await fetch('/_api/reviews/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: superjson.stringify({ bookingId: booking.id, rating, text }) }));
      toast.success(result.message || 'Review submitted.');
      await load();
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not submit your review.'); }
  }

  async function reportBooking(booking: Booking) {
    const reason = window.prompt('What is the issue? (e.g. quality, timing, pricing)', 'Service issue');
    if (reason === null) return;
    const details = window.prompt('Please describe what happened (at least 10 characters):', 'I would like the SkillConnect team to review this booking.');
    if (details === null) return;
    if (reason.trim().length < 3 || details.trim().length < 10) { toast.error('Please provide a short reason and at least 10 characters of detail.'); return; }
    try {
      const result = await readJson<{ message: string }>(await fetch('/_api/complaints/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: superjson.stringify({ bookingId: booking.id, reason, details }) }));
      toast.success(result.message || 'Report sent to the SkillConnect team.');
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not send your report.'); }
  }

  async function signOut() {
    try { await fetch('/_api/auth/logout', { method: 'POST' }); } finally { navigate('/login', { replace: true }); }
  }

  if (loading || !user) return <main className={styles.loading}><LoaderCircle size={30}/><p>Loading your SkillConnect workspace…</p></main>;
  const worker = user.role === 'worker';
  const pending = bookings.filter(b => b.status === 'requested');
  const active = bookings.filter(b => ['accepted', 'in_progress'].includes(b.status));
  const unread = notices.filter(n => !n.readAt).length;

  return <main className={styles.page}>
    <header className={styles.topbar}><Link to="/" className={styles.brand}><span className={styles.brandMark}><HeartHandshake size={23}/></span><span className={styles.brandText}>SkillConnect<small>LOCAL SKILLS. REAL TRUST.</small></span></Link><div className={styles.topActions}><Link to="/" className={styles.back}><ArrowLeft size={16}/> Find workers</Link><button className={styles.outlineButton} onClick={() => void load()}><RefreshCw size={15}/> Refresh</button><button className={styles.outlineButton} onClick={signOut}><LogOut size={15}/> Sign out</button></div></header>
    <section className={styles.welcome}><div><span className={styles.kicker}>{worker ? 'WORKER WORKSPACE' : 'YOUR ACCOUNT'}</span><h1>Hello, {user.fullName.split(' ')[0]} 👋</h1><p>{worker ? 'Manage requests, keep your profile current and build trust with every job.' : 'Your bookings, updates and trusted local professionals — all in one place.'}</p></div><div className={styles.welcomeIcon}>{worker ? <BriefcaseBusiness size={28}/> : <UserRound size={28}/>}</div></section>

    {worker && profile && <section className={`${styles.profileStatus} ${profile.status === 'verified' ? styles.statusVerified : styles.statusPending}`}><div className={styles.statusIcon}>{profile.status === 'verified' ? <ShieldCheck size={22}/> : <Clock3 size={22}/>}</div><div><b>{profile.status === 'verified' ? 'Your worker profile is verified' : profile.status === 'pending' ? 'Your profile is awaiting admin verification' : 'Your profile needs attention'}</b><p>{profile.status === 'verified' ? `${profile.skill} · ${profile.area} · ₹${profile.hourlyRate}/hour` : profile.status === 'pending' ? 'You can sign in now. Your profile will appear in worker search after approval.' : 'Please contact the SkillConnect admin team for next steps.'}</p></div><span className={styles.statusPill}>{profile.status}</span></section>}

    <section className={styles.statGrid}><article className={styles.statCard}><span><CalendarDays size={18}/></span><small>Total bookings</small><strong>{bookings.length}</strong></article><article className={styles.statCard}><span><Clock3 size={18}/></span><small>{worker ? 'Requests to review' : 'Awaiting response'}</small><strong>{worker ? pending.length : bookings.filter(b => b.status === 'requested').length}</strong></article><article className={styles.statCard}><span><CheckCircle2 size={18}/></span><small>Completed</small><strong>{bookings.filter(b => b.status === 'completed').length}</strong></article><article className={styles.statCard}><span><Bell size={18}/></span><small>Unread updates</small><strong>{unread}</strong></article></section>

    <div className={styles.columns}><section className={styles.panel}><div className={styles.panelHeader}><div><span className={styles.kicker}>BOOKING ACTIVITY</span><h2>{worker ? 'Job requests & work' : 'Your bookings'}</h2></div><span className={styles.count}>{bookings.length}</span></div>
      {!bookings.length ? <div className={styles.empty}><CalendarDays size={30}/><h3>No bookings yet</h3><p>{worker ? 'When a customer requests your service, the request will appear here.' : 'Find a trusted local professional and request your first booking.'}</p>{!worker && <Link className={styles.primaryButton} to="/">Find a worker</Link>}</div> : <div className={styles.bookingList}>{bookings.map(b => <article className={styles.bookingCard} key={b.id}><div className={styles.bookingTop}><div className={styles.bookingIcon}><BriefcaseBusiness size={18}/></div><div className={styles.bookingTitle}><b>{worker ? b.customerName : b.workerName}</b><span>{b.skill} · {b.area}</span></div><span className={`${styles.status} ${styles['status_' + b.status] || ''}`}>{b.status.replace('_', ' ')}</span></div><div className={styles.bookingProgress}><div className={styles.progressSteps}>{[{key:'requested',label:'Requested'},{key:'accepted',label:'Accepted'},{key:'in_progress',label:'Work started'},{key:'completed',label:'Completed'}].map((step,i)=>{const order=['requested','accepted','in_progress','completed'];const current=order.indexOf(b.status);const done=current>=i;return <div key={step.key} className={`${styles.progressStep} ${done?styles.progressDone:''}`}><span className={styles.progressDot}>{done?'✓':i+1}</span><small>{step.label}</small></div>})}</div><p>{b.status==='requested'?(worker?'You can accept or decline now; otherwise demo mode records a response after 30 seconds.':'Demo mode: the request is automatically accepted or declined after 30 seconds. This page checks for updates every 5 seconds.'):b.status==='accepted'?(worker?'You accepted this job. Start it when work begins.':'Your booking is confirmed! The worker will update the job when work begins.'):b.status==='in_progress'?(worker?'When the job is finished, mark it completed and enter the agreed final price.':'Your worker has started the job. After the work is finished, you can rate them.'):b.status==='completed'?(b.canReview?'Job complete! Please rate your worker and share your experience.':'Job complete. Thank you for using SkillConnect!'):b.status==='rejected'?'This request was declined. Please choose another available worker.':'This booking was cancelled.'}</p></div><p className={styles.description}>{b.description}</p><div className={styles.bookingMeta}><span><CalendarDays size={14}/>{b.date}</span><span><Clock3 size={14}/>{b.slot}</span><span><MapPin size={14}/>{b.address}</span></div><div className={styles.bookingBottom}><span>{b.estimatedHours} hr{b.estimatedHours === 1 ? '' : 's'} estimated{b.finalPrice !== null ? ` · Final ₹${b.finalPrice}` : ''}</span><div className={styles.bookingActions}>
        {worker && b.status === 'requested' && <><button disabled={busyId === b.id} className={styles.primaryButton} onClick={() => void bookingAction(b, 'accept')}><CheckCircle2 size={14}/> Accept</button><button disabled={busyId === b.id} className={styles.dangerButton} onClick={() => void bookingAction(b, 'reject')}><XCircle size={14}/> Decline</button></>}
        {worker && b.status === 'accepted' && <button disabled={busyId === b.id} className={styles.primaryButton} onClick={() => void bookingAction(b, 'start')}>Start job</button>}
        {worker && b.status === 'in_progress' && <button disabled={busyId === b.id} className={styles.primaryButton} onClick={() => void bookingAction(b, 'complete')}>Complete job</button>}
        {!worker && ['requested', 'accepted'].includes(b.status) && <button disabled={busyId === b.id} className={styles.dangerButton} onClick={() => void bookingAction(b, 'cancel')}>Cancel request</button>}
        {!worker && b.canReview && <button className={styles.primaryButton} onClick={() => void leaveReview(b)}><CheckCircle2 size={14}/> Rate worker</button>}
        {!['rejected', 'cancelled'].includes(b.status) && <button className={styles.outlineButton} onClick={() => void reportBooking(b)}>Report issue</button>}
        {b.canChat && ['accepted', 'in_progress', 'completed'].includes(b.status) && <Link className={styles.outlineButton} to={`/chat?bookingId=${encodeURIComponent(b.id)}`}>Open chat</Link>}
      </div></div></article>)}</div>}
    </section>

    <aside className={styles.panel}><div className={styles.panelHeader}><div><span className={styles.kicker}>STAY IN THE LOOP</span><h2>Notifications</h2></div>{unread > 0 && <button className={styles.textButton} onClick={() => void markNotificationsRead()}>Mark all read</button>}</div>
      {!notices.length ? <div className={styles.emptySmall}><Bell size={25}/><p>No notifications yet. Booking and account updates will show here.</p></div> : <div className={styles.noticeList}>{notices.map(n => <article className={`${styles.notice} ${!n.readAt ? styles.noticeUnread : ''}`} key={n.id}><span className={styles.noticeDot}/><div><b>{n.title}</b><p>{n.body}</p><small>{new Date(n.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</small></div></article>)}</div>}
      <div className={styles.accountCard}><div className={styles.accountAvatar}>{user.fullName.split(' ').map(p => p[0]).slice(0, 2).join('')}</div><div><b>{user.fullName}</b><p>{user.email}</p><small>{user.phone}</small></div></div>
    </aside></div>
    <footer className={styles.footer}>SkillConnect · Built around trust. Rooted in Kalaburagi. ♡</footer>
  </main>;
}
