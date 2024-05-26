import { getEmailProvider } from '@/app/_actions/auth'
import GoogleIcon from '@/components/icons/GoogleIcon'
import { Button } from '@/components/ui/button'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Mode } from '@/config'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const EmailSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required.',
    })
    .email({
      message: 'Enter a valid email.',
    }),
})

type EmailType = z.infer<typeof EmailSchema>

const OAuthContent: React.FC = () => {
  const router = useRouter()
  const form = useForm<EmailType>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit: SubmitHandler<EmailType> = useCallback(
    async (value) => {
      const result = await getEmailProvider(value.email)
      if (!result) {
        router.push(`/?mode=${Mode.Signup}&email=${value.email}`)
        return
      }
      router.push(`/?mode=${Mode.Login}&email=${value.email}`)
    },
    [router]
  )

  const onClickGoogle = useCallback(() => {
    signIn('google', {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }, [])

  return (
    <>
      <DialogHeader>
        <DialogTitle>Log in or sign up</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-4"
          >
            <DialogTitle className="my-4 text-[22px] font-medium">
              Welcome to Airbnb
            </DialogTitle>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="gradient">
              Continue
            </Button>
            <div className="flex flex-row items-center">
              <Separator className="w-auto grow bg-zinc-400" />
              <span className="mx-4 text-xs">or</span>
              <Separator className="w-auto grow bg-zinc-400" />
            </div>
            <Button
              type="button"
              variant="outline"
              className="flex w-full justify-start border-black"
              onClick={onClickGoogle}
            >
              <GoogleIcon />
              <div className="flex-1">Continue with Google</div>
            </Button>
          </form>
        </Form>
      </DialogBody>
    </>
  )
}

export default OAuthContent
