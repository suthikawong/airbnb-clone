import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Mode } from '@/config'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ForgetContent from './content/ForgetContent'
import LoginContent from './content/LoginContent'
import OAuthContent from './content/OAuthContent'
import SignupContent from './content/SignupContent'
import EmailVerificationContent from './content/EmailVerificationContent'
import ResetContent from './content/ResetContent'
import CompleteProfileModal from './CompleteProfileModal'

const LoginModal: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [openCompleteModal, setOpenCompleteModal] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)

  const mode = useMemo(() => searchParams.get('mode'), [searchParams])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const showBackBtn = useMemo(() => {
    if (mode === Mode.Forget || mode === Mode.Signup || mode === Mode.Login)
      return true
    return false
  }, [mode])

  const closeModal = useCallback(() => {
    if (mode === Mode.Forget || mode === Mode.Signup || Mode.Login) {
      router.back()
    }
    router.push('/')
  }, [mode, router])

  return (
    <>
      <Dialog modal open={isClient && !!mode} onOpenChange={closeModal}>
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
            <SignupContent setOpenCompleteModal={setOpenCompleteModal} />
          ) : mode === Mode.EmailVerification ? (
            <EmailVerificationContent />
          ) : mode === Mode.ResetPassword ? (
            <ResetContent />
          ) : null}
        </DialogContent>
      </Dialog>
      <CompleteProfileModal
        open={openCompleteModal}
        setOpen={setOpenCompleteModal}
      />
    </>
  )
}

export default LoginModal
