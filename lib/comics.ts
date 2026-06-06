export type Comic = {
  id: string;
  title: string;
  issue: string;
  pdf: string;
  pages: number;
  ratio: number;
  accent: string;
  isNew: boolean;
  emoji: string;
  blurb: string;
};

export const COMICS: Comic[] = [
  { id: 'issue-1', title: "The Cookie That Wouldn't Come Out Right", issue: 'Issue #1',
    pdf: '/comics/issue-1.pdf', pages: 4, ratio: 1.415, accent: '#C0822E', isNew: false,
    emoji: '🍪', blurb: 'Sia is baking yummy cookies… but they keep coming out all silly and wrong!' },
  { id: 'issue-2', title: 'The Spilled Flower Pot', issue: 'Issue #2',
    pdf: '/comics/issue-2.pdf', pages: 4, ratio: 1.414, accent: '#7A5CC8', isNew: false,
    emoji: '🌷', blurb: 'Uh oh a flower pot takes a tumble! Can Sia clean up the muddy mess?' },
  { id: 'issue-3', title: 'Where Does Rain Come From?', issue: 'Issue #3',
    pdf: '/comics/issue-3.pdf', pages: 4, ratio: 1.414, accent: '#2C6FB0', isNew: false,
    emoji: '🌧️', blurb: 'Drip, drop! Sia goes on a big mission to discover where rain comes from.' },
  { id: 'issue-4', title: 'The Dark and the Stars', issue: 'Issue #4',
    pdf: '/comics/issue-4.pdf', pages: 4, ratio: 1.414, accent: '#5A5CC8', isNew: false,
    emoji: '⭐', blurb: 'When the lights go out, Sia learns the night sky has a twinkly secret.' },
  { id: 'issue-5', title: 'The Hiccups That Would Not Stop!', issue: 'Issue #5',
    pdf: '/comics/issue-5.pdf', pages: 5, ratio: 1.414, accent: '#3A8B6A', isNew: false,
    emoji: '😆', blurb: 'Hic! Hic! Sia’s hiccups just won’t stop. Will ANYTHING make them go away?' },
  { id: 'issue-6', title: 'The Monster Under My Bed!', issue: 'Issue #6',
    pdf: '/comics/issue-6.pdf', pages: 5, ratio: 1.414, accent: '#6C4FB0', isNew: false,
    emoji: '👹', blurb: 'Something is hiding under the bed… is it a scary monster, or a brand new friend?' },
  { id: 'issue-7', title: "Sia's Super Silly Science Day!", issue: 'Issue #7',
    pdf: '/comics/issue-7.pdf', pages: 5, ratio: 1.414, accent: '#1FA98C', isNew: true,
    emoji: '🔬', blurb: 'Bubbles, fizzes and a giant whoosh! Sia turns her day into one super-silly science experiment.' },
];
