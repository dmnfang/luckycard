import { useState, useEffect } from 'react'
import { fetchDecks } from '../lib/api'
import './HomeScreen.css'

const GRADES = [
  { id: 'grade3', name: 'Grade 3' },
  { id: 'grade4', name: 'Grade 4' },
]

function getDeckEmoji(name) {
  const n = name.toLowerCase()
  if (n.includes('color')) return '🎨'
  if (n.includes('day')) return '📅'
  if (n.includes('weather')) return '⛅'
  return '🃏'
}

function HomeScreen({ onSelectDeck }) {
  const [activeGrade, setActiveGrade] = useState('grade3')
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchDecks(activeGrade).then(data => {
      setDecks(data)
      setLoading(false)
    })
  }, [activeGrade])

  return (
    <div className="home-screen">
      <div className="home-topbar">
        <div className="home-title">🃏 Lucky Card</div>
        <div className="grade-toggle">
          {GRADES.map(g => (
            <button
              key={g.id}
              className={`grade-btn ${activeGrade === g.id ? 'active' : ''}`}
              onClick={() => setActiveGrade(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      <div className="home-body">
        <div className="deck-panel">
          <div className="panel-title">Choose a deck</div>
          <div className="deck-list">
            {loading ? (
              <div className="deck-loading">Loading...</div>
            ) : decks.length === 0 ? (
              <div className="deck-loading">No decks yet</div>
            ) : (
              decks.map(deck => (
                <div
                  key={deck.id}
                  className="deck-card"
                  onClick={() => onSelectDeck(deck)}
                >
                  <div className="deck-card-icon">{getDeckEmoji(deck.name)}</div>
                  <div className="deck-card-info">
                    <div className="deck-card-name">{deck.name}</div>
                    <div className="deck-card-chip">
                      {activeGrade === 'grade3' ? 'Grade 3' : 'Grade 4'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen