import { create } from "zustand";


const useMenuStore = create((set) => ({
    sideBarOpen: false,
    handleSideBarOpen: () => set((state) => ({
        sideBarOpen: !state.sideBarOpen
    }))
}))

export {useMenuStore};