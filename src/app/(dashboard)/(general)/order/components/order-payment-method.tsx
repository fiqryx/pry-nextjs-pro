import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"

interface Props extends React.ComponentProps<'div'> {
    name: string
    accountNo: string
}

export function OrderPaymentMethod({
    name,
    accountNo,
    className,
    ...props
}: Props) {
    const src = `/assets/payment-${name.toLowerCase().replaceAll(' ', '-')}.png`;

    return (
        <div {...props} className={cn('flex items-center gap-2 px-1 py-1.5', className)}>
            <Avatar className="size-10 rounded-full border">
                <AvatarImage src={src} alt={name} />
                <AvatarFallback className="rounded-full">
                    <ImageIcon className="text-muted-foreground" />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col max-w-xs">
                <span className="text-sm">
                    {name}
                </span>
                <span className="text-xs text-muted-foreground">
                    {accountNo}
                </span>
            </div>
        </div>
    )
}