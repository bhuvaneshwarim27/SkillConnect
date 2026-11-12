import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import superjson from 'superjson';
import { ArrowLeft, HeartHandshake, LoaderCircle, MessageCircle, RefreshCw, Send } from 'lucide-react';
import { toast } from '../helpers/toast';
import styles from './chat.module.css';

type ChatMessage = { id: string; bookingId: string; senderId: string; body: string; createdAt: Date | string; senderName: string };
type ChatUser = { id: string; fullName: string; role: string };

async function readJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = superjson.parse<T & { error?: string }>(text);
  if (!response.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}

export default function ChatPage() {
  const [params] = useSearchParams();
  const bookingId = params.get('bookingId') || '';
  const navigate = useNavigate();
  const [user, setUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [closed, setClosed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    if (!bookingId) { toast.error('This chat link is missing its booking.'); setLoading(false); return; }
    try {
      const me = await readJson<{ user: ChatUser | null }>(await fetch('/_api/auth/me', { cache: 'no-store' }));
      if (!me.user) { navigate('/login', { replace: true }); return; }
      setUser(me.user);
      const result = await readJson<{ messages: ChatMessage[]; closed?: boolean }>(await fetch(`/_api/chat/messages?bookingId=${encodeURIComponent(bookingId)}`, { cache: 'no-store' }));
      setMessages(result.messages || []);
      setClosed(Boolean(result.closed));
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not load this conversation.'); }
    finally { setLoading(false); }
  }, [bookingId, navigate]);

  useEffect(() => { void load(); }, [load]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body || sending || closed) return;
    setSending(true);
    try {
      await readJson<{ message: ChatMessage }>(await fetch('/_api/chat/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: superjson.stringify({ bookingId, body }) }));
      setDraft('');
      await load();
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not send message.'); }
    finally { setSending(false); }
  }

  if (loading) return <main className={styles.loading}><LoaderCircle size={30}/><p>Opening your conversation…</p></main>;
  return <main className={styles.page}>
    <header className={styles.topbar}><Link to="/" className={styles.brand}><span><HeartHandshake size={22}/></span>SkillConnect</Link><Link to="/dashboard" className={styles.back}><ArrowLeft size={16}/> Back to dashboard</Link></header>
    <section className={styles.chatShell}><div className={styles.chatHeader}><span className={styles.chatIcon}><MessageCircle size={22}/></span><div><span className={styles.kicker}>BOOKING CONVERSATION</span><h1>Chat with your local pro</h1><p>Keep job details and updates in one place.</p></div><button className={styles.refresh} onClick={() => void load()} aria-label="Refresh messages"><RefreshCw size={16}/></button></div>
      {!bookingId ? <div className={styles.empty}><h2>Chat link unavailable</h2><p>Open a conversation from one of your active bookings.</p><Link to="/dashboard">Go to dashboard</Link></div> : <>
        <div className={styles.notice}>For your safety, keep booking details and agreements in this conversation.</div>
        <div className={styles.messages}>{messages.length ? messages.map(m => <article key={m.id} className={`${styles.message} ${user?.id === m.senderId ? styles.ownMessage : ''}`}><span className={styles.sender}>{user?.id === m.senderId ? 'You' : m.senderName}</span><p>{m.body}</p><small>{new Date(m.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</small></article>) : <div className={styles.emptyMessages}><MessageCircle size={28}/><b>No messages yet</b><p>Send a message to coordinate the job details.</p></div>}</div>
        {closed ? <div className={styles.closed}>This conversation is closed because the booking was cancelled or declined.</div> : <form className={styles.composer} onSubmit={send}><textarea value={draft} onChange={e => setDraft(e.target.value)} maxLength={2000} rows={2} placeholder="Write a message…" aria-label="Message" required/><button disabled={sending || !draft.trim()}><Send size={17}/>{sending ? 'Sending…' : 'Send'}</button></form>}
      </>}
    </section>
    <footer className={styles.footer}>SkillConnect · Keep it kind, clear and local. ♡</footer>
  </main>;
}