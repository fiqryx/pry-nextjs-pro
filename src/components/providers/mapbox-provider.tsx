"use client"
import React from "react"
import { MapProvider as MapGLProvider } from "react-map-gl";

export function MapProvider({
    children,
    ...props
}: React.ComponentProps<typeof MapGLProvider>) {
    return <MapGLProvider {...props}>{children}</MapGLProvider>
}