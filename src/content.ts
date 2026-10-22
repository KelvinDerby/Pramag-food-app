import { useRef, useState, type Dispatch, type SetStateAction } from 'react'

export type Story = {
  id: string
  category: string
  date: string
  image: string
  imageAlt: string
  minutes: number
  title: string
  summary: string
  content: string
}

export type SiteContent = {
  companyName: string
  pageTitle: string
  metaDescription: string
  logoImageUrl: string
  logoImageAlt: string
  announcement: string
  navHome: string
  navJournal: string
  navAbout: string
  navContact: string
  headerButton: string
  heroEyebrow: string
  heroTitle: string
  heroDescription: string
  heroButton: string
  heroNote: string
  heroImage: string
  heroImageAlt: string
  heroImageKicker: string
  heroCaption: string
  featuredKicker: string
  featuredButton: string
  journalKicker: string
  journalTitle: string
  searchPlaceholder: string
  noResults: string
  clearFilters: string
  aboutKicker: string
  aboutTitle: string
  aboutBody: string
  facebookUrl: string
  facebookLabel: string
  signoff: string
  contactKicker: string
  contactTitle: string
  contactBody: string
  phone: string
  location: string
  footerTagline: string
  footerContactLabel: string
  footerSocialLabel: string
  footerJournalLabel: string
  footerLocation: string
  footerBackToTop: string
  rootsImage: string
  rootsImageAlt: string
  rootsImageCaption: string
  stories: Story[]
}

export const defaultContent: SiteContent = {
  companyName: 'Pramag Foods LTD',
  pageTitle: 'Pramag Foods Journal | Sausage production in Sunyani',
  metaDescription:
    'Stories, serving inspiration and local roots from Pramag Foods, a sausage production factory in Mantukwa, Sunyani.',
  logoImageUrl: '',
  logoImageAlt: 'Pramag Foods',
  announcement: 'Pramag Foods LTD · Sausage production in Sunyani',
  navHome: 'Home',
  navJournal: 'The journal',
  navAbout: 'Our roots',
  navContact: 'Contact',
  headerButton: 'Explore stories',
  heroEyebrow: 'THE PRAMAG JOURNAL',
  heroTitle: 'Sausage making.\nLocal roots.\nGood food.',
  heroDescription:
    'Stories from our sausage production factory in Mantukwa, plus simple serving ideas and inspiration for the table.',
  heroButton: 'Read our stories',
  heroNote: 'Sausage makers\nin Mantukwa, Sunyani',
  heroImage:
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=90',
  heroImageAlt: 'Sausages ready to be prepared for a meal',
  heroImageKicker: 'PRAMAG FOODS · MANTUKWA',
  heroCaption: 'Sausage production, rooted in Sunyani',
  featuredKicker: 'FROM OUR PRODUCTION JOURNAL',
  featuredButton: 'Read the story',
  journalKicker: 'FRESH FROM THE JOURNAL',
  journalTitle: 'Stories worth\nsharing.',
  searchPlaceholder: 'Find a story...',
  noResults: 'No stories found just yet.',
  clearFilters: 'Clear filters',
  aboutKicker: 'A LITTLE ABOUT US',
  aboutTitle: 'Sausage makers.\nRooted in Sunyani.',
  aboutBody:
    'Pramag Foods LTD is a sausage production factory based in Mantukwa, Sunyani. This journal is where we share stories from sausage production, serving inspiration and the local community.',
  facebookUrl: 'https://www.facebook.com/p/Pramag-foods-LTD-100064004773538/',
  facebookLabel: 'Find Pramag Foods on Facebook',
  signoff: 'Made with care, shared with love.',
  contactKicker: 'WANT TO KNOW MORE?',
  contactTitle: 'Let’s talk sausages.',
  contactBody: 'Get in touch with Pramag Foods in Mantukwa, Sunyani.',
  phone: '0596762017',
  location: 'Mantukwa, Sunyani',
  footerTagline: 'Good food. Good stories.\nGood living.',
  footerContactLabel: 'COME SAY HELLO',
  footerSocialLabel: 'FIND US ONLINE',
  footerJournalLabel: 'The journal',
  footerLocation: 'Rooted in Mantukwa, Sunyani, Ghana',
  footerBackToTop: 'Back to the top',
  rootsImage:
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85',
  rootsImageAlt: 'A green landscape under the warm afternoon sun',
  rootsImageCaption: 'OUR ROOTS · SUNYANI, GHANA',
  stories: [
    {
      id: 'factory-to-table',
      category: 'From the factory',
      date: 'October 18, 2026',
      image:
        'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'Sausages prepared for a meal',
      minutes: 5,
      title: 'From sausage production to the family table',
      summary:
        'Take a closer look at how sausage production connects the factory to the meals and moments we share at home.',
      content:
        'Sausages are a familiar favourite at many tables, served in all sorts of ways. Behind each meal is a production journey that brings the finished food from the factory to the people who enjoy it.\n\nAt Pramag Foods, we make sausages in Mantukwa, Sunyani. We are proud to be part of a food industry that connects local businesses, shops and home kitchens.\n\nHere on the journal, we will share ideas, recipes and stories from the world of sausage production and the tables where good food brings people together.',
    },
    {
      id: 'mantukwa-roots',
      category: 'Local roots',
      date: 'October 12, 2026',
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'Green landscape in the Ghanaian countryside',
      minutes: 4,
      title: 'Made in Mantukwa, part of the Sunyani community',
      summary:
        'Our sausage production factory is based in Mantukwa. Here’s why being part of the Sunyani community matters to us.',
      content:
        'Pramag Foods is based in Mantukwa, Sunyani, where our factory produces sausages. Being part of this community is an important part of who we are.\n\nThe food we enjoy often brings people together across homes, neighbourhoods and local businesses. We are glad to contribute to that everyday food culture from right here in the Bono Region.\n\nWe look forward to sharing more stories from our home in Mantukwa. For enquiries, give us a call or find us on Facebook.',
    },
    {
      id: 'serving-sausages',
      category: 'At the table',
      date: 'October 4, 2026',
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'A fresh salad served as a colourful side dish',
      minutes: 3,
      title: 'Three easy ways to serve sausages',
      summary:
        'Looking for simple inspiration? Pair sausages with a favourite side, tuck them into a roll or add them to a sharing platter.',
      content:
        'Keep it simple: serve sausages alongside a salad or your favourite vegetables for an easy meal.\n\nFor a quick lunch, tuck a cooked sausage into a roll and add the toppings you enjoy. Or make a sharing platter with a few sides for a relaxed meal with family and friends.\n\nHowever you serve them, follow the preparation and cooking directions on the product packaging.',
    },
    {
      id: 'choosing-sausages',
      category: 'From the factory',
      date: 'September 26, 2026',
      image:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'Food being prepared in a kitchen',
      minutes: 6,
      title: 'What to look for when choosing sausages',
      summary:
        'A few practical reminders can help make shopping for sausages easier, from checking the label to planning how you’ll serve them.',
      content:
        'Start by checking the product label for the ingredients, storage information and cooking directions. These details help you choose a product and plan how to prepare it.\n\nThink about the meal you have in mind, too. A sausage for a quick roll, a family meal or a weekend grill might call for different accompaniments.\n\nOnce home, follow the package guidance for storage and preparation. When in doubt, check the label or contact the producer.',
    },
  ],
}

