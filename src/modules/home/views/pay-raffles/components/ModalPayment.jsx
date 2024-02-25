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
    console.log(bankAccounts);
    const buttons = <> <Button onClick={onSubmit} type="submit" colorScheme="blue"> Entendido </Button> </>
    return (
        <>
            <AppModal
            header={<>
             <div>
            <MdOutlinePayments className="text-4xl text-green-600" /> 
                <span className="text-primary">Completa el pago de tus boletos ganadores.</span>
            </div>
            </>}
            isOpen={open}
            onClose={handleClose}
            buttons={buttons}
            size='6xl'
            motionPreset='slideInBottom'
            >
                 <p className="italic text-orange-900">
                        Actualmente el sistema solo permite cancelar tu solicitud de pago por de medio de transferencia bancaria,
                        próximamente se habilitaran nuevas formas de pago, lamentamos cualquier inconveniente que te causemos.
                    </p>

                    <article className="mt-6">
                        <div>
                            <h2 className="text-xl font-bold text-primary">Datos Bancarios</h2>
                            <BankAccounts bankAccounts={bankAccounts} />
                            <h2 className="text-xl font-bold text-primary">Datos de Pago</h2>
                            <section>
                                <p className="w-full flex gap-2  text-xl">
                                    <span className="lg:w-3/12 w-5/12 font-bold flex gap-2 block"> 
                                        <HiOutlineTicket className="text-green-600" /> Cantidad de boletos: 
                                    </span> 
                                    <span className="flex-grow text-primary">
                                         {tickets} 
                                    </span>
                                </p>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="lg:w-3/12 w-5/12 font-bold flex gap-2 block">
                                        <GiPriceTag className="text-green-600" />
                                        Precio del boleto: 
                                    </span> 
                                    <span className="flex-grow text-primary"> ${price} </span>
                                </p>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="lg:w-3/12 w-5/12 font-bold flex gap-2 block">
                                    <TfiMoney className="text-green-600" />
                                        Total a pagar: 
                                    </span> 
                                    <span className="flex-grow text-primary"> ${total} </span>
                                </p>
                                
                            </section>
                            <Alert className="mt-6" status='warning' variant='left-accent'>
                                <AlertIcon />
                                Posterior a la realización de la transferencia o deposito adjuntar el comprobante de pago, para su validación de la compra de los boletos.
                            </Alert>

                            <div className="mt-8">
                                    <FormControl isRequired>
                                        <FormLabel>
                                            Adjuntar comprobante de pago.
                                        </FormLabel>
                                        <Input id="voucher" accept="image/*" name="voucher" type="file"  />
                                    </FormControl>
                            </div>
                        </div>
                    </article>

            </AppModal>
        </>
    );
}

export default ModalPayment;