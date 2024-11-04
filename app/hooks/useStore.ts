import { ModalState, UserState } from '@/types/store'

import { getCookie } from 'cookies-next'
import { create } from 'zustand'

const cookie = getCookie('authToken')
export const modalStore = create<ModalState>((set) => ({
  showModal: {},
  toggleModal: (modalName) =>
    set((state) => ({
      showModal: {
        ...state.showModal,
        [modalName]: !state.showModal[modalName]
      }
    })),
  closeAllModals: () => set({ showModal: {} })
}))

export const userStore = create<UserState>((set) => ({
  isAuth: !!cookie,
  setIsAuth: () => set((state) => ({ isAuth: !state.isAuth }))
}))
