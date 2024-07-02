import { Alert, AlertIcon, Button, FormControl, FormLabel, Input, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
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
import { FaCreditCard, FaPassport, FaPiggyBank } from "react-icons/fa6";
import { useSetHeader } from "../../../../app/utilities/hooks/web/useSetHeader";
import BankAccounts from "../../../../components/BankAccounts";
import { FaCircleInfo } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi2";
import { TfiMoney } from "react-icons/tfi";
import { uuid } from "../../../../app/utilities/web/uuid";
import AppPhonePayment from "../../../../app/app_components/Core/AppPhonePayment";

const url  = credentials.server + routesapi.subscriptions;

const App = () => {
 //hooks
 useSetHeader('Actualizate a un mejor plan');
const user = useAuth(state => state.user);
const updateUser = useAuth(state => state.save);
const token = useAccessToken(state => state.token);
const toast = useToast(toastConfig);
//state
const [bankAccounts,setBankAccounts] = useState([]);
const [open,setOpen] = useState(false);
const [loadingFetch, setLoadingFetch] = useState(false);
const [errorFetch, setErrorFetch] = useState(null);
const [openPayment, setOpenPayment] = useState(false);
const [idPlan, setIdPlan] = useState('');
const [dataPLan, setDataPlan] = useState(null);
const [file, setFile] = useState('');
const { data, error, loading,total, refetch: fetchData } = useFetch(url,{method: 'GET'},'data');
const [transaction, setTransaction] = useState('123');


//handlers
const handleClosePayment = () => {
    setOpenPayment(false);
}
const handleClick = (plan) => (e) => {
    setIdPlan(plan.id);
    setDataPlan(plan);
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
        file: file.files[0],
        subscription_id: idPlan

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

const validations = () => {
    const subscription = user.subscription;
    if(subscription.id === idPlan){
        toast({});
    }
}

const handlePayment = (e, isPay) => {
    if(isPay){
        setTransaction(uuid());
        localStorage.setItem('plan',idPlan);
        localStorage.setItem('type_of_transaction','t_plans');
    }
}
//effects

useEffect(() => {
    setTransaction(uuid());
    if(user && user.is_new){
        setOpen(true);
    }
},[]);


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
            <div className="flex gap-2 items-center border-b-2 border-b-gray-300">
            <MdOutlinePayments className="text-4xl text-primaryop-800" /> 
            <h2 className="title-dynamic"
                >Completa la suscripción de tu nuevo plan.</h2>
            </div>
        </>}  
        isOpen={openPayment} 
        onClose={handleClosePayment} 
        size='5xl'
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
                
                {data && data.length > 0 && <BankAccounts bankAccounts={data[0].user.bank_accounts} /> }
                <article className="">
                <div className="">
                            <h2 className="text-xl font-bold text-primary">Datos de Pago</h2>
                                <div className="flex">
                                <section>
                                    <p className="w-full flex gap-2  text-xl">
                                        <span className="font-bold flex gap-2 block"> 
                                            <HiOutlineTicket className="text-green-600" />Nombre del plan: 
                                        </span> 
                                        <span className="flex-grow text-primary">
                                            {dataPLan?.title}
                                        </span>
                                    </p>
                                    <p className="w-full flex gap-2 text-xl">
                                        <span className="font-bold flex gap-2 block">
                                        <TfiMoney className="text-green-600" />
                                            Total a pagar: 
                                        </span> 
                                        <span className="flex-grow text-primary"> ${dataPLan?.price} </span>
                                    </p>
                                    
                                </section>
                                </div>

                </div>
                    <div>
                        <Alert className="mt-2" status='warning' variant='left-accent'>
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
                </TabPanel>
                <TabPanel>
                <AppPhonePayment parameters={{amount: parseFloat(dataPLan?.price) * 100 }}
                        transactionId={transaction} >
                            <div className="">
                            <h2 className="text-xl font-bold text-primary text-center">Datos de Pago</h2>
                                <div className="flex justify-center">
                                <section>
                                    <p className="w-full flex gap-2  text-xl">
                                        <span className="font-bold flex gap-2 block"> 
                                            <HiOutlineTicket className="text-green-600" />Nombre del plan: 
                                        </span> 
                                        <span className="flex-grow text-primary">
                                            {dataPLan?.title}
                                        </span>
                                    </p>
                                    <p className="w-full flex gap-2 text-xl">
                                        <span className="font-bold flex gap-2 block">
                                        <TfiMoney className="text-green-600" />
                                            Total a pagar: 
                                        </span> 
                                        <span className="flex-grow text-primary"> ${dataPLan?.price} </span>
                                    </p>
                                    
                                </section>
                                </div>

                            </div>
                        </AppPhonePayment>
                </TabPanel>
                </TabPanels>
                </Tabs>
                </div>
        </AppModal>
    </>
);
}

export default App;