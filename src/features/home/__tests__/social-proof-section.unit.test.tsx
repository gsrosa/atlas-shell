import { render } from '@testing-library/react';
import { describe, expect,it } from 'vitest';
import { axe } from 'vitest-axe';

import { SocialProofSection } from '@/features/home/components/social-proof-section';

describe('SocialProofSection', () => {
  it('should have no serious accessibility violations when rendered', async () => {
    const { container } = render(<SocialProofSection />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
