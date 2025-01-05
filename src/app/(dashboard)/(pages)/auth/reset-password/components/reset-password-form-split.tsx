import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetPasswordFormSplit({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset password</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to reset your password
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="sr-only">Email</Label>
                    <Input
                        required
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>
                <Button type="submit" className="w-full">
                    Send
                </Button>
            </div>
        </form>
    )
}