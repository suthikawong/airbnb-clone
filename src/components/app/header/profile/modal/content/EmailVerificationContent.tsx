import { emailVerification } from '@/app/_actions/auth'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EmailVerificationContent: React.FC = () => {
  const searchParams = useSearchParams()
  const [success, setSuccess] = useState<string>()
  const [error, setError] = useState<string>()
  const [isClient, setIsClient] = useState<boolean>(false)

  const token = searchParams.get('token')

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return // prevent delete token when run on server
    if (!token) return
    emailVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong')
      })
  }, [token, isClient])

  return (
    <>
      <DialogHeader>
        <DialogTitle>Email Verification</DialogTitle>
      </DialogHeader>
      <DialogBody className="flex flex-col gap-4 h-[284px]">
        <p>Confirming your verification</p>
        {!success && !error && (
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
          />
        )}
        {error}
        {success}
      </DialogBody>
    </>
  )
}

export default EmailVerificationContent
