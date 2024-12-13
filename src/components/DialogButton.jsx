
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import React, { useRef } from 'react';
const DialogButton = ({buttonName, insertComponent, buttonTextColor,buttonColorScheme, width,variant }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
  return (
    <>
        <Button 
            color={buttonTextColor} 
            colorScheme={buttonColorScheme} 
            onClick={onOpen}
            w={width}
            variant={variant}
        >
            {buttonName}
        </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            {insertComponent}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DialogButton