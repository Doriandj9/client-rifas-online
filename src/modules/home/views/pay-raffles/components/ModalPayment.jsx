import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, FormControl, FormLabel, Input, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { MdOutlineAssignmentInd, MdOutlinePayments } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { HiOutlineTicket } from "react-icons/hi2";
import { GiPriceTag } from "react-icons/gi";
import { TfiMoney } from "react-icons/tfi";
import { FaMoneyBillAlt, FaPassport } from "react-icons/fa";
import { FaCreditCard, FaPiggyBank } from "react-icons/fa6";
import { credentials } from "../../../../../app/config/app";
import BankAccounts from "../../../../../components/BankAccounts";
import { useState } from "react";
import { uuid } from "../../../../../app/utilities/web/uuid";
import AppPhonePayment from "../../../../../app/app_components/Core/AppPhonePayment";

const ModalPayment = ({open,handleClose,tickets,total,price, onSubmit, bankAccounts, handleCardPayment}) => {
    const [transaction, setTransaction] = useState('123');
    const [isCredit, setIsCredit] = useState(false);
    const buttons = <> <Button onClick={onSubmit} type="submit" colorScheme="blue"> Entendido </Button> </>
    const containsAccountPayphone = bankAccounts.find((item) => item.type === 'Payphone' && item.is_account_local === false);
    const handlePayment = (e, isPay) => {
        if(isPay){
            setTransaction(uuid());
            setIsCredit(true);
            handleCardPayment(true);
            // localStorage.setItem('plan',idPlan);
            localStorage.setItem('type_of_transaction','t_tickets');
        } else {
            setIsCredit(false);
            handleCardPayment(false);
        }
    }
    
    return (
        <>
            <AppModal
            header={<>
             <div className="flex gap-2 items-center border-b-2 border-b-gray-300">
            <MdOutlinePayments className="text-4xl text-primaryop-800" /> 
            <h2 className="title-dynamic"
                >Completa el pago de tus boletos ganadores.</h2>
            </div>
            </>}
            isOpen={open}
            onClose={handleClose}
            buttons={isCredit == false ?  buttons : <></>}
            size='6xl'
            motionPreset='slideInBottom'
            >
                 <div className='bg-white'>
                <Tabs position="relative" variant="unstyled">
                <TabList>
                <Tab onClick={(e) => handlePayment(e,false)}>
                <div className='flex items-center gap-2'>
                    <FaMoneyBillAlt className='text-secondary w-6 h-6'  />
                    Efectivo
                    </div>
                    </Tab>
                <Tab onClick={(e) => handlePayment(e,true)}>
                <div className='flex items-center gap-2'>
                    <FaCreditCard className='text-secondary w-6 h-6'  />
                    Tarjeta crédito/débito
                    </div>
                </Tab>
                </TabList>
                <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
                />
                <TabPanels>
                <TabPanel>

                    <article className="mt-6">
                        <div>
                            <h2 className="text-xl font-bold text-primary">Datos Bancarios</h2>
                            <BankAccounts bankAccounts={bankAccounts.filter((item) => item.is_account_local)} />
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
                </TabPanel>
                <TabPanel>
                <AppPhonePayment parameters={{amount: parseFloat(total) * 100 }}
                        transactionId={uuid()}
                        >
                            {
                            containsAccountPayphone ?
                                <div className="">
                                <h2 className="text-xl font-bold text-primary text-center">Datos de Pago</h2>
                                <div className="flex justify-center">
                                    <section className="">
                                        <p className="w-full flex gap-2  text-xl">
                                            <span className=" font-bold flex gap-2 block"> 
                                                <HiOutlineTicket className="text-green-600" /> Cantidad de boletos: 
                                            </span> 
                                            <span className="flex-grow text-primary">
                                                {tickets} 
                                            </span>
                                        </p>
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className=" font-bold flex gap-2 block">
                                                <GiPriceTag className="text-green-600" />
                                                Precio del boleto: 
                                            </span> 
                                            <span className="flex-grow text-primary"> ${price} </span>
                                        </p>
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className=" font-bold flex gap-2 block">
                                            <TfiMoney className="text-green-600" />
                                                Total a pagar: 
                                            </span> 
                                            <span className="flex-grow text-primary"> ${total} </span>
                                        </p>
                                    </section>
                                </div>
                                </div>
                                :
                            <p>No tiene payphone</p>
                            }
                        </AppPhonePayment>
                </TabPanel>
                </TabPanels>
                </Tabs>
                </div>
            </AppModal>
        </>
    );
}

export default ModalPayment;