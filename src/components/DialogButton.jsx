
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import React, { cloneElement, useRef } from 'react';
const DialogButton = ({buttonName, buttonTextColor,buttonColorScheme, width,variant, children }) => {
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
            {cloneElement(children,{onClose})}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DialogButton