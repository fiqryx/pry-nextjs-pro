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

export function OtpFormGroup({
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
                            <InputOTP maxLength={6}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} className="w-10 h-12" />
                                    <InputOTPSlot index={1} className="w-10 h-12" />
                                    <InputOTPSlot index={2} className="w-10 h-12" />
                                    <InputOTPSlot index={3} className="w-10 h-12" />
                                    <InputOTPSlot index={4} className="w-10 h-12" />
                                    <InputOTPSlot index={5} className="w-10 h-12" />
                                </InputOTPGroup>
                            </InputOTP>
                            <Button type="submit" className="w-fit">
                                Submit
                            </Button>
                        </div>
                        <div className="mt-4 text-xs">
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