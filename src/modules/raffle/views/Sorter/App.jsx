import { useEffect, useState } from "react";
import { credentials } from "../../../../app/config/app";
import routesapi from "../../../../app/config/routesapi";
import { useFetch } from "../../../../app/utilities/hooks/data/useFetch";
import SaleTicketsDisplay from "../../../../app/app_components/Core/SaleTicketsDisplay";
import { useAccessToken, useAuth } from "../../../../app/store/app/userStore";
import { Form, useNavigate } from "react-router-dom";
import routesweb from "../../../../app/config/routesweb";
import { Alert, AlertIcon, FormControl, FormLabel, Input, Skeleton, useToast } from  "@chakra-ui/react";
import { lottieOptions, toastConfig } from "../../../../app/utilities/web/configs";
import Lottie from "react-lottie";
import boxEmpty from '@app/assets/imgs/animations/box-empty.json';
import { useSetHeader } from "../../../../app/utilities/hooks/web/useSetHeader";
import SorterRaffleDisplay from "../../../../app/app_components/Core/SorterRaffleDisplay";
import ConfirmDialog from "../../../../app/app_components/Core/ConfirmDialog";
import { fetchQuery } from "../../../../app/utilities/web/fetchQuery";
import Loader from "../../../../app/app_components/Core/Loader";
let url = credentials.server + routesapi.raffles_list_raffles;
const raffles_url = credentials.server  + routesapi.raffles_lottery;

const App = () => {
    useSetHeader('Afiliaciones para ventas físicas')
    //HOOKS
    const navigate = useNavigate();
    const user = useAuth(state => state.user);
    const key = useAccessToken(state => state.token);
    const {data,error,loading,refetch} = useFetch(url.replace('{taxid}',user.taxid),{method: 'GET'},'data',true,key);
    const toast = useToast(toastConfig);
    //STATES
    const [dataDisplay,setDataDisplay] = useState([]);
    const [open,setOpen] = useState(false);
    const [loadingSorter, setLoadingSorter] = useState(false);
    const [currentRaffle, setCurrentRaffle] = useState(null);
    const [errorSorter, setErrorSorter] = useState(false);
    const [inputs, setInputs] = useState({
        link: ''
    })


    //EFFECTS
    
    const handleClick  = async () => {
        let body = {
            in_sorter: true,
        };
        try {
            if(currentRaffle && inputs.link !== ''){
                body.summary = inputs.link;
            }

            const response = await fetchQuery(key,`${raffles_url}/${currentRaffle.id}`,{
                method: 'PUT', body: new URLSearchParams(body)
            },setLoadingSorter,setErrorSorter);

            if(!response.status){
                throw new Error(response.message);
            }
            navigate(
                "/" + routesweb.sorter.root.replace(':id',currentRaffle.id)
           );
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                duration: 5000,
                status: 'error'
            });
        } finally {
            setLoadingSorter(false);
        }   
    }

    const handleInput = (e) => {
        setInputs({...inputs,[e.target.name]: e.target.value});
    }

    const handleOpen = (raffle) => {
        setCurrentRaffle(raffle);
        setOpen(true);
    }

    const handleClose = () => {
        setCurrentRaffle(null);
        setOpen(false);
    }

    return (
        <>
        <Loader loading={loadingSorter} />
        <ConfirmDialog
        title={'Actualize de link de acceso para la transmisión en vivo.'}
        msgBtnCancel="Regresar"
        msgBtnConfirm="Continuar"
        handleClose={handleClose}
        handleConfirm={handleClick}
        open={open}
        size="3xl"
        >
             <Alert status='info'>
                <AlertIcon />
                Este parámetro permite notificar a todos los compradores que va a comenzar el sorteo de la rifa y que pueden visualizarlo por medio del en vivo que hayan seleccionado. <br />El mismo puede ser actualizado más adelante en caso de posibles fallos y se realice un nuevo en vivo.
            </Alert>
            <Form className="mt-8">
                <FormControl>
                    <FormLabel>
                        Link del en vivo.
                    </FormLabel>
                    <Input 
                        placeholder="Por ejemplo: https://fb.watch/sa0hTR7EF2/"
                        name="link"
                        value={inputs.link}
                        onInput={handleInput}
                    />
                </FormControl>
            </Form>
        </ConfirmDialog>
        <div className="p-2 w-11/12 m-auto shadow-lg rounded-2xl">
            <h2 className="text-2xl text-primary font-black text-center">Seleccionar rifa para el sorteo.</h2>
        </div>
        <hr className="mt-4" />
        <div className="flex gap-2 flex-wrap mt-2">

            {data.length > 0 
            &&
            data.map((item) => (
                <SorterRaffleDisplay
                handleClick={() => handleOpen(item)}
                raffle={item}
                key={item.id}
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
            data.length <= 0 && !loading &&
        <>
        <Lottie  options={{animationData: boxEmpty, ...lottieOptions}}  width={400} height={400} />
        <div>
            <h4 className="text-xl text-primary font-black mt-4 text-center">De momento no tiene ninguna rifa para realizar el sorteo.</h4>
        </div>
        </>
        }
        </>
    );
}


export default App;