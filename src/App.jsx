import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import ModeScreen from './screens/ModeScreen'
import SlideshowScreen from './screens/SlideshowScreen'
import ConvoScreen from './screens/ConvoScreen'
import LuckyScreen from './screens/LuckyScreen'

function App() {
  const [screen, setScreen] = useState('home')
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [selectedMode, setSelectedMode] = useState(null)
  const [vocab, setVocab] = useState([])
  const [cards, setCards] = useState([])
  const [lines, setLines] = useState([])
  const [luckyCount, setLuckyCount] = useState(3)
  const [luckyPicked, setLuckyPicked] = useState([])

  const goTo = (s) => setScreen(s)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {screen === 'home' && (
        <HomeScreen
          onSelectDeck={(deck) => {
            setSelectedDeck(deck)
            goTo('mode')
          }}
        />
      )}
      {screen === 'mode' && (
        <ModeScreen
          deck={selectedDeck}
          onBack={() => goTo('home')}
          onSelectMode={(mode, vocab, cards, lines) => {
            setSelectedMode(mode)
            setVocab(vocab)
            setCards(cards)
            setLines(lines)
            goTo('slideshow')
          }}
        />
      )}
      {screen === 'slideshow' && (
        <SlideshowScreen
          deck={selectedDeck}
          mode={selectedMode}
          vocab={vocab}
          onBack={() => goTo('mode')}
          onNext={() => goTo('convo')}
        />
      )}
      {screen === 'convo' && (
        <ConvoScreen
          deck={selectedDeck}
          mode={selectedMode}
          vocab={vocab}
          cards={cards}
          lines={lines}
          luckyCount={luckyCount}
          onLuckyCountChange={setLuckyCount}
          onBack={() => goTo('slideshow')}
          onLucky={(picked) => {
            setLuckyPicked(picked)
            goTo('lucky')
          }}
        />
      )}
      {screen === 'lucky' && (
        <LuckyScreen
          picked={luckyPicked}
          cards={cards}
          luckyCount={luckyCount}
          onBack={() => goTo('convo')}
          onRedraw={(picked) => setLuckyPicked(picked)}
        />
      )}
    </div>
  )
}

export default App