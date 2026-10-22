import { useEffect, useState } from 'react'
import Admin from './Admin'
import { useSiteContent, type Story } from './content'
import logo from './assets/pramag-logo.png'
import './App.css'

function HeadingText({ text, highlightLast = false }: { text: string; highlightLast?: boolean }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, index) => (
        <span key={`${index}-${line}`}>
          {highlightLast && index === lines.length - 1 ? <em>{line}</em> : line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  )
}

function App() {
  const { content, setContent, storageError } = useSiteContent()
  const [activeCategory, setActiveCategory] = useState('All stories')
  const [search, setSearch] = useState('')
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const selectedStory = content.stories.find((story) => story.id === selectedStoryId)
  const categories = ['All stories', ...new Set(content.stories.map((story) => story.category))]
  const visibleStories = content.stories.filter((story) => {
    const matchesCategory =
      activeCategory === 'All stories' || story.category === activeCategory
    const searchText =
      `${story.title} ${story.summary} ${story.category}`.toLowerCase()
    return matchesCategory && searchText.includes(search.toLowerCase().trim())
  })

  useEffect(() => {
    document.title = content.pageTitle
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content = content.metaDescription
  }, [content.pageTitle, content.metaDescription])

  useEffect(() => {
    if (!selectedStory) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelectedStoryId(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedStory])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.site-shell [data-reveal]')
    elements.forEach((element) => element.classList.add('reveal-ready'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [activeCategory, content.stories, search])

  const logoSource = content.logoImageUrl || logo
  const phoneLink = content.phone.replace(/[^\d+]/g, '')
  const locationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${content.location}, Ghana`)}`

  if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
    return <Admin content={content} setContent={setContent} storageError={storageError} />
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>{content.announcement}</span>
        <a href={`tel:${phoneLink}`}>Call us <span aria-hidden="true">↗</span></a>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${content.companyName} home`}>
          <img src={logoSource} alt={content.logoImageAlt} />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>{content.navHome}</a>
          <a href="#stories" onClick={() => setMenuOpen(false)}>{content.navJournal}</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>{content.navAbout}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{content.navContact}</a>
        </nav>

        <a className="header-cta" href="#stories">
          {content.headerButton} <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><span /> {content.heroEyebrow}</p>
            <h1><HeadingText text={content.heroTitle} highlightLast /></h1>
            <p className="hero-description">{content.heroDescription}</p>
            <a className="button button-light" href="#stories">
              {content.heroButton} <span aria-hidden="true">↓</span>
            </a>
            <div className="hero-note">
              <span className="note-mark">P</span>
              <span>{content.heroNote.split('\n').map((line, index) => <span key={`${index}-${line}`}>{line}{index === 0 && <br />}</span>)}</span>
            </div>
          </div>
          <div className="hero-visual" data-reveal>
            <img src={content.heroImage} alt={content.heroImageAlt} />
            <div className="hero-image-caption">
              <span>{content.heroImageKicker}</span>
              <span>{content.heroCaption}</span>
            </div>
            <div className="hero-stamp" aria-hidden="true">
              <span>ROOTED IN</span>
              <strong>Sunyani</strong>
              <span>{content.companyName.toUpperCase()} · GHANA</span>
            </div>
          </div>
        </section>

        {content.stories[0] && (
          <section className="featured-section" aria-labelledby="featured-heading" data-reveal>
            <div className="section-kicker"><span>01</span> {content.featuredKicker}</div>
            <div className="featured-story">
              <button
                type="button"
                className="featured-image"
                onClick={() => setSelectedStoryId(content.stories[0].id)}
                aria-label={`Read ${content.stories[0].title}`}
              >
                <img src={content.stories[0].image} alt={content.stories[0].imageAlt} />
                <span className="image-arrow" aria-hidden="true">↗</span>
              </button>
              <div className="featured-copy">
                <div className="story-meta">
                  <span>{content.stories[0].category}</span><i />{content.stories[0].minutes} min read
                </div>
                <h2 id="featured-heading">{content.stories[0].title}</h2>
                <p>{content.stories[0].summary}</p>
                <button className="text-link" type="button" onClick={() => setSelectedStoryId(content.stories[0].id)}>
                  {content.featuredButton} <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="journal-section" id="stories" aria-labelledby="journal-heading" data-reveal>
          <div className="journal-heading">
            <div>
              <div className="section-kicker"><span>02</span> {content.journalKicker}</div>
              <h2 id="journal-heading"><HeadingText text={content.journalTitle} highlightLast /></h2>
            </div>
            <label className="search-box">
              <span className="sr-only">Search stories</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.5 4.5" />
              </svg>
              <input
                type="search"
                placeholder={content.searchPlaceholder}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          <div className="category-list" aria-label="Filter stories by category">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'category-chip is-active' : 'category-chip'}
                type="button"
                key={category}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {visibleStories.length > 0 ? (
            <div className="story-grid">
              {visibleStories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} onSelect={setSelectedStoryId} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>{content.noResults}</p>
              <button type="button" onClick={() => { setSearch(''); setActiveCategory('All stories') }}>
                {content.clearFilters}
              </button>
            </div>
          )}
        </section>

        <section className="roots-section" id="about" data-reveal>
          <div className="roots-image">
            <img src={content.rootsImage} alt={content.rootsImageAlt} loading="lazy" />
            <span className="roots-image-label">{content.rootsImageCaption}</span>
          </div>
          <div className="roots-copy">
            <div className="section-kicker"><span>03</span> {content.aboutKicker}</div>
            <h2><HeadingText text={content.aboutTitle} highlightLast /></h2>
            <p>{content.aboutBody}</p>
            <a href={content.facebookUrl} target="_blank" rel="noreferrer" className="text-link">
              {content.facebookLabel} <span aria-hidden="true">↗</span>
            </a>
            <div className="roots-signoff">
              <img src={logoSource} alt="" />
              <span>{content.signoff}</span>
            </div>
          </div>
        </section>

        <section className="contact-banner" aria-labelledby="contact-heading" data-reveal>
          <div className="section-kicker"><span>04</span> {content.contactKicker}</div>
          <div className="contact-banner-content">
            <h2 id="contact-heading">{content.contactTitle}</h2>
            <p>{content.contactBody}</p>
          </div>
          <a className="button button-light" href={`tel:${phoneLink}`}>
            Call {content.phone} <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer" id="contact" data-reveal>
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home" aria-label={`${content.companyName} home`}>
              <img src={logoSource} alt={content.logoImageAlt} />
            </a>
            <p>{content.footerTagline.split('\n').map((line, index) => <span key={`${index}-${line}`}>{line}{index < content.footerTagline.split('\n').length - 1 && <br />}</span>)}</p>
          </div>
          <div className="footer-column">
            <span className="footer-heading">{content.footerContactLabel}</span>
            <a href={`tel:${phoneLink}`}>{content.phone}</a>
            <a href={locationLink} target="_blank" rel="noreferrer">
              {content.location} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="footer-column">
            <span className="footer-heading">{content.footerSocialLabel}</span>
            <a href={content.facebookUrl} target="_blank" rel="noreferrer">
              Facebook <span aria-hidden="true">↗</span>
            </a>
            <a href="#stories">{content.footerJournalLabel} <span aria-hidden="true">↗</span></a>
          </div>
          <a className="back-to-top" href="#home" aria-label={content.footerBackToTop}>↑</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {content.companyName}</span>
          <span>{content.footerLocation}</span>
          <a href="#home">{content.footerBackToTop} ↑</a>
        </div>
      </footer>

      {selectedStory && (
        <div className="story-modal-backdrop" onClick={() => setSelectedStoryId(null)}>
          <article
            className="story-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close story"
              onClick={() => setSelectedStoryId(null)}
            >
              ×
            </button>
            <img className="modal-image" src={selectedStory.image} alt={selectedStory.imageAlt} />
            <div className="modal-content">
              <div className="story-meta">
                <span>{selectedStory.category}</span><i />{selectedStory.date}<i />{selectedStory.minutes} min read
              </div>
              <h2 id="modal-title">{selectedStory.title}</h2>
              <p className="modal-intro">{selectedStory.summary}</p>
              {selectedStory.content.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
                <p key={`${index}-${paragraph}`}>{paragraph}</p>
              ))}
              <span className="modal-signoff">{content.signoff} <span aria-hidden="true">♥</span></span>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}

function StoryCard({
  story,
  index,
  onSelect,
}: {
  story: Story
  index: number
  onSelect: (id: string) => void
}) {
  return (
    <article className="story-card" data-reveal>
      <button
        className="card-image"
        type="button"
        onClick={() => onSelect(story.id)}
        aria-label={`Read ${story.title}`}
      >
        <img src={story.image} alt={story.imageAlt} loading="lazy" />
        <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </button>
      <div className="card-details">
        <div className="story-meta">
          <span>{story.category}</span><i />{story.minutes} min read
        </div>
        <h3>
          <button type="button" onClick={() => onSelect(story.id)}>{story.title}</button>
        </h3>
        <p>{story.summary}</p>
        <span className="card-date">{story.date}</span>
      </div>
    </article>
  )
}

export default App
