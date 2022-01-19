interface ToolTip {
    position?: "left" | "right" | "bottom"
    tip: string
    children: React.ReactNode
}

export default function Tooltip(props: ToolTip) {
    const { position, tip, children } = props
    return (
        <div data-tip={tip} className={`tooltip ${position?.length! > 0 ? `tooltip-${position}` : ""}`}>
            {children}
        </div>
    )
}