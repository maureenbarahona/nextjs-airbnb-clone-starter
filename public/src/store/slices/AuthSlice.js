export const createAuthSlice = (set, get) => ({
  isAuthModalOpen: false,
  setAuthModal: () => {
    set({ isAuthModalOpen: !get().isAuthModalOpen });
  },
});
