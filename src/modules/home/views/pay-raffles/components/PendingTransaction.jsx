import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { MdOutlinePayments } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi2";
import { GiPriceTag } from "react-icons/gi";
import { TfiMoney } from "react-icons/tfi";


const PendingTransaction =  ({open, handleClose, handleSubmit,tickets,price,total}) => {
    
    return (<>
    <AppModal
        isOpen={open}
        onClose={handleClose}
        size='3xl'
        buttons={<>
        <div className="flex gap-2"> 
            <Button onClick={handleClose} colorScheme="red">
                Regresar
            </Button>
            <Button onClick={(e) => handleSubmit(e,false,true)} colorScheme="blue">
                Completar pago
            </Button>
        </div>
        </>}
        header={
            <div className="flex gap-2 items-center border-b-2 border-b-gray-300">
            <MdOutlinePayments className="text-4xl text-primaryop-800" /> 
            <h2 className="title-dynamic"
                >Completa el pago de tus boletos ganadores.</h2>
            </div>
        }
    >
        <Alert status="info">
            <AlertIcon />

            Esta compra se realizara de forma automática, una vez 
             que des click en  <strong> (Completar pago)</strong>.
        </Alert>
        <h2 className="text-xl font-bold text-primary text-center">Datos de Pago</h2>
        <div className="flex justify-center">
            <section>
                    <p className="w-full flex gap-2  text-xl">
                        <span className="font-bold flex gap-2 block"> 
                        <HiOutlineTicket className="text-green-600" /> Cantidad de boletos: 
                                        </span> 
                                        <span className="flex-grow text-primary">
                        {tickets} 
                                        </span>
                                    </p>
                                    <p className="w-full flex gap-2 text-xl">
                                        <span className="font-bold flex gap-2 block">
                        <GiPriceTag className="text-green-600" />
                        Precio del boleto: 
                                        </span> 
                                        <span className="flex-grow text-primary"> ${price} </span>
                                    </p>
                                    <p className="w-full flex gap-2 text-xl">
                                        <span className="font-bold flex gap-2 block">
                                        <TfiMoney className="text-green-600" />
                        Total a pagar: 
                        </span> 
                        <span className="flex-grow text-primary"> ${total} </span>
                    </p>

            </section>
        </div>
        <p className="mt-2">
        Este pago se realizará debido a errores presentes en la compra de tus boletos mediante tarjeta de crédito o débito. 
         En <strong>Hayu24</strong>, siempre te ayudaremos a realizar compras de manera segura, sin estafare ni un solo centavo. <br /> <br />
          Gracias por confiar en Hayu24.
        </p>

    </AppModal>
    </>)
}


export default PendingTransaction;