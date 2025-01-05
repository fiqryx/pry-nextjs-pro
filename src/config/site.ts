export const site = {
    name: 'Pry',
    description: '',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    version: process.env.NEXT_PUBLIC_SITE_VERSION,
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL,
    auth: {
        key: 'session.token'
    },
    mapbox: {
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    }
}