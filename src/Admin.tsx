import { useState, type Dispatch, type SetStateAction } from 'react'
import type { SiteContent, Story } from './content'
import './Admin.css'

type ContentField = {
  key: Exclude<keyof SiteContent, 'stories'>
  label: string
  group: string
  multiline?: boolean
  hint?: string
}

const contentFields: ContentField[] = [
  { key: 'companyName', label: 'Company name', group: 'Brand & metadata' },
  { key: 'pageTitle', label: 'Browser page title', group: 'Brand & metadata' },
  {
    key: 'metaDescription',
    label: 'Search description',
    group: 'Brand & metadata',
    multiline: true,
  },
  {
    key: 'logoImageUrl',
    label: 'Logo image URL',
    group: 'Brand & metadata',
    hint: 'Leave blank to use the current Pramag logo.',
  },
  { key: 'logoImageAlt', label: 'Logo image description', group: 'Brand & metadata' },
  { key: 'announcement', label: 'Announcement bar', group: 'Header & navigation' },
  { key: 'navHome', label: 'Home navigation label', group: 'Header & navigation' },
  { key: 'navJournal', label: 'Journal navigation label', group: 'Header & navigation' },
  { key: 'navAbout', label: 'About navigation label', group: 'Header & navigation' },
  { key: 'navContact', label: 'Contact navigation label', group: 'Header & navigation' },
  { key: 'headerButton', label: 'Header button', group: 'Header & navigation' },
  { key: 'heroEyebrow', label: 'Hero eyebrow', group: 'Landing page' },
  { key: 'heroTitle', label: 'Hero headline', group: 'Landing page', multiline: true },
  { key: 'heroDescription', label: 'Hero description', group: 'Landing page', multiline: true },
  { key: 'heroButton', label: 'Hero button', group: 'Landing page' },
  { key: 'heroNote', label: 'Hero note', group: 'Landing page', multiline: true },
  { key: 'heroImage', label: 'Hero image URL', group: 'Landing page' },
  { key: 'heroImageAlt', label: 'Hero image description', group: 'Landing page' },
  { key: 'heroImageKicker', label: 'Hero image label', group: 'Landing page' },
  { key: 'heroCaption', label: 'Hero image caption', group: 'Landing page' },
  { key: 'featuredKicker', label: 'Featured story label', group: 'Featured story' },
  { key: 'featuredButton', label: 'Featured story button', group: 'Featured story' },
  { key: 'journalKicker', label: 'Journal section label', group: 'Journal' },
  { key: 'journalTitle', label: 'Journal heading', group: 'Journal', multiline: true },
  { key: 'searchPlaceholder', label: 'Search placeholder', group: 'Journal' },
  { key: 'noResults', label: 'Empty results message', group: 'Journal' },
  { key: 'clearFilters', label: 'Clear filters button', group: 'Journal' },
  { key: 'aboutKicker', label: 'About section label', group: 'About & contact' },
  { key: 'aboutTitle', label: 'About heading', group: 'About & contact', multiline: true },
  { key: 'aboutBody', label: 'About text', group: 'About & contact', multiline: true },
  { key: 'rootsImage', label: 'About image URL', group: 'About & contact' },
  { key: 'rootsImageAlt', label: 'About image description', group: 'About & contact' },
  { key: 'rootsImageCaption', label: 'About image caption', group: 'About & contact' },
  { key: 'facebookUrl', label: 'Facebook page URL', group: 'About & contact' },
  { key: 'facebookLabel', label: 'Facebook link label', group: 'About & contact' },
  { key: 'signoff', label: 'Sign-off', group: 'About & contact' },
  { key: 'contactKicker', label: 'Contact section label', group: 'About & contact' },
  { key: 'contactTitle', label: 'Contact heading', group: 'About & contact' },
  { key: 'contactBody', label: 'Contact text', group: 'About & contact', multiline: true },
  { key: 'phone', label: 'Phone number', group: 'About & contact' },
  { key: 'location', label: 'Location', group: 'About & contact' },
  { key: 'footerTagline', label: 'Footer tagline', group: 'Footer', multiline: true },
  { key: 'footerContactLabel', label: 'Footer contact heading', group: 'Footer' },
  { key: 'footerSocialLabel', label: 'Footer social heading', group: 'Footer' },
  { key: 'footerJournalLabel', label: 'Footer journal link', group: 'Footer' },
  { key: 'footerLocation', label: 'Footer location line', group: 'Footer' },
  { key: 'footerBackToTop', label: 'Back to top link', group: 'Footer' },
]

