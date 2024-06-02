import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { MdOutlineAssignmentInd, MdOutlinePayments } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { HiOutlineTicket } from "react-icons/hi2";
import { GiPriceTag } from "react-icons/gi";
import { TfiMoney } from "react-icons/tfi";
import { FaPassport } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa6";
import { credentials } from "../../../../../app/config/app";
import BankAccounts from "../../../../../components/BankAccounts";

const ModalPayment = ({open,handleClose,tickets,total,price, onSubmit, bankAccounts}) => {
    const buttons = <> <Button onClick={onSubmit} type="submit" colorScheme="blue"> Entendido </Button> </>
    return (
        <>
            <AppModal
            header={<>
             <div>
            <MdOutlinePayments className="text-4xl text-green-600" /> 
                <span className="text-primary">Completa el pago de los boletos vendidos.</span>
            </div>
            </>}
            isOpen={open}
            onClose={handleClose}
            buttons={buttons}
            size='3xl'
            motionPreset='slideInBottom'
            >
                 <Alert className="" status='warning' variant='left-accent'>
                    <AlertIcon />
                    Tenga en cuenta que la remuneración de la venta de boletos debe ser 
                    entregada al organizador de la rifa. <br />
                    El mismo consiguiente deberá remunerarle sus comisiones
                    al finalizar el proceso de sorteo de la rifa.
                </Alert>

                    <article className="mt-6">
                        <div>
                            <h2 className="text-xl font-bold text-primary">Datos de Pago</h2>
                            <section>
                                <p className="w-full flex gap-2  text-xl">
                                    <span className="lg:w-6/12 w-10/12 font-bold flex gap-2 block"> 
                                        <HiOutlineTicket className="text-green-600" /> Cantidad de boletos: 
                                    </span> 
                                    <span className="flex-grow text-primary">
                                         {tickets} 
                                    </span>
                                </p>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="lg:w-6/12 w-10/12 font-bold flex gap-2 block">
                                        <GiPriceTag className="text-green-600" />
                                        Precio del boleto: 
                                    </span> 
                                    <span className="flex-grow text-primary"> ${price} </span>
                                </p>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="lg:w-6/12 w-10/12 font-bold flex gap-2 block">
                                    <TfiMoney className="text-green-600" />
                                        Total a pagar: 
                                    </span> 
                                    <span className="flex-grow text-primary"> ${total} </span>
                                </p>
                                
                            </section>
                           
                        </div>
                    </article>

            </AppModal>
        </>
    );
}

export default ModalPayment;