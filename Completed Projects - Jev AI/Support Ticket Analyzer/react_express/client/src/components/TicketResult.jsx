const TEAM_LABELS = {
  billing: { label: 'Billing', color: '#FEDB5E' },
  technical: { label: 'Technical Support', color: '#2FDEC1' },
  account: { label: 'Account', color: '#8c6ce5' },
  general: { label: 'General', color: '#94a3b8' },
};

const PRIORITY_COLORS = {
  high: '#f87171',
  medium: '#fb923c',
  low: '#4ade80',
};

function routeTicket(answers) {
  const { department, urgency, isRefund, needsHuman } = answers;

  return {
    team: department,
    priority: urgency > 1.5 ? 'high' : urgency > 0.8 ? 'medium' : 'low',
    flagRefund: isRefund > 0.8,
    flagHuman: needsHuman > 0.8,
    compositeScore: Math.min(1, (urgency / 2 * 0.5) + (isRefund * 0.25) + (needsHuman * 0.25)),
  };
}

export default function TicketResult({ answers }) {
  const routing = routeTicket(answers);
  const team = TEAM_LABELS[routing.team] ?? TEAM_LABELS.general;

  return (
    <div className="ticket-result">
      <div className="result-row">
        <span className="result-label">Team</span>
        <span className="result-badge" style={{ background: team.color + '22', color: team.color, border: `1px solid ${team.color}55` }}>
          {team.label}
        </span>
      </div>
      <div className="result-row">
        <span className="result-label">Priority</span>
        <span className="result-badge" style={{ background: PRIORITY_COLORS[routing.priority] + '22', color: PRIORITY_COLORS[routing.priority], border: `1px solid ${PRIORITY_COLORS[routing.priority]}55` }}>
          {routing.priority.toUpperCase()}
        </span>
      </div>
      <div className="result-row">
        <span className="result-label">Score</span>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${(routing.compositeScore * 100).toFixed(0)}%` }} />
        </div>
      </div>
      {routing.flagRefund && (
        <div className="result-flag">⚠ Refund requested</div>
      )}
      {routing.flagHuman && (
        <div className="result-flag">👤 Needs human review</div>
      )}
    </div>
  );
}