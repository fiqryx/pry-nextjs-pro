import languages from '@/../locales/languages.json'
import resourcesToBackend from 'i18next-resources-to-backend';

import { Config } from "next-i18n-router/dist/types";
import { initReactI18next } from 'react-i18next/initReactI18next';
import {
    i18n,
    Resource,
    createInstance,
} from 'i18next';


const i18nConfig = {
    defaultLocale: 'en',
    locales: languages.map(v => v.code),
} satisfies Config

export async function i18nInitialize(
    locale: string,
    namespaces: string[],
    i18nInstance?: i18n,
    resources?: Resource,
) {
    i18nInstance = i18nInstance || createInstance();

    i18nInstance.use(initReactI18next);

    if (!resources) {
        i18nInstance.use(
            resourcesToBackend((language: string, namespace: string) => {
                return import(`../../locales/${language}/${namespace}.json`)
            }),
        );
    }

    await i18nInstance.init({
        lng: locale,
        resources,
        fallbackLng: i18nConfig.defaultLocale,
        supportedLngs: i18nConfig.locales,
        defaultNS: namespaces[0],
        fallbackNS: namespaces[0],
        ns: namespaces,
        preload: resources ? [] : i18nConfig.locales,
    });

    return {
        i18n: i18nInstance,
        resources: i18nInstance.services.resourceStore.data,
        t: i18nInstance.t,
    }
}