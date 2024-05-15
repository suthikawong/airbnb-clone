import { Button } from '@/components/ui/button'
import { DialogBody, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

const ForgetContent: React.FC = () => {
  const form = useForm({
    // resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = useCallback((value) => {
    console.log(value)
  }, [])

  return (
    <>
      <DialogHeader>
        <DialogTitle>Forgot password?</DialogTitle>
      </DialogHeader>
      <DialogBody className="flex flex-col gap-4 h-[284px]">
        <p>Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 relative"
          >
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
          </form>
        </Form>
        <DialogFooter className="flex-row flex-grow items-end">
          <Button
            type="submit"
            className="flex-1"
          >
            Send reset link
          </Button>
        </DialogFooter>
      </DialogBody>
    </>
  )
}

export default ForgetContent
