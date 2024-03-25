import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import AppModal from "./AppModal";



const ModalSuccess = ({open,handleClose,message,children}) => {
    
    const buttons = <> <Button onClick={handleClose} colorScheme="blue"> Entendido </Button> </>
    return (
        <>
            <AppModal
            header={<></>}
            isOpen={open}
            onClose={handleClose}
            buttons={buttons}
            size='lg'
            motionPreset='slideInBottom'
            >
                <div className="p-4">
                    <Alert
                        status='success'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        rounded={'lg'}
                        >
                            <AlertIcon boxSize='40px' mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                Éxito!
                            </AlertTitle>
                            {
                                message &&
                            <AlertDescription dangerouslySetInnerHTML={{ __html: message }}>
                                {children}
                            </AlertDescription>

                            }
                            {
                                !message &&
                            <AlertDescription>
                                {children}
                            </AlertDescription>

                            }
                    </Alert>
                    
                </div>

            </AppModal>
        </>
    );
}

export default ModalSuccess;