const storyFields: { key: Exclude<keyof Story, 'id'>; label: string; multiline?: boolean }[] = [
  { key: 'title', label: 'Story title' },
  { key: 'category', label: 'Category' },
  { key: 'date', label: 'Display date' },
  { key: 'minutes', label: 'Read time (minutes)' },
  { key: 'summary', label: 'Summary', multiline: true },
  { key: 'image', label: 'Image URL' },
  { key: 'imageAlt', label: 'Image description' },
  { key: 'content', label: 'Story content', multiline: true },
]

const groups = [...new Set(contentFields.map((field) => field.group))]

function Admin({
  content,
  setContent,
  storageError,
}: {
  content: SiteContent
  setContent: Dispatch<SetStateAction<SiteContent>>
  storageError: string
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'page' | 'stories'>('overview')
  const [selectedStoryId, setSelectedStoryId] = useState(content.stories[0]?.id ?? '')
  const selectedStory = content.stories.find((story) => story.id === selectedStoryId)

  function updateField(key: ContentField['key'], value: string) {
    setContent((current) => ({ ...current, [key]: value }))
  }

  function updateStory(key: Exclude<keyof Story, 'id'>, value: string) {
    if (!selectedStory) return
    setContent((current) => ({
      ...current,
      stories: current.stories.map((story) =>
        story.id === selectedStory.id
          ? { ...story, [key]: key === 'minutes' ? Number(value) || 0 : value }
          : story,
      ),
    }))
  }

  function addStory() {
    const story: Story = {
      id: `story-${Date.now()}`,
      title: 'New story',
      category: 'From the factory',
      date: new Date().toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      minutes: 3,
      summary: '',
      image: '',
      imageAlt: '',
      content: '',
    }
    setContent((current) => ({ ...current, stories: [...current.stories, story] }))
    setSelectedStoryId(story.id)
  }

  function deleteStory() {
    if (!selectedStory || content.stories.length <= 1) return
    const remainingStories = content.stories.filter((story) => story.id !== selectedStory.id)
    setContent((current) => ({ ...current, stories: remainingStories }))
    setSelectedStoryId(remainingStories[0]?.id ?? '')
  }

  function exportContent() {
    const file = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = 'pramag-site-content.json'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/" aria-label="Pramag Foods home">
          <span className="admin-brand-mark">P</span>
          <span><strong>PRAMAG</strong><small>CONTENT STUDIO</small></span>
        </a>
        <div className="admin-sidebar-caption">WORKSPACE</div>
        <nav className="admin-nav" aria-label="Admin navigation">
          <button className={activeTab === 'overview' ? 'is-active' : ''} onClick={() => setActiveTab('overview')}>
            <span aria-hidden="true">◫</span> Overview
          </button>
          <button className={activeTab === 'page' ? 'is-active' : ''} onClick={() => setActiveTab('page')}>
            <span aria-hidden="true">▤</span> Page content
          </button>
          <button className={activeTab === 'stories' ? 'is-active' : ''} onClick={() => setActiveTab('stories')}>
            <span aria-hidden="true">▧</span> Journal stories
            <span className="admin-nav-count">{content.stories.length}</span>
          </button>
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="admin-local-indicator" />
          <span>Saved in this browser</span>
          <a href="/">← View website</a>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-breadcrumb">Pramag Foods <i>/</i> Admin</span>
            <h1>{activeTab === 'overview' ? 'Welcome back' : activeTab === 'page' ? 'Page content' : 'Journal stories'}</h1>
          </div>
          <div className="admin-top-actions">
            <span className={storageError ? 'admin-save-status has-error' : 'admin-save-status'}>
              <span /> {storageError ? 'Storage issue' : 'Auto-saved'}
            </span>
            <button className="admin-export-button" type="button" onClick={exportContent}>Export content</button>
            <a className="admin-preview-button" href="/">View website ↗</a>
          </div>
        </header>

        {storageError && <p className="admin-error" role="alert">{storageError}</p>}

        {activeTab === 'overview' && (
          <section className="admin-overview">
            <div className="admin-welcome-card">
              <div>
                <span className="admin-eyebrow">YOUR JOURNAL, YOUR VOICE</span>
                <h2>Keep the stories<br />coming.</h2>
                <p>Update the words, images and stories visitors see on the Pramag Foods website.</p>
                <button type="button" onClick={() => setActiveTab('page')}>Edit page content <span>→</span></button>
              </div>
              <div className="admin-welcome-decoration" aria-hidden="true">P</div>
            </div>
            <div className="admin-stats">
              <article><span>Published stories</span><strong>{content.stories.length}</strong><small>Showing in the journal</small></article>
              <article><span>Business location</span><strong>{content.location}</strong><small>Displayed on the website</small></article>
              <article><span>Contact number</span><strong>{content.phone}</strong><small>Tap-to-call enabled</small></article>
            </div>
            <div className="admin-overview-grid">
              <section className="admin-panel">
                <div className="admin-panel-heading"><div><span className="admin-eyebrow">CONTENT</span><h2>Recent stories</h2></div><button type="button" onClick={() => setActiveTab('stories')}>Manage all →</button></div>
                {content.stories.slice(0, 4).map((story) => (
                  <button className="admin-story-row" key={story.id} type="button" onClick={() => { setSelectedStoryId(story.id); setActiveTab('stories') }}>
                    <span className="admin-story-thumb">{story.image ? <img src={story.image} alt="" /> : 'P'}</span>
                    <span><strong>{story.title || 'Untitled story'}</strong><small>{story.category} · {story.date}</small></span>
                    <span className="admin-row-arrow">↗</span>
                  </button>
                ))}
              </section>
              <section className="admin-panel admin-quick-panel">
                <span className="admin-eyebrow">QUICK ACTIONS</span>
                <h2>What would you like to do?</h2>
                <button type="button" onClick={() => setActiveTab('page')}><span>✎</span><span><strong>Update page details</strong><small>Edit contact information, copy and images</small></span><b>→</b></button>
                <button type="button" onClick={() => { addStory(); setActiveTab('stories') }}><span>＋</span><span><strong>Write a new story</strong><small>Add a story to the journal</small></span><b>→</b></button>
              </section>
            </div>
            <p className="admin-prototype-note">This editor stores changes only in this browser. It is a prototype, not a secure publishing system.</p>
          </section>
        )}

        {activeTab === 'page' && (
          <section className="admin-editor">
            <div className="admin-editor-intro">
              <div><span className="admin-eyebrow">WEBSITE SETTINGS</span><h2>Everything visitors read.</h2><p>Update the site copy, links, contact details and image URLs. Use a new line in headings to control line breaks.</p></div>
              <a href="/" target="_blank" rel="noreferrer">Preview your changes ↗</a>
            </div>
            {groups.map((group) => (
              <section className="admin-field-group" key={group}>
                <h3>{group}</h3>
                <div className="admin-field-grid">
                  {contentFields.filter((field) => field.group === group).map((field) => (
                    <label className={field.multiline ? 'admin-field is-wide' : 'admin-field'} key={field.key}>
                      <span>{field.label}</span>
                      {field.multiline ? (
                        <textarea rows={field.key === 'metaDescription' || field.key === 'aboutBody' || field.key === 'heroDescription' ? 3 : 2} value={content[field.key]} onChange={(event) => updateField(field.key, event.target.value)} />
                      ) : (
                        <input value={content[field.key]} onChange={(event) => updateField(field.key, event.target.value)} />
                      )}
                      {field.hint && <small>{field.hint}</small>}
                    </label>
                  ))}
                </div>
              </section>
            ))}
            <p className="admin-save-hint">Changes save automatically in this browser.</p>
          </section>
        )}

        {activeTab === 'stories' && (
          <section className="admin-story-editor">
            <div className="admin-story-list">
              <div className="admin-story-list-heading"><div><span className="admin-eyebrow">JOURNAL</span><h2>All stories <small>{content.stories.length}</small></h2></div><button type="button" onClick={addStory}>＋ New story</button></div>
              {content.stories.map((story) => (
                <button className={selectedStoryId === story.id ? 'admin-story-select is-selected' : 'admin-story-select'} key={story.id} type="button" onClick={() => setSelectedStoryId(story.id)}>
                  <span className="admin-story-thumb">{story.image ? <img src={story.image} alt="" /> : 'P'}</span>
                  <span><strong>{story.title || 'Untitled story'}</strong><small>{story.category} · {story.date}</small></span>
                </button>
              ))}
            </div>
            {selectedStory ? (
              <div className="admin-story-form">
                <div className="admin-story-form-heading"><div><span className="admin-eyebrow">STORY DETAILS</span><h2>Edit story</h2></div><button className="admin-delete-button" type="button" disabled={content.stories.length <= 1} onClick={deleteStory}>Delete story</button></div>
                {storyFields.map((field) => (
                  <label className="admin-field" key={field.key}>
                    <span>{field.label}</span>
                    {field.key === 'content' ? <small>Separate paragraphs with a blank line.</small> : null}
                    {field.multiline ? (
                      <textarea rows={field.key === 'content' ? 11 : 4} value={String(selectedStory[field.key])} onChange={(event) => updateStory(field.key, event.target.value)} />
                    ) : (
                      <input type={field.key === 'minutes' ? 'number' : 'text'} min={field.key === 'minutes' ? 1 : undefined} value={String(selectedStory[field.key])} onChange={(event) => updateStory(field.key, event.target.value)} />
                    )}
                  </label>
                ))}
                <p className="admin-save-hint">Changes save automatically in this browser.</p>
              </div>
            ) : (
              <div className="admin-empty-story">Select a story to edit or add a new one.</div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default Admin
