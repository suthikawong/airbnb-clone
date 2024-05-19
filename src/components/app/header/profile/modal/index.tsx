import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Mode } from '@/config'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import ForgetContent from './content/ForgetContent'
import LoginContent from './content/LoginContent'
import OAuthContent from './content/OAuthContent'
import SignupContent from './content/SignupContent'
import EmailVerificationContent from './content/EmailVerificationContent'
import ResetContent from './content/ResetContent'

const LoginModal: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const mode = useMemo(() => searchParams.get('mode'), [searchParams])

  const showBackBtn = useMemo(() => {
    if (mode === Mode.Forget || mode === Mode.Signup) return true
    return false
  }, [mode])

  const closeModal = useCallback(() => {
    if (mode === Mode.Forget) router.push(`/?mode=${Mode.Login}`)
    else if (mode === Mode.Signup) router.push(`/?mode=${Mode.OAuth}`)
    else router.push('/')
  }, [mode, router])

  return (
    <Dialog
      modal
      open={!!mode}
      onOpenChange={closeModal}
    >
      <DialogContent
        showBackBtn={showBackBtn}
        className="sm:max-w-[425px] rounded-xl"
      >
        {mode === Mode.Login ? (
          <LoginContent />
        ) : mode === Mode.Forget ? (
          <ForgetContent />
        ) : mode === Mode.OAuth ? (
          <OAuthContent />
        ) : mode === Mode.Signup ? (
          <SignupContent />
        ) : mode === Mode.EmailVerification ? (
          <EmailVerificationContent />
        ) : mode === Mode.ResetPassword ? (
          <ResetContent />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
