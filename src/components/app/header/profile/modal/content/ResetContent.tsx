import { resetPassword } from '@/app/_actions/auth'
import { ResetSchema, ResetType } from '@/app/_actions/auth/types'
import { getUserByEmail } from '@/app/_actions/user'
import { MessageError, MessageSuccess } from '@/components/ui-custom/message'
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
import {
  strengthMapping,
  validateNewPassword,
  validatePasswordType,
} from '@/lib/validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const ResetContent: React.FC = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
  const [showPassword, setShowPassword] = useState(false)
  const [validatePassword, setValidatePassword] =
    useState<validatePasswordType>({
      strength: 0,
      sensitiveData: false,
      length: false,
      containSymbol: false,
    })

  const form = useForm<ResetType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit: SubmitHandler<ResetType> = useCallback(
    async (value) => {
      const data = await resetPassword(value, token)
      if (data.error) setError(data.error)
      else if (data.success) setSuccess(data.success)
    },
    [token]
  )

  const checkPasswordErrors = useCallback(
    async (password: string) => {
      if (!email) return
      const result = await getUserByEmail(email)
      const data = {
        email,
        password,
        firstName: result?.firstName!,
      }
      const validate = validateNewPassword(data, validatePassword)
      setValidatePassword(validate)
    },
    [email, validatePassword]
  )

  return (
    <>
      <DialogHeader>
        <DialogTitle>Enter a new password</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-2"
        >
          <DialogBody className="flex flex-col gap-4">
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
                </FormItem>
              )}
            />
            <MessageError message={error} />
            {!error && <MessageSuccess message={success} />}
            <DialogFooter className="flex-grow flex-row items-end">
              <Button type="submit" className="flex-1">
                Reset password
              </Button>
            </DialogFooter>
          </DialogBody>
        </form>
      </Form>
    </>
  )
}

export default ResetContent
