"use client"
import { z } from "zod"
import React from "react"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

import {
  signInWithOAuth,
  signInWithPassword
} from "../../actions"
import {
  EyeIcon,
  EyeOffIcon
} from "lucide-react"
import {
  Input,
  InputIcon
} from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
  email: z.string({ required_error: "email is required" }).
    min(1, { message: "email is required" }).
    email({ message: 'invalid email address' }),
  password: z.string({ required_error: 'password is required' }).
    min(1, { message: "password is required" })
})

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showPassword, setshowPassword] = React.useState<boolean>(false)

  const { setError, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "user@example.com",
      password: "user123",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { error } = await signInWithPassword(values)

    if (error) {
      setIsLoading(false)
      toast({ description: error.message })
      return
    }

    setIsLoading(false)
    window.location.reload()
  }

  return (
    <div {...props} className={cn("grid gap-6", className)}>
      <Form setError={setError} {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isLoading}
                      placeholder="Enter email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      disabled={isLoading}
                      placeholder="Enter password"
                      {...field}
                    >
                      <InputIcon
                        position="right"
                        className="cursor-pointer"
                        onClick={() => setshowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeIcon className="size-4" />
                        ) : (
                          <EyeOffIcon className="size-4" />
                        )}
                      </InputIcon>
                    </Input>
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in with email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => signInWithOAuth({ provider: 'discord' })}
        >
          <Icons.discord className="mr-2 h-4 w-4" /> Discord
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => signInWithOAuth({ provider: 'github' })}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" /> GitHub
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => signInWithOAuth({ provider: 'google' })}
        >
          <Icons.google className="mr-2 h-4 w-4" /> Google
        </Button>
      </div>
    </div>
  )
}
