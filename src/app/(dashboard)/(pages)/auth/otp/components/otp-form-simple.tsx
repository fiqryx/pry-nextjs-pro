import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function OtpFormSimple({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">One-time password</CardTitle>
                    <CardDescription>
                        Please enter the one-time password sent to your phone
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-center gap-2">
                                <InputOTP maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} className="w-10 h-12" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={1} className="w-10 h-12" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={2} className="w-10 h-12" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} className="w-10 h-12" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} className="w-10 h-12" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={5} className="w-10 h-12" />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
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