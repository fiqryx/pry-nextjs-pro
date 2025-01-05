'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator
} from "@/components/ui/input-otp"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function OtpFormPattern({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div {...props} className={cn("flex flex-col gap-6", className)}>
            <Card>
                <CardHeader className="items-center">
                    <CardTitle className="text-2xl">One-time password</CardTitle>
                    <CardDescription>
                        Please enter the one-time password sent to your phone
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col items-center gap-6">
                            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} className="w-10 h-12" />
                                    <InputOTPSlot index={1} className="w-10 h-12" />
                                    <InputOTPSlot index={2} className="w-10 h-12" />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} className="w-10 h-12" />
                                    <InputOTPSlot index={4} className="w-10 h-12" />
                                    <InputOTPSlot index={5} className="w-10 h-12" />
                                </InputOTPGroup>
                            </InputOTP>
                            <Button type="submit" className="w-full max-w-xs">
                                Submit
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-xs">
                            Don't receive code?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Resend
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}