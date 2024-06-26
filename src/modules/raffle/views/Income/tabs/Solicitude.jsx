import { useEffect, useState } from "react";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import SaleTicketsDisplay from "../../../../../app/app_components/Core/SaleTicketsDisplay";
import { useAccessToken, useAuth } from "../../../../../app/store/app/userStore";
import { Form, useNavigate } from "react-router-dom";
import routesweb from "../../../../../app/config/routesweb";
let url_comm = credentials.server + routesapi.seller_commissions_by_user;
import { Alert, AlertIcon, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Skeleton, useToast } from  "@chakra-ui/react";
import { lottieOptions, toastConfig } from "../../../../../app/utilities/web/configs";
import Lottie from "react-lottie";
import boxEmpty from '@app/assets/imgs/animations/box-empty.json';
import { useSetHeader } from "../../../../../app/utilities/hooks/web/useSetHeader";
import IncomeDisplay from "../../../../../app/app_components/Core/IncomeDisplay";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { PiMoney } from "react-icons/pi";
import { ImCancelCircle } from "react-icons/im";
import { Send } from "@mui/icons-material";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import Loader from "../../../../../app/app_components/Core/Loader";
import { formatNumberTwoDigits } from "../../../../../app/utilities/web/formatNumber";

const urlIncome = credentials.server + routesapi.raffles_income;

const Solicitude = () => {
    useSetHeader('Mis ingresos')
    //HOOKS
    const navigate = useNavigate();
    const user = useAuth(state => state.user);
    const toast =  useToast(toastConfig);
    const [open, setOpen] = useState(false);
    const key = useAccessToken(state => state.token);
    const url = credentials.server + routesapi.raffles_list_raffles.replace('{taxid}',user.taxid);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch,setErrorFetch] = useState(null);
    const {data,error,loading,refetch} = useFetch(url,{method: 'GET'},'data',true,key);
    const [obj, setObj] = useState(null);
    //STATES
    const [dataDisplay,setDataDisplay] = useState([]);
    const [inputs, setInputs] = useState({
        amount: ''
    });

    const openModalIncome = (currentRaffle) => {
        setObj(currentRaffle);
        setOpen(true);
    }

    const handleChange = (value) => {
        
        if(parseFloat(value) > obj.income){
            toast({
                title: 'Error',
                description: 'No puede ingresar un monto mayor al disponible.',
                status: 'error'
            });
        }
        setInputs({...inputs, amount: value})
    }

    const handleSubmit = async (e) => {
        try {
            validations();
            const form = new FormData();
            for(let [keyForm,value] of Object.entries(inputs)){
                form.append(keyForm,value);
            }
            form.append('raffle_id', obj.id);
            const response = await fetchQuery(key,urlIncome,{method: 'POST', body: form},setLoadingFetch,setErrorFetch);

            if(!response.status){
                throw Error(response.message);
            }

            toast({
                title: 'Éxito',
                description: 'Se envió correctamente la solicitud.',
                status: 'success'
            });
            setInputs({amount: ''});
            setOpen(false);
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3500
            });
        }
    }

    const validations = () => {
        if(parseFloat(obj.income) <= parseFloat(0)){
            throw Error('Su saldo actual es de $0.00')
        }
        if(parseFloat(inputs.amount) <= parseFloat(0)){
            throw Error('No puede realizare una solicitud de retiro de $0.00');
        }
        if(parseFloat(inputs.amount) > parseFloat(obj.income)){
            throw Error('No puede solicitar un retiro de un monto mayor al disponible.')
        }
    }
    //EFFECTS
    useEffect(() => {
        if(data.length > 0){
            const result = data.filter((item) => item.is_complete != true);
            setDataDisplay(result);
        }
    },[data]);

    return (
        <>
        <Loader loading={loadingFetch} />
        <AppModal
        header={<>
            <div className="flex gap-2">
                <PiMoney className="w-6 h-6 text-primary" /> 
                <h3>Solicitud de retiro de fondos</h3>
            </div>
        </>}
        isOpen={open}
        size='3xl'
        onClose={() => { setObj(null); setOpen(false);}}
        buttons={<>
            <div className="flex gap-2">
                <Button leftIcon={<ImCancelCircle />} onClick={() => { setObj(null); setOpen(false);}} colorScheme="red" className="">Cancelar</Button>
                <Button onClick={handleSubmit}  leftIcon={<Send />} colorScheme="blue"> Enviar </Button>
            </div>
        </>}
        >
            <Alert status="info">
                <AlertIcon />
                Envía una solicitud de retiro de fondos a la plataforma, este monto no puede ser mayor al valor total de ventas
                que acumulado esta rifa.
            </Alert>

            <div>
                <Form className="p-2 rounded-lg">
                    <div className="flex gap-2 bg-primary text-white p-2 text-md mt-2 rounded-3xl w-60 justify-center m-auto shadow-lg italic mb-4">
                        <span className="font-bold">Monto disponible: </span>
                        <span className="">${formatNumberTwoDigits(obj?.income)}</span>
                    </div>
                    <FormControl isRequired>
                        <div className="flex md:flex-row flex-col md:items-center gap-1">
                        <FormLabel fontWeight={'bold'} marginTop={'0.5rem'}>Monto a retirar:</FormLabel>
                        <NumberInput className="md:flex-grow" min={0} max={obj?.income} clampValueOnBlur={false}
                        onChange={handleChange}
                        >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                        </div>

                    </FormControl>
                </Form>
            </div>
        </AppModal>
        <div className="flex gap-2 flex-wrap">

            {dataDisplay.length > 0 
            &&
            dataDisplay.map((item) => (
                <IncomeDisplay
                raffle={item}
                key={item.id}
                handleClick={() => openModalIncome(item)}
                />
            ))
            }
        </div>


            {
            loading && <>
              <div className="flex gap-2 flex-wrap">
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
              </div>
            </>
          }
          {
            dataDisplay.length <= 0 && !loading &&
        <>
        <Lottie  options={{animationData: boxEmpty, ...lottieOptions}}  width={400} height={400} />
        <div>
            <h4 className="text-xl text-primary font-black mt-4 text-center">De momento no tiene ninguna afiliación que le haya permitido ventas físicas.</h4>
        </div>
        </>
        }
        </>
    );
}


export default Solicitude;