import { emailVerification, resetPassword } from '@/app/_actions/auth'
import { ResetSchema, ResetType } from '@/app/_actions/auth/types'
import { Button } from '@/components/ui/button'
import { DialogBody, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const ResetContent: React.FC = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<ResetType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit: SubmitHandler<ResetType> = useCallback(async (value) => {
    console.log(value)
    const data = await resetPassword(value, token)
    if (data.error) setError(data.error)
    else if (data.success) setSuccess(data.success)
  }, [])

  return (
    <>
      <DialogHeader>
        <DialogTitle>Enter a new password</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 relative"
        >
          <DialogBody className="flex flex-col gap-4 h-[284px]">
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
            {error && <div>{error}</div>}
            {success && <div>{success}</div>}
            <DialogFooter className="flex-row flex-grow items-end">
              <Button
                type="submit"
                className="flex-1"
              >
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
