import { login } from '@/app/_actions/auth'
import { LoginSchema, LoginType } from '@/app/_actions/auth/types'
import { Button } from '@/components/ui/button'
import { DialogBody, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Mode } from '@/config'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const LoginContent: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginType> = useCallback(async (value) => {
    console.log(value)
    const data = await login(value)
    if (data.error) toast.error(data.error)
    // await signIn('credentials', {
    //   email,
    //   password,
    //   redirectTo: DEFAULT_LOGIN_REDIRECT,
    // })
    // await signIn('credentials',)
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 relative"
      >
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col justify-center items-center">
          <div className="mt-2 mb-6">
            <div className="size-[120px] rounded-full bg-neutral-800 flex justify-center items-center text-white text-3xl">
              S
            </div>
          </div>
          <div className="mb-4">fo•••••••••op@gmail.com</div>
          <div className="w-full border border-zinc-400 rounded-lg">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      className="border-none rounded-lg focus-visible:ring-inset "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="bg-zinc-400" />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="border-none rounded-lg focus-visible:ring-inset "
                      />
                      <Button
                        variant="link"
                        className="absolute right-0 top-[50%] translate-y-[-50%] text-xs font-semibold text-base-primary underline underline-offset-1"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'Hidden' : 'Show'}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="flex-col gap-3">
            <Button
              type="submit"
              className="mb-4"
            >
              Login
            </Button>
            <Link
              className="underline text-sm text-base-primary font-medium"
              href={`/?mode=${Mode.Forget}`}
            >
              Forget Password?
            </Link>
            <div>
              <span className="text-sm">Not you? </span>
              <Link
                className="underline text-sm text-base-primary font-medium"
                href={`/?mode=${Mode.OAuth}`}
              >
                Use another account
              </Link>
            </div>
          </DialogFooter>
        </DialogBody>
      </form>
    </Form>
  )
}

export default LoginContent
