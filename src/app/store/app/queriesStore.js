import { create } from "zustand";

const defaultUrl = '';

const useDynamicUrl = create((set) => ({
    url: defaultUrl,
    url_base: defaultUrl,
    update: (payload) => set((state) => {
        return {
            url: payload,
            url_base: state.url_base
        }
    }),
    updateBase: (payload) => set((state) => {
        return {
            url: state.url,
            url_base: payload
        }
    }),
}))

export {useDynamicUrl};