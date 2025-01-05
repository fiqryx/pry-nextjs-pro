import crypto from 'crypto';
import jwt from "jsonwebtoken"
import NextAuth from "next-auth"

import { site } from "@/config/site"
import { supabase } from "./supabase"
import { DefaultSession } from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"

import Discord from "next-auth/providers/discord"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

function validatePassword(input: string, hashed: string) {
    return crypto.createHmac('sha256', process.env.AUTH_SECRET as string)
        .update(input + hashed.slice(0, 16))
        .digest('hex') === hashed.slice(16);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-in',
    },
    cookies: {
        sessionToken: {
            name: site.auth.key,
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 7 * 3600,
    },
    adapter: SupabaseAdapter({
        url: process.env.SUPABASE_URL ?? '',
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    }),
    providers: [
        Discord,
        Google,
        GitHub,
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async ({ email, password }) => {
                const { data: user } = await supabase
                    .from("users")
                    .select()
                    .eq('email', email)
                    .limit(1)
                    .single()

                if (!user || !validatePassword(password as string, user?.password)) {
                    return null
                }

                return user
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user) {
                return true
            }
            return false
        },
        async session({ session, user }) {
            const signingSecret = process.env.SUPABASE_JWT_SECRET;
            if (signingSecret) {
                const payload = {
                    aud: "authenticated",
                    exp: Math.floor(new Date(session.expires).getTime() / 1000),
                    sub: user.id,
                    email: user.email,
                    role: "authenticated",
                }
                session.supabaseAccessToken = jwt.sign(payload, signingSecret)
            }
            return session
        },
    },
})

declare module "next-auth" {
    interface Session {
        supabaseAccessToken?: string
        user: {
            address: string
        } & DefaultSession["user"]
    }
}