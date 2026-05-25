import { useState, useEffect } from 'react'
import { fetchModes, fetchVocab, fetchCards, fetchLines } from '../lib/api'
import './ModeScreen.css'

function ModeScreen({ deck, onBack, onSelectMode }) {
  const [modes, setModes] = useState([])
  const [modePreviews, setModePreviews] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchModes(deck.id).then(async modes => {
      setModes(modes)
      const previews = {}
      await Promise.all(modes.map(async mode => {
        const lines = await fetchLines(mode.id)
        previews[mode.id] = lines
      }))
      setModePreviews(previews)
      setLoading(false)
    })
  }, [deck.id])

  const handleSelect = async (mode) => {
    const [vocab, cards, lines] = await Promise.all([
      fetchVocab(mode.id),
      fetchCards(mode.id),
      fetchLines(mode.id),
    ])
    onSelectMode(mode, vocab, cards, lines)
  }

  return (
    <div className="mode-screen">
      <div className="mode-topbar">
        <button className="nav-btn" onClick={onBack}>Decks</button>
        <div className="mode-topbar-info">
          <div className="mode-topbar-title">{deck.name}</div>
          <div className="mode-topbar-sub">Choose a language point</div>
        </div>
      </div>

      <div className="mode-body">
        {loading ? (
          <div className="mode-loading">Loading...</div>
        ) : (
          modes.map(mode => {
            const lines = modePreviews[mode.id] || []
            return (
              <div
                key={mode.id}
                className="mode-card"
                onClick={() => handleSelect(mode)}
              >
                <div className="mode-card-label">{mode.name}</div>
                <div className="mode-card-script">
                  {lines.map(line => {
                    if (line.speaker === 'swap') {
                      return (
                        <div key={line.id} className="mode-preview-swap">
                          🔄 Swap cards!
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
            )
          })
        )}
      </div>
    </div>
  )
}

export default ModeScreen