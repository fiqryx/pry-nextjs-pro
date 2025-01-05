import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SignUpFormSimple({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div {...props} className={cn("flex flex-col gap-6", className)}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign up</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="first-name">
                                        First name
                                    </Label>
                                    <Input id="first-name" placeholder="Jhon" required />
                                </div>
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="last-name">
                                        Last name
                                    </Label>
                                    <Input id="last-name" placeholder="Diver" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Password
                                </Label>
                                <Input id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Create account
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <Button type="button" variant="outline" className="w-full">
                                <Icons.google className="mr-2 h-4 w-4" /> Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have account?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Sign in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