const storageKey = 'pramag-site-content'

export function readSiteContent(): SiteContent {
  const saved = localStorage.getItem(storageKey)
  if (!saved) return defaultContent

  const parsed: unknown = JSON.parse(saved)
  if (!isSiteContent(parsed)) {
    throw new Error('Saved site content has an invalid format.')
  }
  return parsed
}

export function saveSiteContent(content: SiteContent) {
  localStorage.setItem(storageKey, JSON.stringify(content))
}

export function useSiteContent() {
  const [initialState] = useState(() => {
    try {
      return { content: readSiteContent(), error: '' }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Browser storage is unavailable.'
      return {
        content: defaultContent,
        error: `Saved site content could not be loaded: ${message}`,
      }
    }
  })
  const [content, setContentState] = useState(initialState.content)
  const [storageError, setStorageError] = useState(initialState.error)
  const contentRef = useRef(content)

  const updateContent: Dispatch<SetStateAction<SiteContent>> = (nextState) => {
    const nextContent =
      typeof nextState === 'function' ? nextState(contentRef.current) : nextState
    contentRef.current = nextContent
    setContentState(nextContent)
    try {
      saveSiteContent(nextContent)
      setStorageError('')
    } catch {
      setStorageError('Changes could not be saved in this browser.')
    }
  }

  return { content, setContent: updateContent, storageError }
}

function isSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  const hasValidTextFields = Object.entries(defaultContent).every(
    ([key, defaultValue]) =>
      key === 'stories' ||
      typeof defaultValue !== 'string' ||
      typeof candidate[key] === 'string',
  )
  return (
    hasValidTextFields &&
    Array.isArray(candidate.stories) &&
    candidate.stories.every(isStory)
  )
}

function isStory(value: unknown): value is Story {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.category === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.summary === 'string' &&
    typeof candidate.content === 'string' &&
    typeof candidate.image === 'string' &&
    typeof candidate.imageAlt === 'string' &&
    typeof candidate.date === 'string' &&
    typeof candidate.minutes === 'number'
  )
}
