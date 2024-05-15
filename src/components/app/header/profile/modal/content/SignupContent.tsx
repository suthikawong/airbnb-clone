import { createUser } from '@/app/_actions/user'
import { CreateUserSchema, CreateUserType } from '@/app/_actions/user/types'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const SignupContent: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: undefined,
      isRceivedMessage: false,
    },
  })

  const defaultEmail = useMemo(() => searchParams.get('email'), [searchParams])

  useEffect(() => {
    if (defaultEmail) form.setValue('email', defaultEmail)
  }, [defaultEmail, form])

  const { mutateAsync: mutateCreateUser, isPending } = useMutation({
    mutationFn: createUser,
  })

  const onSubmit: SubmitHandler<CreateUserType> = useCallback(
    async (values) => {
      try {
        console.log(values)
        await mutateCreateUser(values)
        router.push('/')
        // toast.success('Room saved')
      } catch (error: any) {
        toast.error(error?.message)
      }
    },
    [mutateCreateUser, router]
  )

  return (
    <>
      <DialogHeader>
        <DialogTitle>Finish signing up</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-4 flex flex-col flex-1"
          >
            <FormLabel>Legal name</FormLabel>
            <div className="w-full border border-zinc-400 rounded-lg">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="First Name on ID"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Last Name on ID"
                        className="border-none rounded-lg focus-visible:ring-inset "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription className="text-xs">
              Make sure this matches the name on your government ID. If you go by another name, you can add a preferred
              first name.
            </FormDescription>
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'h-[54px] pl-3 text-left font-normal focus-visible:ring-2 focus-visible:ring-base-primary focus-visible:ring-offset-0',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'MM/dd/yyyy') : 'Birthdate'}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-xs">
                    To sign up, you need to be at least 18. Your birthday won&apos;t be shared with other people who use
                    Airbnb.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact info</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      defaultValue={searchParams.get('email') || ''}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    We&apos;ll email you trip confirmations and receipts.
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
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
            <FormDescription className="text-xs text-base-primary">
              By selecting <span className="text-xs font-semibold">Agree and continue</span>, I agree to Airbnb&apos;{' '}
              <Link
                href="/"
                className="text-xs underline font-semibold text-blue-700"
              >
                Terms of Service
              </Link>
              ,{' '}
              <Link
                href="/"
                className="text-xs underline font-semibold text-blue-700"
              >
                Payments Terms of Service
              </Link>
              , and{' '}
              <Link
                href="/"
                className="text-xs underline font-semibold text-blue-700"
              >
                Nondiscrimination Policy
              </Link>{' '}
              and acknowledge the{' '}
              <Link
                href="/"
                className="text-xs underline font-semibold text-blue-700"
              >
                Privacy Policy
              </Link>
              .
            </FormDescription>
            <Button
              type="submit"
              disabled={isPending}
            >
              Agree and continue
            </Button>
            <Separator />
            <FormDescription className="text-xs text-base-primary">
              Airbnb will send you members-only deals, inspiration, marketing emails, and push notifications. You can
              opt out of receiving these at any time in your account settings or directly from the marketing
              notification.
            </FormDescription>
            <FormField
              control={form.control}
              name="isRceivedMessage"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-base-primary !mt-0 ml-4">
                    I don&apos;t want to receive marketing messages from Airbnb.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogBody>
    </>
  )
}

export default SignupContent
