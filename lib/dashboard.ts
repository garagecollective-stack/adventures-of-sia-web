/* ════════════════════════════════════════════════════════════════
   Central content store ("dashboard") for the footer pages.
   Edit defaults here, or use /dashboard to edit live (saved per-browser
   in localStorage). All footer pages read their content from here.
   ════════════════════════════════════════════════════════════════ */

export type Block = { heading: string; text: string };
export type PageData = {
  emoji: string;
  title: string;
  subtitle: string;
  comingSoon?: boolean;   // shop-style "coming soon" layout
  blocks: Block[];
};

export const PAGE_ORDER = ['help', 'privacy', 'terms', 'contact', 'shop'] as const;
export type PageSlug = typeof PAGE_ORDER[number];

export const DEFAULT_PAGES: Record<PageSlug, PageData> = {
  help: {
    emoji: '🛟', title: 'Help Center',
    subtitle: 'Hop in answers to the questions little explorers (and their grown-ups) ask most.',
    blocks: [
      { heading: 'How do I play the games?', text: 'Scroll to “Play with Sia”, tap any game card, choose a level from the map and press Play. Every game has 5 friendly levels to unlock!' },
      { heading: 'Are the games safe for young children?', text: 'Yes! Every game is designed for ages 2–8 with big tap targets, gentle rules and no fail states just happy learning.' },
      { heading: 'How do I read and download the comics?', text: 'Open any comic in the “Sia Comics” section to read it as a PDF, then tap “Download PDF” to keep it forever.' },
      { heading: 'I found a problem who do I tell?', text: 'We’d love to help! Visit our Contact Us page and drop us a message. We read every one. 💜' },
    ],
  },
  privacy: {
    emoji: '🔒', title: 'Privacy Policy',
    subtitle: 'Your family’s privacy matters to us. Here’s how we keep things safe and simple.',
    blocks: [
      { heading: 'What we collect', text: 'Adventures of Sia is built for children, so we collect as little as possible. If you join our newsletter, we store only the email address you give us.' },
      { heading: 'Game progress', text: 'Your stars and unlocked levels are saved only in your own browser (localStorage). They never leave your device and are not sent to us.' },
      { heading: 'No third-party ads', text: 'We show no third-party advertising and do not track children across the web. Ever.' },
      { heading: 'Questions?', text: 'Reach out any time through our Contact Us page and we’ll be glad to explain anything.' },
    ],
  },
  terms: {
    emoji: '📜', title: 'Terms of Use',
    subtitle: 'The friendly fine print for enjoying Sia’s meadow world.',
    blocks: [
      { heading: 'Just for fun & learning', text: 'Adventures of Sia is provided for children’s entertainment and learning. Please enjoy it with a grown-up nearby.' },
      { heading: 'Our characters', text: 'Sia, Milo, Arlo and all artwork are part of the Adventures of Sia world. Please don’t reuse them commercially without permission.' },
      { heading: 'Being kind', text: 'Use the site kindly and safely. We may update these terms occasionally to keep everyone happy and protected.' },
    ],
  },
  contact: {
    emoji: '✉️', title: 'Contact Us',
    subtitle: 'We’d love to hear from you questions, ideas, or just a friendly hello!',
    blocks: [
      { heading: 'Email', text: 'hello@adventuresofsia.com we reply within a couple of days.' },
      { heading: 'For parents', text: 'Have a question about safety or learning? Pop over to our For Parents page for the full guide.' },
      { heading: 'Say hi on social', text: 'Find us on YouTube, Instagram, TikTok and Facebook for new stories, games and cute surprises.' },
    ],
  },
  shop: {
    emoji: '🛍️', title: "Sia's Shop", comingSoon: true,
    subtitle: 'Plushies, books and magical surprises are hopping their way to you!',
    blocks: [
      { heading: '🧸 Toys & Plushies', text: 'Soft, cuddly Sia, Milo & Arlo plushies to hug all night long.' },
      { heading: '📚 Story Books', text: 'Beautiful picture books full of Sia’s magical meadow adventures.' },
      { heading: '🎒 Accessories', text: 'Backpacks, bottles, stickers and more bring Sia everywhere!' },
    ],
  },
};

const KEY = 'sia-dashboard-v1';

export function loadPages(): Record<PageSlug, PageData> {
  if (typeof window === 'undefined') return DEFAULT_PAGES;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_PAGES, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return DEFAULT_PAGES;
}

export function savePages(pages: Record<PageSlug, PageData>) {
  try { localStorage.setItem(KEY, JSON.stringify(pages)); } catch { /* ignore */ }
}

export function resetPages() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
