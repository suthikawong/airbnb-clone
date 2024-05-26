import { emailVerification } from '@/app/_actions/auth'
import { MessageError, MessageSuccess } from '@/components/ui-custom/message'
import { Button } from '@/components/ui/button'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Mode } from '@/config'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

const EmailVerificationContent: React.FC = () => {
  const router = useRouter()
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
      <DialogBody className="flex flex-col items-center gap-6">
        <p className="text-lg">Confirming your verification</p>
        {!success && !error && <BeatLoader />}
        <MessageError message={error} />
        {!error && <MessageSuccess message={success} />}
        <Button
          variant="link"
          className="text-base-primary"
          onClick={() => router.push(`/?mode=${Mode.Login}`)}
        >
          Back to login
        </Button>
      </DialogBody>
    </>
  )
}

export default EmailVerificationContent
