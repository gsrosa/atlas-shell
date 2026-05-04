import { describe, expectTypeOf, it } from 'vitest';

import type { ExposedModules } from '@/shared/constants/module-names';

describe('ExposedModules', () => {
  it('includes route-level user and payment bootstrap names', () => {
    expectTypeOf<'ProfileLayout'>().toExtend<ExposedModules>();
    expectTypeOf<'ProfilePage'>().toExtend<ExposedModules>();
    expectTypeOf<'PasswordPage'>().toExtend<ExposedModules>();
    expectTypeOf<'UserPreferencesPage'>().toExtend<ExposedModules>();
    expectTypeOf<'UserPaymentsPage'>().toExtend<ExposedModules>();
    expectTypeOf<'AddCreditsPage'>().toExtend<ExposedModules>();
  });
});
