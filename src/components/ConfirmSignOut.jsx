import { AlertDialogBody, AlertDialogCloseButton, AlertDialogFooter, AlertDialogHeader, Button } from '@chakra-ui/react'
import React from 'react'
import { logout } from '../services/authService'
const ConfirmSignOut = () => {
  return (
    <>
    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
        Log Out?
    </AlertDialogHeader>

    <AlertDialogBody>
      Are you sure?
    </AlertDialogBody>

    <AlertDialogFooter>
        <AlertDialogCloseButton>X</AlertDialogCloseButton>
        <Button colorScheme='red' onClick={logout}>Log Out</Button>
    </AlertDialogFooter>
    </>
  )
}

export default ConfirmSignOut