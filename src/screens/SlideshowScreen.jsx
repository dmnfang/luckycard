import { useState } from 'react'
import './SlideshowScreen.css'

function SlideshowScreen({ deck, mode, vocab, onBack, onNext }) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => {
    if (index < vocab.length - 1) setIndex(i => i + 1)
    else onNext()
  }

  const item = vocab[index]

  return (
    <div className="slideshow-screen">
      <div className="slideshow-topbar">
        <button className="nav-btn" onClick={onBack}>Language</button>
        <div className="slideshow-counter">Word {index + 1} of {vocab.length}</div>
        <div className="slideshow-nav-group">
          <button className="nav-btn" onClick={prev} disabled={index === 0}>Back</button>
          <button className="nav-btn" onClick={next}>Next</button>
        </div>
      </div>

      <div className="slideshow-stage">
        {item && (
          <div className="vocab-card">
            <div className="vocab-img-wrap">
              {item.image_url
                ? <img src={item.image_url} alt={item.label} />
                : <span className="vocab-placeholder">{item.label}</span>
              }
            </div>
            <div className="vocab-word">{item.label}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SlideshowScreen