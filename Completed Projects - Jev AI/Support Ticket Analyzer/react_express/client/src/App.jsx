import { useState } from 'react';
import TicketResult from './components/TicketResult.jsx';
import './App.css';

export default function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error('Analysis failed');
      const data = await res.json();
      setResult(data.answers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Support Ticket Analyzer</h1>
        <p>Powered by TypeSafe Jev</p>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit} className="form">
          <textarea
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste a support ticket message here…"
            rows={6}
          />
          <button type="submit" className="btn" disabled={loading || !message.trim()}>
            {loading ? 'Analyzing…' : 'Analyze Ticket'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {result && <TicketResult answers={result} />}
      </main>
    </div>
  );
}
