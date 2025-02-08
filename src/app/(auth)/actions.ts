'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SignInWithOAuthCredentials } from '@supabase/supabase-js'

type Schema = {
    email: string
    password: string
}

const getURL = (path: string = '') => {
    // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL &&
            process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
            ? process.env.NEXT_PUBLIC_SITE_URL
            : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
            process?.env?.NEXT_PUBLIC_VERCEL_URL &&
                process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
                ? process.env.NEXT_PUBLIC_VERCEL_URL
                : // If neither is set, default to localhost for local development.
                'http://localhost:3001/';

    // Trim the URL and remove trailing slash if exists.
    url = url.replace(/\/+$/, '');
    // Make sure to include `https://` when not localhost.
    if (!url.includes('localhost')) {
        url = url.includes('http') ? url : `https://${url}`;
    }
    // Ensure path starts without a slash to avoid double slashes in the final URL.
    path = path.replace(/^\/+/, '');

    // Concatenate the URL and the path.
    return path ? `${url}/${path}` : url;
};


export async function signInWithPassword(data: Schema) {
    const supabase = await createClient()

    return await supabase.auth.signInWithPassword(data)
}

export async function signInWithOAuth(credentials: SignInWithOAuthCredentials) {
    const supabase = await createClient()

    const { data } = await supabase.auth.signInWithOAuth({
        ...credentials,
        options: {
            ...credentials.options,
            redirectTo: getURL('/auth/callback'),
        }
    })

    if (data.url) {
        return redirect(data.url)
    }
}

export async function signUpWithPassword(data: Schema) {
    const supabase = await createClient()

    return await supabase.auth.signUp(data)
}