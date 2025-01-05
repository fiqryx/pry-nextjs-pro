"use client"

import React from "react"
import { useAppStore } from "@/stores/app"
import { useAuthStore } from "@/stores/auth"
import { useSession } from "next-auth/react"

export function AuthProvider({ children }: React.PropsWithChildren) {
    const appStore = useAppStore()
    const { user, set } = useAuthStore()
    const { data: session } = useSession()

    const gettingSession = React.useCallback(async () => {
        appStore.set({ loading: true })

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = session?.user;

        set({
            user: {
                id: user?.id as string,
                email: user?.email as string,
                firstName: user?.name as string,
                avatar: user?.image as string
            }
        })

        appStore.set({ loading: false })
    }, [user, session?.user])

    React.useEffect(() => {
        if (!user && session?.user) {
            gettingSession()
        }
    }, [user, session?.user])

    return children
}