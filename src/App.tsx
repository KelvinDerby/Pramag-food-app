import { useEffect, useState } from 'react'
import logo from './assets/pramag-logo.png'
import './App.css'

type Story = {
  category: string
  date: string
  image: string
  imageAlt: string
  minutes: number
  title: string
  summary: string
  content: string[]
}

const stories: Story[] = [
  {
    category: 'From the factory',
    date: 'October 18, 2026',
    image:
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Sausages prepared for a meal',
    minutes: 5,
    title: 'From sausage production to the family table',
    summary:
      'Take a closer look at how sausage production connects the factory to the meals and moments we share at home.',
    content: [
      'Sausages are a familiar favourite at many tables, served in all sorts of ways. Behind each meal is a production journey that brings the finished food from the factory to the people who enjoy it.',
      'At Pramag Foods, we make sausages in Mantukwa, Sunyani. We are proud to be part of a food industry that connects local businesses, shops and home kitchens.',
      'Here on the journal, we will share ideas, recipes and stories from the world of sausage production and the tables where good food brings people together.',
    ],
  },
  {
    category: 'Local roots',
    date: 'October 12, 2026',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Green landscape in the Ghanaian countryside',
    minutes: 4,
    title: 'Made in Mantukwa, part of the Sunyani community',
    summary:
      'Our sausage production factory is based in Mantukwa. Here’s why being part of the Sunyani community matters to us.',
    content: [
      'Pramag Foods is based in Mantukwa, Sunyani, where our factory produces sausages. Being part of this community is an important part of who we are.',
      'The food we enjoy often brings people together across homes, neighbourhoods and local businesses. We are glad to contribute to that everyday food culture from right here in the Bono Region.',
      'We look forward to sharing more stories from our home in Mantukwa. For enquiries, give us a call or find us on Facebook.',
    ],
  },
  {
    category: 'At the table',
    date: 'October 4, 2026',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'A fresh salad served as a colourful side dish',
    minutes: 3,
    title: 'Three easy ways to serve sausages',
    summary:
      'Looking for simple inspiration? Pair sausages with a favourite side, tuck them into a roll or add them to a sharing platter.',
    content: [
      'Keep it simple: serve sausages alongside a salad or your favourite vegetables for an easy meal.',
      'For a quick lunch, tuck a cooked sausage into a roll and add the toppings you enjoy. Or make a sharing platter with a few sides for a relaxed meal with family and friends.',
      'However you serve them, follow the preparation and cooking directions on the product packaging.',
    ],
  },
  {
    category: 'From the factory',
    date: 'September 26, 2026',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Food being prepared in a kitchen',
    minutes: 6,
    title: 'What to look for when choosing sausages',
    summary:
      'A few practical reminders can help make shopping for sausages easier, from checking the label to planning how you’ll serve them.',
    content: [
      'Start by checking the product label for the ingredients, storage information and cooking directions. These details help you choose a product and plan how to prepare it.',
      'Think about the meal you have in mind, too. A sausage for a quick roll, a family meal or a weekend grill might call for different accompaniments.',
      'Once home, follow the package guidance for storage and preparation. When in doubt, check the label or contact the producer.',
    ],
  },
]

const categories = ['All stories', 'From the factory', 'Local roots', 'At the table']

