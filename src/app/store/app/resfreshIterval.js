import { create } from "zustand";

const idInterval = null;

const useInterval = create((set) => ({
    interval: idInterval,
    update: (data) => set((state) => {
        return {
            interval: data,
        }
    }),
}))

export {useInterval};