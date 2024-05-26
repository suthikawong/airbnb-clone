import AppIcon from '@/components/icons/AppIcon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import React, { useCallback } from 'react'

interface CompleteProfileModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
  open,
  setOpen,
}) => {
  const closeModal = useCallback(() => setOpen(false), [setOpen])
  return (
    <Dialog modal open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Create your profile</DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center">
          <AppIcon className="text-primary" size="large" />
          <div className="mx-10 mt-2 flex flex-col items-center text-center">
            <div className="mb-2 text-[22px] font-medium">
              Welcome to Airbnb
            </div>
            Discover places to stay and unique experiences around the world.
          </div>
          <DialogFooter className="flex-grow flex-row items-end">
            <Button className="flex-1" variant="secondary" onClick={closeModal}>
              Continue
            </Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export default CompleteProfileModal
