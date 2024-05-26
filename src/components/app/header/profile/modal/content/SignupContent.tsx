import { createUser } from '@/app/_actions/user'
import { CreateUserSchema, CreateUserType } from '@/app/_actions/user/types'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  strengthMapping,
  validateNewPassword,
  validatePasswordType,
} from '@/lib/validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface SignupContentProps {
  setOpenCompleteModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignupContent: React.FC<SignupContentProps> = ({
  setOpenCompleteModal,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [alreadyFocusPassword, setAlreadyFocusPassword] = useState(false)
  const [validatePassword, setValidatePassword] =
    useState<validatePasswordType>({
      strength: 0,
      sensitiveData: false,
      length: false,
      containSymbol: false,
    })

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
  const { errors } = form.formState

  const defaultEmail = useMemo(() => searchParams.get('email'), [searchParams])

  useEffect(() => {
    if (defaultEmail) form.setValue('email', defaultEmail)
  }, [defaultEmail, form])

  const { mutateAsync: mutateCreateUser, isPending } = useMutation({
    mutationFn: createUser,
  })

  const onSubmit: SubmitHandler<CreateUserType> = useCallback(
    async (values) => {
      await mutateCreateUser(values)
      router.push('/')
      setOpenCompleteModal(true)
    },
    [mutateCreateUser, router, setOpenCompleteModal]
  )

  const checkPasswordErrors = useCallback(
    (password: string) => {
      const { email, firstName } = form.getValues()
      const data = {
        email,
        firstName,
        password,
      }
      const validate = validateNewPassword(data, validatePassword)
      setValidatePassword(validate)
    },
    [validatePassword, form]
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
            className="flex flex-1 flex-col gap-4"
          >
            <div className="space-y-2">
              <FormLabel>Legal name</FormLabel>
              <div className="w-full rounded-lg border border-zinc-400">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="First Name on ID"
                          className="rounded-lg border-none focus-visible:ring-inset "
                        />
                      </FormControl>
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
                          className="rounded-lg border-none focus-visible:ring-inset "
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage>
                {errors.firstName?.message || errors.lastName?.message}
              </FormMessage>
              {!errors.firstName?.message && !errors.lastName?.message && (
                <FormDescription className="text-xs">
                  Make sure this matches the name on your government ID. If you
                  go by another name, you can add a preferred first name.
                </FormDescription>
              )}
            </div>
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'h-[54px] pl-3 text-left font-normal focus-visible:ring-2 focus-visible:ring-base-primary focus-visible:ring-offset-0',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? dayjs(field.value).format('MM/DD/YYYY')
                          : 'mm/dd/yyyy'}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        fromYear={1960}
                        toYear={dayjs().year()}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                  {!errors.birthDate &&
                    field.value !== undefined &&
                    dayjs().diff(dayjs(field.value), 'year') < 18 && (
                      <FormMessage>
                        You must be 18 or older to use Airbnb. Other people
                        won&apos;t see your birthday.
                      </FormMessage>
                    )}
                  {!errors.birthDate && (
                    <FormDescription className="text-xs">
                      To sign up, you need to be at least 18. Your birthday
                      won&apos;t be shared with other people who use Airbnb.
                    </FormDescription>
                  )}
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
                        onFocus={() =>
                          !alreadyFocusPassword && setAlreadyFocusPassword(true)
                        }
                        onChangeCapture={(e) =>
                          checkPasswordErrors(e.currentTarget.value)
                        }
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
                  {alreadyFocusPassword && (
                    <div>
                      <FormMessage
                        success={validatePassword.strength >= 2}
                        warning={false}
                      >
                        Password strength:{' '}
                        {
                          strengthMapping[
                            validatePassword.strength as keyof typeof strengthMapping
                          ]
                        }
                      </FormMessage>
                      <FormMessage
                        success={validatePassword.sensitiveData}
                        warning={false}
                      >
                        Can&apos;t contain your name or email address
                      </FormMessage>
                      <FormMessage
                        success={validatePassword.length}
                        warning={false}
                      >
                        At least 8 characters
                      </FormMessage>
                      <FormMessage
                        success={validatePassword.containSymbol}
                        warning={false}
                      >
                        Contains a number or symbol
                      </FormMessage>
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormDescription className="mt-6 text-xs text-base-primary">
              By selecting{' '}
              <span className="text-xs font-semibold">Agree and continue</span>,
              I agree to Airbnb&apos;{' '}
              <Link
                href="/"
                className="text-xs font-semibold text-blue-700 underline"
              >
                Terms of Service
              </Link>
              ,{' '}
              <Link
                href="/"
                className="text-xs font-semibold text-blue-700 underline"
              >
                Payments Terms of Service
              </Link>
              , and{' '}
              <Link
                href="/"
                className="text-xs font-semibold text-blue-700 underline"
              >
                Nondiscrimination Policy
              </Link>{' '}
              and acknowledge the{' '}
              <Link
                href="/"
                className="text-xs font-semibold text-blue-700 underline"
              >
                Privacy Policy
              </Link>
              .
            </FormDescription>
            <Button
              type="submit"
              disabled={isPending}
              variant="gradient"
              className="my-2"
            >
              Agree and continue
            </Button>
            <Separator />
            <FormDescription className="text-xs text-base-primary">
              Airbnb will send you members-only deals, inspiration, marketing
              emails, and push notifications. You can opt out of receiving these
              at any time in your account settings or directly from the
              marketing notification.
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
                  <FormDescription className="!mt-0 ml-4 text-xs text-base-primary">
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
