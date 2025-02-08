import { site } from '@/config/site'
import { createBrowserClient } from '@supabase/ssr'

export function useSupabaseClient(schema?: string) {
    // Create a supabase client on the browser with project's credentials
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            db: { schema },
            cookieOptions: {
                name: site.auth.key,
                maxAge: 7 * 3600,
            },
        }
    )
}