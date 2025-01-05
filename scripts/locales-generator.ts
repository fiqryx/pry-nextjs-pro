import IntlGen from 'intl-gen'

const intlGen = new IntlGen({
    directory: ['locales'],
    languages: require('../locales/languages.json'),
    filename: 'translation.json',
    default_language: 'en',
    auto_override: true,
    skip_region: true,
    locale_directory: true,
})

intlGen.run()