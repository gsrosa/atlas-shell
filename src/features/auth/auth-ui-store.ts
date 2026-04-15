import { create } from 'zustand';

type AuthUiState = {
  loginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
};

export const useAuthUiStore = create<AuthUiState>((set) => ({
  loginOpen: false,
  openLogin: () => set({ loginOpen: true }),
  closeLogin: () => set({ loginOpen: false }),
}));

/** Works across microfrontends: shell listens on `atlas:request-login`. */
export const requestLogin = (): void => {
  window.dispatchEvent(new CustomEvent('atlas:request-login'));
};
