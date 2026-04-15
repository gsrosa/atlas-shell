export type HomeDestination = {
  name: string;
  country: string;
  hook: string;
  tag: string;
  color: string;
  emoji: string;
  /** Full-bleed card image (Stitch / editorial) */
  imageUrl?: string;
  /** Small chips above title, e.g. duration / vibe */
  badges?: string[];
};

export type HowItWorksIconKey = 'map' | 'sparkles' | 'plane';

export type HowItWorksStep = {
  num: string;
  iconKey: HowItWorksIconKey;
  title: string;
  body: string;
};

export type HomeStat = {
  to: number;
  suffix: string;
  label: string;
};

export type HomeTestimonial = {
  quote: string;
  name: string;
  city: string;
};

export type HomeFeatureItem = {
  title: string;
  body: string;
};
