import { Alert, AlertIcon, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { BsBank } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { MdOutlineAssignmentInd, MdOutlinePayments } from "react-icons/md";
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
const PaymentTickets = ({tickets, price, total}) => {
    const user = useAuth(state => state.user);
    const [paymentUser, setPaymentUser] = useState(true);
    
    return (
        <>
        {user && paymentUser ? <PaymentAuth user={user}  setPaymentUser={setPaymentUser} /> : <PaymentNotAuth />}
        <div>
            <MdOutlinePayments className="text-4xl text-green-600" /> 
                <span className="text-primary">Completa el pago de tus boletos ganadores.</span>
        </div>

        <p className="italic text-orange-900">
                        Actualmente el sistema solo permite cancelar tu solicitud de pago por de medio de transferencia bancaria,
                        próximamente se habilitaran nuevas formas de pago, lamentamos cualquier inconveniente que te causemos.
                    </p>

                    <article className="mt-6">
                        <header>
                            <h2 className="text-xl font-bold text-primary">Datos Bancarios</h2>
                            <section>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="w-3/12 font-bold flex gap-2 block"> 
                                        <BsBank className="text-green-600" /> Entidad Bancaria: 
                                    </span> 
                                    <span className="flex-grow text-primary">
                                         Banco Pichincha 
                                    </span>
                                </p>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="w-3/12 font-bold flex gap-2 block">
                                    <GrMoney className="text-green-600" />
                                        Nº Cuenta: 
                                    </span> 
                                    <span className="flex-grow text-primary"> 22084762580 </span>
                                </p>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="w-3/12 font-bold flex gap-2 block">
                                        <MdOutlineAssignmentInd className="text-green-600" />
                                        Nombre de Cuenta: 
                                    </span> 
                                    <span className="flex-grow text-primary"> Barragán Coloma Josue Pedro </span>
                                </p>
                            </section>
                            <h2 className="text-xl font-bold text-primary">Datos de Pago</h2>
                            <section>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="w-3/12 font-bold flex gap-2 block"> 
                                        <HiOutlineTicket className="text-green-600" /> Cantidad de boletos: 
                                    </span> 
                                    <span className="flex-grow text-primary">
                                         {tickets} 
                                    </span>
                                </p>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="w-3/12 font-bold flex gap-2 block">
                                        <GiPriceTag className="text-green-600" />
                                        Precio del boleto: 
                                    </span> 
                                    <span className="flex-grow text-primary"> ${price} </span>
                                </p>
                                <p className="w-full flex gap-2 text-xl">
                                    <span className="w-3/12 font-bold flex gap-2 block">
                                    <TfiMoney className="text-green-600" />
                                        Total a pagar: 
                                    </span> 
                                    <span className="flex-grow text-primary"> ${total} </span>
                                </p>
                                
                            </section>
                            <Alert className="mt-6" status='warning' variant='left-accent'>
                                <AlertIcon />
                                Posterior a la realización de la transferencia adjuntar el comprobante de pago, caso contrario 
                                no se validara su suscripción y no dispondrá de acceso a los servicios de la plataforma.
                            </Alert>

                            <div className="mt-8">
                                    <FormControl isRequired>
                                        <FormLabel>
                                            Adjuntar comprobante de pago.
                                        </FormLabel>
                                        <Input name="voucher" type="file"  />
                                    </FormControl>
                            </div>
                        </header>
                    </article>
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
                        <li className="text-lg text-primary"><span className="font-bold">Teléfono:</span> <span> {user.phone} </span> </li>
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
                                <Input className='shadow' marginRight={2}  width={26} height={26} type='checkbox'>
                                </Input>
                                    Aceptar términos y condiciones
                                </FormLabel>
                                <Link className='text-sm text-primaryop-900 mt-2'> Leer términos y condiciones  </Link>
                            </FormControl>
                            <hr className="my-4" />
                        </div>
        </>
    );
}

export default PaymentTickets;