function App() {
  const [activeCategory, setActiveCategory] = useState('All stories')
  const [search, setSearch] = useState('')
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!selectedStory) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelectedStory(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedStory])

  const visibleStories = stories.filter((story) => {
    const matchesCategory =
      activeCategory === 'All stories' || story.category === activeCategory
    const searchText =
      `${story.title} ${story.summary} ${story.category}`.toLowerCase()
    return matchesCategory && searchText.includes(search.toLowerCase().trim())
  })

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>Pramag Foods LTD · Sausage production in Sunyani</span>
        <a href="tel:0596762017">Call us <span aria-hidden="true">↗</span></a>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Pramag Foods home">
          <img src={logo} alt="Pramag Foods" />
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
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#stories" onClick={() => setMenuOpen(false)}>The journal</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our roots</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <a className="header-cta" href="#stories">
          Explore stories <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span /> THE PRAMAG JOURNAL</p>
            <h1>Sausage making.<br />Local roots.<br /><em>Good food.</em></h1>
            <p className="hero-description">
              Stories from our sausage production factory in Mantukwa, plus
              simple serving ideas and inspiration for the table.
            </p>
            <a className="button button-light" href="#stories">
              Read our stories <span aria-hidden="true">↓</span>
            </a>
            <div className="hero-note">
              <span className="note-mark">P</span>
              <span>Sausage makers<br />in Mantukwa, Sunyani</span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=90"
              alt="Sausages ready to be prepared for a meal"
            />
            <div className="hero-image-caption">
              <span>PRAMAG FOODS · MANTUKWA</span>
              <span>Sausage production, rooted in Sunyani</span>
            </div>
            <div className="hero-stamp" aria-hidden="true">
              <span>ROOTED IN</span>
              <strong>Sunyani</strong>
              <span>PRAMAG FOODS · GHANA</span>
            </div>
          </div>
        </section>

        <section className="featured-section" aria-labelledby="featured-heading">
          <div className="section-kicker"><span>01</span> FROM OUR PRODUCTION JOURNAL</div>
          <div className="featured-story">
            <button
              type="button"
              className="featured-image"
              onClick={() => setSelectedStory(stories[0])}
              aria-label={`Read ${stories[0].title}`}
            >
              <img src={stories[0].image} alt={stories[0].imageAlt} />
              <span className="image-arrow" aria-hidden="true">↗</span>
            </button>
            <div className="featured-copy">
              <div className="story-meta">
                <span>{stories[0].category}</span><i />{stories[0].minutes} min read
              </div>
              <h2 id="featured-heading">{stories[0].title}</h2>
              <p>{stories[0].summary}</p>
              <button className="text-link" type="button" onClick={() => setSelectedStory(stories[0])}>
                Read the story <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </section>

        <section className="journal-section" id="stories" aria-labelledby="journal-heading">
          <div className="journal-heading">
            <div>
              <div className="section-kicker"><span>02</span> FRESH FROM THE JOURNAL</div>
              <h2 id="journal-heading">Stories worth<br /><em>sharing.</em></h2>
            </div>
            <label className="search-box">
              <span className="sr-only">Search stories</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.5 4.5" />
              </svg>
              <input
                type="search"
                placeholder="Find a story..."
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
                <article className="story-card" key={story.title}>
                  <button
                    className="card-image"
                    type="button"
                    onClick={() => setSelectedStory(story)}
                    aria-label={`Read ${story.title}`}
                  >
                    <img src={story.image} alt={story.imageAlt} loading="lazy" />
                    <span className="card-number">0{index + 1}</span>
                    <span className="card-arrow" aria-hidden="true">↗</span>
                  </button>
                  <div className="card-details">
                    <div className="story-meta">
                      <span>{story.category}</span><i />{story.minutes} min read
                    </div>
                    <h3>
                      <button type="button" onClick={() => setSelectedStory(story)}>
                        {story.title}
                      </button>
                    </h3>
                    <p>{story.summary}</p>
                    <span className="card-date">{story.date}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No stories found just yet.</p>
              <button type="button" onClick={() => { setSearch(''); setActiveCategory('All stories') }}>
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="roots-section" id="about">
          <div className="roots-image">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
              alt="A green landscape under the warm afternoon sun"
              loading="lazy"
            />
            <span className="roots-image-label">OUR ROOTS <i /> SUNYANI, GHANA</span>
          </div>
          <div className="roots-copy">
            <div className="section-kicker"><span>03</span> A LITTLE ABOUT US</div>
            <h2>Sausage makers.<br /><em>Rooted in Sunyani.</em></h2>
            <p>
            Pramag Foods LTD is a sausage production factory based in
            Mantukwa, Sunyani. This journal is where we share stories from
            sausage production, serving inspiration and the local community.
            </p>
            <a href="https://www.facebook.com/p/Pramag-foods-LTD-100064004773538/" target="_blank" rel="noreferrer" className="text-link">
              Find Pramag Foods on Facebook <span aria-hidden="true">↗</span>
            </a>
            <div className="roots-signoff">
              <img src={logo} alt="" />
              <span>Made with care, shared with love.</span>
            </div>
          </div>
        </section>

        <section className="contact-banner" aria-labelledby="contact-heading">
          <div className="section-kicker"><span>04</span> WANT TO KNOW MORE?</div>
          <div className="contact-banner-content">
            <h2 id="contact-heading">Let’s talk sausages.</h2>
            <p>Get in touch with Pramag Foods in Mantukwa, Sunyani.</p>
          </div>
          <a className="button button-light" href="tel:0596762017">
            Call 059 676 2017 <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home" aria-label="Pramag Foods home">
              <img src={logo} alt="Pramag Foods" />
            </a>
            <p>Good food. Good stories.<br />Good living.</p>
          </div>
          <div className="footer-column">
            <span className="footer-heading">COME SAY HELLO</span>
            <a href="tel:0596762017">059 676 2017</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Mantukwa%2C+Sunyani%2C+Ghana" target="_blank" rel="noreferrer">
              Mantukwa, Sunyani <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="footer-column">
            <span className="footer-heading">FIND US ONLINE</span>
            <a href="https://www.facebook.com/p/Pramag-foods-LTD-100064004773538/" target="_blank" rel="noreferrer">
              Facebook <span aria-hidden="true">↗</span>
            </a>
            <a href="#stories">The journal <span aria-hidden="true">↗</span></a>
          </div>
          <a className="back-to-top" href="#home" aria-label="Back to top">↑</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Pramag Foods LTD</span>
          <span>Rooted in Mantukwa, Sunyani, Ghana</span>
          <a href="#home">Back to the top ↑</a>
        </div>
      </footer>

      {selectedStory && (
        <div className="story-modal-backdrop" onClick={() => setSelectedStory(null)}>
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
              onClick={() => setSelectedStory(null)}
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
              {selectedStory.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <span className="modal-signoff">Made with care, shared with love. <span aria-hidden="true">♥</span></span>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}

export default App
