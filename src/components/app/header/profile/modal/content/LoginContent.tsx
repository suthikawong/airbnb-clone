import { ProviderType, getEmailProvider, login } from '@/app/_actions/auth'
import { LoginSchema, LoginType } from '@/app/_actions/auth/types'
import { MessageError } from '@/components/ui-custom/message'
import { Button } from '@/components/ui/button'
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Mode } from '@/config'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Image from 'next/image'
import GoogleIcon from '@/components/icons/GoogleIcon'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { Mail } from 'lucide-react'

type LoginFormType = Pick<LoginType, 'password'>

const LoginContent: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>()
  const [data, setData] = useState<{
    email: string
    provider: ProviderType
    firstName?: string | null
    image?: string | null
  }>()
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema.pick({ password: true })),
    defaultValues: {
      password: '',
    },
  })

  useEffect(() => {
    const email = searchParams.get('email')
    if (!email) {
      router.back()
      return
    }

    getEmailProvider(email).then((res) => {
      if (!res || res?.error) {
        router.back()
        return
      }
      setData({
        ...res,
        email: res.email!,
        provider: res.provider!,
      })
    })
  }, [router, searchParams])

  const onSubmit: SubmitHandler<LoginFormType> = useCallback(
    async (value) => {
      const email = searchParams.get('email')
      if (!email) {
        router.push(`/?mode=${Mode.OAuth}`)
        return
      }
      const data = await login({ email, password: value.password })
      if (data?.error) setError(data.error)
    },
    [router, searchParams]
  )

  const onClickGoogle = useCallback(() => {
    signIn('google', {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }, [])

  if (data?.provider === 'credentials') {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-2"
        >
          <DialogHeader>
            <DialogTitle>Log in</DialogTitle>
          </DialogHeader>
          <DialogBody className="flex flex-col items-center justify-center gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                      />
                      <Button
                        variant="link"
                        type="button"
                        className="absolute right-0 top-[50%] translate-y-[-50%] text-xs font-semibold text-base-primary underline underline-offset-2"
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
            <MessageError message={error} />
            <DialogFooter className="flex-col gap-3 p-0">
              <Button type="submit" variant="gradient" className="mb-4">
                Login
              </Button>
              <Link
                className="text-sm font-medium text-base-primary underline underline-offset-2"
                href={`/?mode=${Mode.Forget}`}
              >
                Forget Password?
              </Link>
            </DialogFooter>
          </DialogBody>
        </form>
      </Form>
    )
  }

  if (data?.provider === 'google') {
    const [first, second] = data.email.split('@')
    const hiddenFirst = first
      .split('')
      .map((item, index) => (index < 2 ? item : '•'))
      .join('')
    const [third, fouth] = second.split('.')
    const hiddenThird = third
      .split('')
      .map((item, index) => (index < 2 ? item : '•'))
      .join('')
    const displayEmail = `${hiddenFirst}@${hiddenThird}.${fouth}`

    return (
      <>
        <DialogHeader>
          <DialogTitle>Welcome back, {data?.firstName}</DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center justify-center">
          {data?.image && (
            <div className="relative mb-6 mt-2 size-[120px] overflow-hidden rounded-full">
              <Image alt="profile-image" src={data.image} layout="fill" />
            </div>
          )}
          <div className="mb-4 flex text-sm">
            <Mail className="mr-2 size-4" />
            {displayEmail}
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
          <div className="my-4 self-start">
            <span className="text-sm">Not you? </span>
            <Link
              className="text-sm font-medium text-base-primary underline"
              href={`/?mode=${Mode.OAuth}`}
            >
              Use another account
            </Link>
          </div>
        </DialogBody>
      </>
    )
  }

  return null
}

export default LoginContent
