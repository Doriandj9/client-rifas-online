import { Button } from "@chakra-ui/react";
import AppModal from "../app/app_components/Core/AppModal";
import DisplaySorters from "./DisplaySoters";
import ComponentMUI from "../app/app_components/Core/ComponentMUI";
import { FaCheckToSlot } from "react-icons/fa6";

const ModalSorters = ({open, onClose}) => {


    return (
        <>
            <AppModal
            isOpen={open}
            onClose={onClose}
            buttons={<>
                <Button onClick={onClose}  colorScheme="green">
                    Regresar
                </Button>
            </>}
            header={<>
                <div className="flex items-center justify-center gap-5 m-0">
                    <FaCheckToSlot className="w-6 h-6 text-primaryop-900" /> <h2 className="title-dynamic">Próximas rifas a sortearse.</h2>
                </div>
            </>}
            size='xl'
            >
                <div className="flex justify-center items-center">
                    <ComponentMUI>
                        <DisplaySorters/>
                    </ComponentMUI>
                </div>
            </AppModal>
        </>
    );
}

export default ModalSorters;