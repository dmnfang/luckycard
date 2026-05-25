import './ConvoScreen.css'

function ConvoScreen({ deck, mode, vocab, cards, lines, luckyCount, onLuckyCountChange, onBack, onLucky }) {
  const handleLucky = () => {
    const pool = [...cards].sort(() => Math.random() - 0.5).slice(0, luckyCount)
    onLucky(pool)
  }

  return (
    <div className="convo-screen">
      <div className="convo-topbar">
        <button className="nav-btn" onClick={onBack}>Language</button>
        <div className="convo-topbar-title">{mode.name}</div>
      </div>

      <div className="convo-body">
        {/* Left: script */}
        <div className="convo-left">
          <div className="convo-messages">
            {lines.map(line => {
              if (line.speaker === 'swap') {
                return (
                  <div key={line.id} className="msg-row from-swap">
                    <div className="bubble bubble-swap">🔄 {line.text}</div>
                  </div>
                )
              }
              const isA = line.speaker === 'A'
return (
  <div key={line.id} className={`msg-row ${isA ? 'from-a' : 'from-b'}`}>
    {isA && <div className="msg-avatar avatar-a">A</div>}
    <div className={`bubble ${isA ? 'bubble-a' : 'bubble-b'}`}>
      {line.text}
    </div>
    {!isA && <div className="msg-avatar avatar-b">B</div>}
  </div>
)
            })}
          </div>
        </div>

        {/* Right: vocab grid + lucky controls */}
        <div className="convo-right">
          <div className="vocab-grid">
            {cards.map(card => (
              <div key={card.id} className="vocab-mini">
                <div className="vocab-mini-img">
                  {card.vocab_a?.image_url
                    ? <img src={card.vocab_a.image_url} alt={card.vocab_a.label} />
                    : <span>{card.vocab_a?.label}</span>
                  }
                  {card.vocab_b?.image_url && (
                    <div className="vocab-mini-pip">
                      <img src={card.vocab_b.image_url} alt={card.vocab_b.label} />
                    </div>
                  )}
                </div>
                <div className="vocab-mini-word">{card.vocab_a?.label}</div>
              </div>
            ))}
          </div>

          <div className="lucky-controls">
            <span className="lucky-label">Lucky cards:</span>
            <div className="toggle-group">
              {[2, 3, 4].map(n => (
                <button
                  key={n}
                  className={`toggle-pill ${luckyCount === n ? 'active' : ''}`}
                  onClick={() => onLuckyCountChange(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <button className="lucky-btn" onClick={handleLucky}>
              🌟 Lucky Card!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConvoScreen