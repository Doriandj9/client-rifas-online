import { create } from "zustand";

const defaultRaffle = {};
const defaultTicketsRaffle = [];
export const defaultDrawParameters = JSON.stringify({
    assignation: false,
    draw: null,
    status: '',
    total_attempts: 0,
    current_attempts: 0,
    final: false
});

export const defaultDrawDetails = JSON.stringify({
    tickets_winner: [],
    tickets_discarded: []
})

const useIsAttempt = create((set) => ({
    isAttempt: false,
    update: (payload) => set((state) => ({
        isAttempt: payload
    }))
}))

const useSynchronized = create((set) => ({
    synchronized: false,
    update: (payload) => set((state) => ({
        synchronized: payload
    }))
}))

const useRaffleStore = create((set) => ({
    raffle: defaultRaffle,
    update: (payload) => set((state) => ({
        raffle: payload
    }))
}))

const useTicketsRaffleStore = create((set) => ({
    ticketsRaffle: defaultTicketsRaffle,
    update: (payload) => set((state) => ({
        ticketsRaffle: payload
    }))
}))

const useDrawParameters = create((set) => ({
    drawParameters: defaultDrawParameters,
    update: (payload) => set((state) => {
        localStorage.setItem('draw_parameters',payload);
        return {
            drawParameters: payload
        }
    })
}))

const useDrawDetails = create((set) => ({
    drawDetails: defaultDrawDetails,
    update: (payload) => set((state) => {
        localStorage.setItem('draw_details',payload);
        return {
            drawDetails: payload
        }
    })
}))

export {useRaffleStore, useDrawParameters, useDrawDetails, useTicketsRaffleStore, useIsAttempt, useSynchronized};