import { deleteTokens, getAccessTokenFromCookie,getKeyTokenFromCookie } from "../../utilities/web/accionToken";
import { create } from "zustand";
import {jwtDecode} from './../../../../node_modules/jwt-decode';

const accessToken = getAccessTokenFromCookie() ? jwtDecode(getAccessTokenFromCookie()) : getAccessTokenFromCookie();
const keyToken = atob(getKeyTokenFromCookie() ?? '');
const useAuth = create((set) => ({
    user: accessToken,
    login: accessToken ? true : false,
    save: (data) => set((state) => {
        const {token} = data;
        document.cookie = `accessToken=${token}; Secure; SameSite=Strict; path=/`;
        return {
            user: data.user,
            isLogin: true
        }
    }),
    delete: () => set((state) => {
        deleteTokens('accessToken');
        deleteTokens('keyToken');
        return{
            user: null,
            isLogin: false
        }
    })
}))

const useAccessToken = create((set) => ({
    token: keyToken,
    save: (data) => set((state) => {
        const {accessToken} = data;
        document.cookie = `keyToken=${btoa(accessToken)}; Secure; SameSite=Strict; path=/`;
        return {
            token: accessToken,
        }
    })
}))

export {useAuth,useAccessToken};