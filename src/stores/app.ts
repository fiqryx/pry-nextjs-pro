import { merge } from 'lodash';
import { create } from 'zustand';
import { omit } from '@/lib/utils';
import { PresetKey } from '@/types/preset';
import { getCookie } from 'cookies-next/client';

export interface AppState {
    initialize: boolean
    loading?: boolean
    loading_message?: string
    color: Partial<Record<PresetKey, string>>
    locale: string
    sidebar_open: boolean
    sidebar_width: number
    navigation_open: Record<string, boolean>
}

export interface AppStore extends AppState {
    init: () => void
    set: (state: Partial<AppState>) => void
}

const key = "apps.settings";

const getStorages = (): Partial<AppState> => {
    const storage = localStorage.getItem(key);
    return storage ? JSON.parse(storage) : {};
}

export const useAppStore = create<AppStore>((set) => ({
    initialize: false,
    loading: false,
    locale: getCookie('LOCALE') ?? 'en',
    sidebar_open: true,
    sidebar_width: 256,
    navigation_open: {},
    color: {
        primary: 'blue',
        sidebar: 'default'
    },

    init: () => set((state) => {
        if (!state.initialize) {
            state = {
                ...state,
                ...getStorages(),
                initialize: true
            }
        }
        return state
    }),

    set: (state) => {
        state = merge({}, getStorages(), state);

        localStorage.setItem(key, JSON.stringify(
            omit(state, 'locale', 'loading', 'loading_message')
        ));

        set(state)
    },
}))
