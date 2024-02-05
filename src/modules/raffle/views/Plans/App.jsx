import { Alert, AlertIcon, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useAccessToken, useAuth } from "../../../../app/store/app/userStore";
import { useEffect, useState } from "react";
import { useFetch } from "../../../../app/utilities/hooks/data/useFetch";
import { fetchQuery } from "../../../../app/utilities/web/fetchQuery";
import { toastConfig } from "../../../../app/utilities/web/configs";
import DisplayToast from "../../../../app/app_components/Core/DisplayToast";
import Loader from "../../../../app/app_components/Core/Loader";
import AppModal from "../../../../app/app_components/Core/AppModal";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import AppDisplayPlan from "../../../../app/app_components/Core/AppDisplayPlan";
import { MdOutlineAssignmentInd, MdOutlinePayments } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { Form } from "react-router-dom";
import { credentials } from "../../../../app/config/app";
import routesapi from "../../../../app/config/routesapi";
import { FaPassport, FaPiggyBank } from "react-icons/fa6";

const url  = credentials.server + routesapi.subscriptions;

const App = () => {
 //hooks
const user = useAuth(state => state.user);
const updateUser = useAuth(state => state.save);
const token = useAccessToken(state => state.token);
const toast = useToast(toastConfig);
//state
const [open,setOpen] = useState(false);
const [loadingFetch, setLoadingFetch] = useState(false);
const [errorFetch, setErrorFetch] = useState(null);
const [openPayment, setOpenPayment] = useState(false);
const [idPlan, setIdPlan] = useState('');
const [file, setFile] = useState('');
const { data, error, loading,total, refetch: fetchData } = useFetch(url,{method: 'GET'},'data');

//handlers
const handleClose = () => {
    toast({
        title: 'Advertencia',
        description: 'No puede cerrar el modal hasta completar la suscripción de un plan.',
        status: 'warning',
    })
}
const handleClosePayment = () => {
    setOpenPayment(false);
}
const handleClick = (plan) => (e) => {
    setIdPlan(plan.id);
    setOpenPayment(true);       
} 
const handleChange = (e) => {
    setFile(e.target);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingFetch(true);
    const urlCreateFilePayment = credentials.server + routesapi.raffles_subscriptions_voucher;
    const payload = {
        fileable_id: user.id,
        file: file.files[0]
    };

    const form = new FormData();
    for(let [key,value] of Object.entries(payload)){
        form.append(key,value);
    }
    try{
        const responseFile = await fetchQuery(token,urlCreateFilePayment,{method: 'POST', body: form},() => {},setErrorFetch);
        if(!responseFile.status){
            toast({
                title: 'Error del servidor',
                description: 'A ocurrido un error, asegúrese de tener internet,e inténtelo mas tarde.',
                status: 'error'
            });
            return;
        }
        handleClosePayment();
        setLoadingFetch(true);
        const urlUpdate = credentials.server + routesapi.raffles_update_plans + `/${user.id}`;
        const params = { subscription_id: idPlan };
        const response = await fetchQuery(token, urlUpdate,{method:'PATCH',body: new URLSearchParams(params)},setLoadingFetch,setErrorFetch);
        if(response.status){
            updateUser(response.data);
            toast({
                title: 'Actualización',
                description: 'Se actualizo correctamente la nueva suscripción, por favor para acceder a los servicios de la plataforma se debe verificar su comprobante de pago, una vez confirmado por favor revisar su correo electrónico y volver a ingresar en el sistema.',
                status: 'success',
                duration: 10000
            });
            setOpen(false);
            return;
        }

        toast({
            title: 'Actualización',
            description: response.message,
            status: 'error'
        }); 


    }catch(e){
        toast({
            title: 'Error',
            description: e.message,
            status: 'error',
        })
    }finally{
        setLoadingFetch(false);
    }
}
//effects

useEffect(() => {
    if(user && user.is_new){
        setOpen(true);
    }
},[])

console.log(data);
return (
    <>
    <DisplayToast />
    <Loader loading={loadingFetch} />
        <div className="flex justify-center gap-2 mt-4 items-center">  
            <IoCheckmarkDoneCircle className="text-6xl text-green-600 text-center" />
            <p className="mb-4 text-center">
                <span className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-5xl dark:text-white text-center text-primary">
                Elije un plan ideal y ayudémonos mutuamente.
                </span>
                <br />
                <span className="text-xl text-primary">
                “Juntos, podemos marcar una diferencia perdurable en la historia de quienes más necesitan nuestro apoyo”.
                </span>
                </p>
        </div>

        {/* <div className="flex gap-5 w-9/12 m-auto justify-around xl:flex-nowrap lg:flex-wrap md:flex-wrap"> */}
        {/* <div className="grid grid-rows-1 2xl:grid-cols-3 xl:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1 md:place-items-center"> */}
        <div className="flex flex-wrap gap-8 justify-around">
            {
                data.map((plan) =>  (<AppDisplayPlan key={plan.id} plan={plan} handleClick={handleClick(plan)} />))
            }
        </div>
        <AppModal header={<>
            <div>
                <MdOutlinePayments className="text-4xl text-green-600" /> 
                <span className="text-primary">Completa la suscripción de tu nuevo plan.</span>
            </div>
        </>}  
        isOpen={openPayment} 
        onClose={handleClosePayment} 
        size='5xl'
        >
                <p className="italic text-orange-900">
                    Actualmente el sistema solo permite cancelar tu solicitud de pago por de medio de transferencia bancaria,
                    próximamente se habilitaran nuevas formas de pago, lamentamos cualquier inconveniente que te causemos.
                </p>
                {data && data.map( plan => {

                 return plan.user.bank_accounts.map(account => {
                                return <div key={account.id}>
                                    <section>
                                        <div className="flex gap-4 md:flex-row flex-col">
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className="w-4/12 font-bold flex gap-2 block"> 
                                                <BsBank className="text-green-600" /> Entidad Bancaria: 
                                            </span> 
                                            <span className="flex-grow text-primary">
                                                {account.bank_name}
                                            </span>
                                        </p>
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className="w-4/12 font-bold flex gap-2 block">
                                            <FaPiggyBank className="text-green-600" />
                                                Tipo Cuenta: 
                                            </span> 
                                            <span className="flex-grow text-primary"> {account.type} </span>
                                        </p>
                                      
                                        </div>
                                        <div className="flex gap-4 md:flex-row flex-col">
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className="w-4/12 font-bold flex gap-2 block">
                                            <GrMoney className="text-green-600" />
                                                Nº Cuenta: 
                                            </span> 
                                            <span className="flex-grow text-primary"> {account.account_number} </span>
                                        </p>
                                       
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className="w-4/12 font-bold flex gap-2 block">
                                                <FaPassport className="text-green-600" />
                                                Nº de Cédula: 
                                            </span> 
                                            <span className="flex-grow text-primary"> {account.taxid} </span>
                                        </p>
                                        </div>
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className="w-4/12 font-bold flex gap-2 block">
                                                <MdOutlineAssignmentInd className="text-green-600" />
                                                Nombre de Cuenta: 
                                            </span> 
                                            <span className="flex-grow text-primary"> {account.name_account} </span>
                                        </p>
                                    </section>
                                <div className="p-2 w-56 mb-2">
                                    {
                                        account.qr_image ? <a target="__blank"
                                        href={credentials.server + account.qr_image}>
                                            <img className="block w-40 h-40 max-w-full max-h-full"
                                            src={credentials.server + account.qr_image} alt="auth" />
                                        </a> 
                                        : 
                                        <div className="font-bold text-secondary">
                                            {/* No se ha registrado la imagen QR. */}
                                        </div>
                                    }
                                </div>
                                </div>
                            })})}
                <article className="mt-6">
                    <div>
                        <Alert className="mt-6" status='warning' variant='left-accent'>
                            <AlertIcon />
                            Posterior a la realización de la transferencia adjuntar el comprobante de pago, caso contrario 
                            no se validara su suscripción y no dispondrá de acceso a los servicios de la plataforma.
                        </Alert>

                        <div className="mt-8">
                            <Form onSubmit={handleSubmit}>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Adjuntar comprobante de pago.
                                    </FormLabel>
                                    <Input type="file" onChange={handleChange} />
                                </FormControl>
                                <div className=" mt-12 text-end gap-2">
                                        <Button  className="mr-4" colorScheme="red">
                                            Cerrar
                                        </Button>
                                        <Button type="submit" colorScheme="blue">
                                              Confirmar          
                                        </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </article>
        </AppModal>
    </>
);
}

export default App;