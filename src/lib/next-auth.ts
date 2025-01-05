import NextAuth from "next-auth"

import { User } from "next-auth"
import { site } from "@/config/site"
import { logger } from "./logger"

import Discord from "next-auth/providers/discord"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

const user = {
    id: '1',
    image: '/assets/avatar-8.jpg',
    name: 'Jhon Diver',
    email: 'user@example.com',
} satisfies User;

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
        maxAge: 7 * 3600,
    },
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
                try {
                    // logic to verify if the user exists
                    if (email !== user.email || password !== "user123") {
                        throw new Error("Invalid credentials.")
                    }

                    return user
                } catch (error) {
                    logger.error(error)

                    return null
                }
            },
        }),
    ],
})