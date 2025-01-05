export interface Block {
    source?: string
    code?: string
    className?: string
    component?: React.ElementType | React.LazyExoticComponent<() => React.JSX.Element>
}