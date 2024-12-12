
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import CreatePostCard from './CreatePostCard';
const DialogButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
        Create Post
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <CreatePostCard></CreatePostCard>            
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DialogButton