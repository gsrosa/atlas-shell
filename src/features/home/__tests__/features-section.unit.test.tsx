import { render } from '@testing-library/react';
import { describe, expect,it } from 'vitest';
import { axe } from 'vitest-axe';

import { FeaturesSection } from '@/features/home/components/features-section';

describe('FeaturesSection', () => {
  it('should have no serious accessibility violations when rendered', async () => {
    const { container } = render(<FeaturesSection />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
