import './LuckyScreen.css'

function LuckyScreen({ picked, cards, luckyCount, onBack, onRedraw }) {
  const handleRedraw = () => {
    const pool = [...cards].sort(() => Math.random() - 0.5).slice(0, luckyCount)
    onRedraw(pool)
  }

  return (
    <div className="lucky-screen">
      <div className="lucky-title">🌟 Lucky Cards!</div>

      <div className="lucky-cards-row">
        {picked.map((card, i) => (
          <div key={card.id} className="lucky-big-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="lucky-big-img">
              {card.vocab_a?.image_url
                ? <img src={card.vocab_a.image_url} alt={card.vocab_a.label} />
                : <span>{card.vocab_a?.label}</span>
              }
            </div>
            <div className="lucky-big-word">{card.vocab_a?.label}</div>
          </div>
        ))}
      </div>

      <div className="lucky-actions">
        <button className="lucky-back-btn" onClick={onBack}>Back</button>
        <button className="lucky-redraw-btn" onClick={handleRedraw}>Draw Again 🎲</button>
      </div>
    </div>
  )
}

export default LuckyScreen