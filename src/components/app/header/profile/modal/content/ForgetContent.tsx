import { forgetPassword } from '@/app/_actions/auth'
import { ForgetSchema, ForgetType } from '@/app/_actions/auth/types'
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
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const ForgetContent: React.FC = () => {
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
  const form = useForm({
    resolver: zodResolver(ForgetSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit: SubmitHandler<ForgetType> = useCallback(async (value) => {
    const data = await forgetPassword(value)
    if (data.error) setError(data.error)
    else if (data.success) setSuccess(data.success)
  }, [])

  return (
    <>
      <DialogHeader>
        <DialogTitle>Forgot password?</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-2"
        >
          <DialogBody className="flex flex-col gap-4">
            <p>
              Enter the email address associated with your account, and
              we&apos;ll email you a link to reset your password.
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MessageError message={error} />
            {!error && <MessageSuccess message={success} />}
            <DialogFooter className="flex-grow flex-row items-end">
              <Button type="submit" className="flex-1" variant="gradient">
                Send reset link
              </Button>
            </DialogFooter>
          </DialogBody>
        </form>
      </Form>
    </>
  )
}

export default ForgetContent
