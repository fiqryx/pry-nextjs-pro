import { create } from 'zustand';
import { User } from '@/types/user';
import { site } from '@/config/site';
import {
    setCookie,
    getCookie,
    deleteCookie,
} from 'cookies-next/client';

export interface AuthState {
    token?: string
    user?: User
}

export interface AuthStore extends AuthState {
    set: (state: Partial<AuthState>) => void
    reset: () => void
}

const key = site.auth.key

export const useAuthStore = create<AuthStore>((set) => ({
    token: getCookie(key),

    set: (state) => set(prev => {
        if (state.token) {
            setCookie(key, state.token, {
                secure: true,
                maxAge: 7 * 3600
            })
        }

        return {
            ...prev,
            ...state
        }
    }),

    reset: () => {
        deleteCookie(key, { secure: true })
        set({
            token: undefined,
            user: undefined
        })
    }
}))