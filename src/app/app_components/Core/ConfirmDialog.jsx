import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
  } from '@chakra-ui/react'

const ConfirmDialog = ({title,msgBtnCancel='Cerrar', size='md'
,msgBtnConfirm='De Acuerdo',open,handleClose,handleConfirm,info=true,
children
}) => {

    return (<>
        <AlertDialog
        isOpen={open}
        onClose={handleClose}
        isCentered
        size={size}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
                {children}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleClose}>
                {msgBtnCancel}
              </Button>
              <Button colorScheme={info ? 'blue': 'red'} onClick={handleConfirm} ml={3}>
                {msgBtnConfirm}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>);
}

export default ConfirmDialog;