import { render } from '@testing-library/react';
import { describe, expect,it } from 'vitest';
import { axe } from 'vitest-axe';

import { HowItWorksSection } from '@/features/home/components/how-it-works-section';

describe('HowItWorksSection', () => {
  it('should have no serious accessibility violations when rendered', async () => {
    const { container } = render(<HowItWorksSection />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
