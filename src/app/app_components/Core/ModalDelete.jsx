import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import AppModal from "./AppModal";



const ModalDelete = ({open,handleClose,handleSave,message}) => {
    
    const buttons = <> 
    <div className="flex gap-4">
        <Button onClick={handleClose} colorScheme="blue"> Cerrar </Button> 
        <Button onClick={handleSave} colorScheme="red"> Borrar </Button> 
    </div>
                    </>
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
                        status='warning'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        rounded={'lg'}
                        >
                            <AlertIcon boxSize='40px' mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                Advertencia!
                            </AlertTitle>
                            <AlertDescription dangerouslySetInnerHTML={{ __html: message }}>
                        
                            </AlertDescription>
                    </Alert>
                    
                </div>

            </AppModal>
        </>
    );
}

export default ModalDelete;