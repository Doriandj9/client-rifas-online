import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import Layout from "../app/layouts/Layout";
import PayphoneLayout from "../app/layouts/PayphoneLayout";
import routesweb from "../app/config/routesweb";
import { Button, useToast } from "@chakra-ui/react";
import { lottieOptions, toastConfig } from "../app/utilities/web/configs";
import { fetchQuery, initialFetch } from "../app/utilities/web/fetchQuery";
import { application, credentials } from "../app/config/app";
import loadingPayment from '@app/assets/imgs/animations/loading-payment.json';
import Lottie from "react-lottie";
import AppModal from "../app/app_components/Core/AppModal";
import { MdOutlineError } from "react-icons/md";
import ModalSuccess from "../app/app_components/Core/ModalSuccess";
import routesapi from "../app/config/routesapi";
import { useAccessToken, useAuth } from "../app/store/app/userStore";
import moment from "moment";
import { formatNumberTwoDigits } from "../app/utilities/web/formatNumber";

const urlPayment = credentials.server + routesapi.public_payment_raffles;


const CreditPayment = () => {
    const navigate = useNavigate();
    const user = useAuth(state => state.user);
    const token  = useAccessToken(state => state.token);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast(toastConfig);
    const url = new URL(window.location.href);
    const [notUnique, setNotUnique] = useState(false);
    const params = url.searchParams;
    const idTransaction = params.get('id');
    const clientTransaction= params.get('clientTransactionId');
    const opTransaction = localStorage.getItem('type_of_transaction');
    const [isSuccess, setIsSuccess] = useState(false);

    const confirmPayment = async (id,transaction) => {
        if(opTransaction === 't_plans'){
            requestPlansCredit(id, transaction);
            return;
        }
        if(opTransaction === 't_tickets'){
            requestTicketsCredit(id, transaction);
            return;
        }
        
        toast({
            title: 'Error',
            description: 'Error no se encontró un tipo de transacción',
            status: 'error'
        });
        return navigate('/');
    }

    const requestPlansCredit = async (id, transaction) => {

        const url = 'https://pay.payphonetodoesposible.com/api/button/V2/Confirm';
        const payload = JSON.stringify({id, clientTxId: transaction});
        const urlCreditCard = credentials.server + routesapi.raffles_plans_card;
    
        try {
            const response =  await fetchQuery(application.tokenPP,url,{
                method: 'POST',
                body: payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            }, setLoading,setError);
           const createResponse = await fetchQuery(token,urlCreditCard,{
            method: 'POST',
            body: JSON.stringify(response),
            headers: {
                'Content-Type': 'application/json'
            }
           },setLoading, setError);

           if(!createResponse.status){
            throw Error(createResponse.message);
           }
           const idPLan = localStorage.getItem('plan');
           if(!idPLan){
            throw Error('Error no existe un plan seleccionado para la actualización vuelva a realizar el proceso.')
           }
           const form = new FormData();
           form.append('fileable_id', user.id);
           form.append('subscription_id', idPLan);
           form.append('card_transaction',true);
           const urlCreateFilePayment = credentials.server + routesapi.raffles_subscriptions_voucher;
           const responseFile = await fetchQuery(token,urlCreateFilePayment,{method: 'POST', body: form},setLoading,setError);
           if(!responseFile.status){
            throw Error(responseFile.message);
            }
            const urlUpdate = credentials.server + routesapi.raffles_update_plans + `/${user.id}`;
            const params = { subscription_id: idPLan };
            const responseFinal = await fetchQuery(token, urlUpdate,{method:'PATCH',body: new URLSearchParams(params)},setLoading,setError);
            if(!responseFinal.status){
                throw Error(responseFile.message);
            }
            setIsSuccess(true);
        } catch (error) {
            setError(error)
        }
    }

    const requestTicketsCredit = async (id, transaction) => {
        const url = 'https://pay.payphonetodoesposible.com/api/button/V2/Confirm';
        const payload = JSON.stringify({id, clientTxId: transaction});
        const urlCreditCard = credentials.server + routesapi.payment_tickets_credit;
        try {
            const response =  await fetchQuery(application.tokenPP,url,{
                method: 'POST',
                body: payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            }, setLoading,setError);
           const createResponse = await fetchQuery(token,urlCreditCard,{
            method: 'POST',
            body: JSON.stringify(response),
            headers: {
                'Content-Type': 'application/json'
            }
           },setLoading, setError);

           if(!createResponse.status){
            throw Error(createResponse.message);
           }

           const requestCredit = JSON.parse(localStorage.getItem('request_transaction'));
           const form = new FormData();
           for(let[key,value] of Object.entries(requestCredit)){
                form.append(key, value);
           }

           form.append('credit_transaction', true);

           if(await requestCreditTickets(form)){
            form.set('no_code', true);
            await requestCreditTickets(form);
        } else  {
            setIsSuccess(true);
        }

        } catch (error) {
           const requestCredit = JSON.parse(localStorage.getItem('request_transaction'));
           const datetime = moment().add(2,'hours').unix();
           Reflect.set(requestCredit,'time_expired',datetime);
           Reflect.set(requestCredit,'credit_transaction',true);
           localStorage.setItem('error_transaction',JSON.stringify(requestCredit));


            setError(error)
        }
        
    }

    const requestCreditTickets =  async (form) => {

        const response =  await initialFetch(urlPayment,{method: 'POST', body: form});

            if(!response.status){
                if(!response.error_unique){
                    setNotUnique(true);
                }
                throw Error(response.message);
            }

            

            if(response.invalid_code){
                toast({
                    title: 'Información',
                    description: 'El código de afiliado/vendedor contiene error ' + response.message_code +
                    ', se va realizar la transacción por temas de seguridad, pero el vendedor afiliado no recibirá su comisión.',
                    status: 'warning',
                    duration: 5000
                });
                return true;
            }
        return false;
    }


    const redirect =  () => {
        let url = opTransaction === 't_plans' ?  '/dashboard/raffles/update/plans' : `/payment/raffles/${JSON.parse(localStorage.getItem('request_transaction')).raffles_id}`;
        return navigate(url);
    }

    useEffect(() => {
        if(!clientTransaction && !idTransaction){
            navigate('/dashboard/raffles/update/plans');
        }

        confirmPayment(idTransaction,clientTransaction);
    },[idTransaction,clientTransaction])
    
    return (<>
        <PayphoneLayout>
        <div className="flex w-full h-full items-center justify-center flex-col mt-[5%]">
            <h4 className="title-dynamic text-3xl font-black">Completando la transacción de tu compra...</h4>
            <p className="text-gray-600">Por favor no salga de la pagina hasta que finalize el proceso.</p>
        <Lottie  options={{animationData: loadingPayment, ...lottieOptions}}  width={600} height={600} />
        </div>

        {
            error && <>
                <AppModal 
                isOpen={error !== null}
                onClose={redirect}
                buttons={<> <Button colorScheme="red" onClick={redirect}> Regresar </Button> </>}
                header={<>
                    <div className="flex justify-center items-center gap-2">
                    <MdOutlineError className="w-6 h-6 text-red-700" />
                    <h2>!Error</h2>
                    </div>
                </>}
                >
                 <div>
                    <p> {error.message} </p>
                        {
                        opTransaction  != 't_plans' && notUnique === true &&
                            <p>
                                Tiene permitido realizar una nueva compra con un saldo de 
                                 (<strong>${formatNumberTwoDigits(parseFloat(JSON.parse(localStorage.getItem('request_transaction')).total))}</strong>)
                                , la misma estará disponible por 2 horas a partir de ahora.
                            </p>
                        }
                    <p className="mt-4 text-gray-500 italic"> Póngase en contacto con el administrador del sistema para corregir el error.</p>

                 </div>
                </AppModal>
            </>
        }

        {
            isSuccess && <>
                <ModalSuccess
                    open={isSuccess}
                    handleClose={redirect}
                >
                    {
                        opTransaction  == 't_plans' ?
                        <p>
                            Transacción completada, disfruta de todas las funcionalidades del sistema.
                        </p>
                        :
                        <p>
                            Transacción completada, y mucha suerte con tus nuevos boletos ganadores.
                        </p>
                    }
                </ModalSuccess>
            </>
        }

            
        </PayphoneLayout>
    </>);

}


export default CreditPayment;