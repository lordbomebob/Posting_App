import { AlertDialogBody, AlertDialogCloseButton, AlertDialogFooter, AlertDialogHeader, Button } from '@chakra-ui/react'
import React from 'react'
import { logout } from '../services/authService'
import { useNavigate } from 'react-router-dom'
const ConfirmSignOut = () => {
  const navigate = useNavigate()
  const loggingOut=()=>{
    logout()
    navigate('/')
  }
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
        <Button colorScheme='red' onClick={loggingOut}>Log Out</Button>
    </AlertDialogFooter>
    </>
  )
}

export default ConfirmSignOut