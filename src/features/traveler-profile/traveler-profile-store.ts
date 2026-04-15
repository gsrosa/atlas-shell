import { create } from 'zustand';

type TravelerProfileUiState = {
  tier1Complete: boolean | null;
  setSnapshot: (snapshot: { tier1Complete: boolean } | null) => void;
};

export const useTravelerProfileUiStore = create<TravelerProfileUiState>((set) => ({
  tier1Complete: null,
  setSnapshot: (snapshot) =>
    set(snapshot === null ? { tier1Complete: null } : { tier1Complete: snapshot.tier1Complete }),
}));
