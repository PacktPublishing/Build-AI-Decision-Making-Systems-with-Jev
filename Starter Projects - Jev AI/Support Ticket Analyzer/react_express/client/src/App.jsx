import { useState } from 'react';
import './App.css';

export default function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setResult(null);
    // TODO: call /api/analyze
    setLoading(false);
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
      </main>
    </div>
  );
}
