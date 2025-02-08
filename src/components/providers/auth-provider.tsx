"use client"
import React from "react"
import { useAppStore } from "@/stores/app"
import { useAuthStore } from "@/stores/auth"
import { useSupabaseClient } from "@/lib/supabase/client"

export function AuthProvider({ children }: React.PropsWithChildren) {
    const app = useAppStore()
    const supabase = useSupabaseClient()
    const { user, set } = useAuthStore()

    async function getUser() {
        app.set({ loading: true })
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            const { id, email, user_metadata } = user;

            set({
                user: {
                    id,
                    email: email ?? 'anonymous',
                    avatar: user_metadata?.avatar_url,
                    firstName: user_metadata?.name,
                }
            })
        }

        app.set({ loading: false })
    }

    React.useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user, supabase])

    return children
}