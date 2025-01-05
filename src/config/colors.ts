import { Preset, PresetKey } from "@/types/preset"
/*
    after add new color you must add className on styles/theme.css for a new color
    @example
    .primary-{color} && .dark .primary-{color}
    .sidebar-{sidebar_color} && .dark .sidebar-{sidebar_color}
*/
export const colors: Record<PresetKey, Preset[]> = {
    primary: [
        {
            label: 'Sapphire',
            color: 'blue'
        },
        {
            label: 'Lavender',
            color: 'violet'
        },
        {
            label: 'Spearmint',
            color: 'lime'
        },
        {
            label: 'Cyan',
            color: 'cyan'
        },
        {
            label: 'Crimson',
            color: 'rose'
        },
    ],
    sidebar: [
        {
            label: 'Default',
            color: 'default'
        },
        {
            label: 'Ebony',
            color: 'zinc'
        },
        {
            label: 'Midnight',
            color: 'slate'
        },
        {
            label: 'Charcoal',
            color: 'stone'
        },
    ]
}