import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    ModalCloseButton,
  } from '@chakra-ui/react'
/**
 * 
 * @param  {...any} props buttons,header, isOpen, onClose, allowPinchZoom, autoFocus, blockScrollOnMount, closeOnEsc, 
    closeOnOverlayClick, colorScheme, finalFocusRef, id, initialFocusRef, isCentered,
    lockFocusAcrossFrames, motionPreset, onCloseComplete, onEsc, onOverlayClick, portalProps,
    preserveScrollBarGap, returnFocusOnClose, scrollBehavior, size, trapFocus, useInert, variant
 * @returns 
 */
const AppModal = (props) => {
    return (<>
    <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.children}
          </ModalBody>

          <ModalFooter>
            {props.buttons}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>);


}

export default AppModal;