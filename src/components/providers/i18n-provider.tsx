"use client"

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18nInitialize } from '@/lib/i18n';
import {
    type Resource,
    createInstance,
} from 'i18next';


interface I18nProviderProps {
    locale: string;
    namespaces: string[];
    resources: Resource;
}

const I18nProvider = React.memo<React.PropsWithChildren<I18nProviderProps>>(
    ({ children, locale, namespaces, resources }) => {
        const i18n = createInstance();
        i18nInitialize(locale, namespaces, i18n, resources);

        return (
            <I18nextProvider i18n={i18n}>
                {children}
            </I18nextProvider>
        )
    },
)

export {
    I18nProvider
}