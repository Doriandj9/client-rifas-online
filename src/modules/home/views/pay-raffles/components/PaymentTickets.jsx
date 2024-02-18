import { Alert, AlertIcon, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { BsBank } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { Form, Link } from "react-router-dom";
import { useAuth } from "../../../../../app/store/app/userStore";
import AppButton from "../../../../../app/app_components/Core/AppButon";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { HiOutlineTicket } from "react-icons/hi2";
import { GiPriceTag } from "react-icons/gi";
import { TfiMoney } from "react-icons/tfi";
import routesweb from "../../../../../app/config/routesweb";
import ModalPayment from "./ModalPayment";
const PaymentTickets = ({openPayment, handleClosePayment, tickets, price, total, onSubmit, backAccounts}) => {

    const user = useAuth(state => state.user);
    const [paymentUser, setPaymentUser] = useState(true);
   
    return (
        <>
        {user && paymentUser ? <PaymentAuth user={user}  setPaymentUser={setPaymentUser} /> : <PaymentNotAuth />}
        <ModalPayment backAccounts={backAccounts} onSubmit={onSubmit} open={openPayment} handleClose={handleClosePayment} price={price} total={total} tickets={tickets} />
        </>
        
    );
}


const PaymentAuth = ({user, setPaymentUser}) => {

    const handlePaymentYes = () => {
        setPaymentUser(true)
    }
    const handlePaymentNot = () => {
        setPaymentUser(false);
    }

    return (
        <>
           <article>
           <h3 className="uppercase flex gap-2 items-center mb-4">
                     <FaPersonCircleCheck className="w-8 h-8 text-primary" />
                    <span className="text-xl font-black text-primary mt-3">
                    Datos Personales
                    </span> 
                </h3>
                <p>
                    <h4 className="text-primary text-xl font-bold">Quieres comprar tus boletos como:
                    <br /> <span className="italic text-primaryop-900"> {user.first_name} {user.last_name} </span></h4>
                    <ul>
                        <li className="text-lg text-primary"><span className="font-bold">CI:</span> <span> {user.taxid.substring(0, user.taxid.length - 3)}xxx </span> </li>
                        <li className="text-lg text-primary"><span className="font-bold">Teléfono:</span> <span> {user.phone.substring(0, user.phone.length - 3)}xxx </span> </li>
                    </ul>
                </p>
                <div className="mt-2 text-start gap-2">
                    <Button type="button" onClick={handlePaymentNot}
                    className="mr-4" colorScheme="red">
                        NO
                    </Button>
                    {/* <Button onClick={handlePaymentYes}
                    type="button" colorScheme="blue">
                        SI          
                    </Button> */}
                </div>
           </article>
           <hr className="my-4" />
        </>
    );
}


const PaymentNotAuth = () => {

    return (
        <>
                <h3 className="uppercase flex gap-2 items-center mb-4">
                     <FaPersonCircleCheck className="w-8 h-8 text-primary" />
                    <span className="text-xl font-black text-primary mt-3">
                    Datos Personales
                    </span> 
                </h3>
                <div>
                        <FormControl isRequired>
                                <FormLabel fontWeight={'bold'}>Cédula</FormLabel>
                                <Input name='taxid'
                                
                                 className='shadow' height={50} placeholder='Por ejemplo: 0123456789' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Nombres</FormLabel>
                                <Input name='first_name'
                                
                                 className='shadow' height={50} placeholder='Por ejemplo: Nombre1 Nombre2' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Apellidos</FormLabel>
                                <Input name='last_name'
                               
                                 className='shadow' height={50} placeholder='Por ejemplo: Apellido1 Apellido2' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Correo electrónico</FormLabel>
                                <Input name='email'
                                type="email"
                                 className='shadow' height={50} placeholder='Por ejemplo: ejemplo@email.com' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Número Telefónico</FormLabel>
                                <Input name='phone'
                                 className='shadow' height={50} placeholder='Por ejemplo: 0901234567' />
                            </FormControl>
                            <FormControl  marginTop={25} isRequired>
                                <FormLabel>
                                <Input id="terms" className='shadow' marginRight={2}  width={26} height={26} type='checkbox'>
                                </Input>
                                    Aceptar términos y condiciones
                                </FormLabel>
                                <a target="__blank" href={routesweb.terms_and_conditions}
                                 className='text-sm text-primaryop-900 mt-2'> Leer términos y condiciones  </a>
                            </FormControl>
                            <hr className="my-4" />
                        </div>
        </>
    );
}

export default PaymentTickets;