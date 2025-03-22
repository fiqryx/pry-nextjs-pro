/** @type {import('intl-gen').Options} */
const config = {
    ext: 'json',
    filename: 'translation',
    directory: ['locales'],
    languages: ['en', 'id', 'ja'],
    baseLanguage: 'en',
    ignoreExists: true,
    enableSubdirectory: true,
}

export default config