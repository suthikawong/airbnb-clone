import GoogleIcon from '@/components/icons/GoogleIcon'
import { Button } from '@/components/ui/button'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Mode } from '@/config'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

const OAuthContent: React.FC = () => {
  const router = useRouter()
  const form = useForm({
    // resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = useCallback(
    (value) => {
      console.log(value)
      router.push(`/?mode=${Mode.Signup}&email=${value.email}`)
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
            className="gap-4 flex flex-col flex-1"
          >
            <DialogTitle className="text-[22px] font-medium mb-4">Welcome to Airbnb</DialogTitle>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Continue</Button>
            <div className="flex flex-row items-center">
              <Separator className="bg-zinc-400 grow w-auto" />
              <span className="mx-4 text-xs">or</span>
              <Separator className="bg-zinc-400 grow w-auto" />
            </div>
            <Button
              type="button"
              variant="outline"
              className="flex w-full border-black justify-start"
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
