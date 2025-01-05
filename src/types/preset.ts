
export type PresetKey =
    | 'primary'
    | 'sidebar'

/**
 * List of color on app setings
 */
export interface Preset {
    /**
     * label for showing on options
     */
    label: string
    /**
     * className on theme.css
     * @example .{keyColors}-{color}
     */
    color: string
}