import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import AppButton from "../../../../../../app/app_components/Core/AppButon";
import { MdOutlineAddCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { CHARACTERS_LETTERS_SPECIALS } from "../../../../../../app/utilities/validations/Expresions";
import { MdRestore } from "react-icons/md";
import { BsXbox } from "react-icons/bs";
import { FaTrashRestore } from "react-icons/fa";
import { defaultDrawParameters, useDrawDetails, useDrawParameters, useIsAttempt, useRaffleStore } from "../../../../../../app/store/app/raffleSorterStore";
import { toastConfig } from "../../../../../../app/utilities/web/configs";
import { useLocaleStorageFromDB } from "../../../../../../app/utilities/hooks/data/useStorageFromDB";
import { credentials } from "../../../../../../app/config/app";
import routesapi from "../../../../../../app/config/routesapi";
import { FaCheck } from "react-icons/fa";
import ConfirmDialog from "../../../../../../app/app_components/Core/ConfirmDialog";
import { fetchQuery } from "../../../../../../app/utilities/web/fetchQuery";
import { useAccessToken, useAuth } from "../../../../../../app/store/app/userStore";
import Loader from "../../../../../../app/app_components/Core/Loader";

let url = credentials.server  + routesapi.raffles_lottery;


const Parameters = () => {
     
    const toast = useToast(toastConfig);
    const user = useAuth((state) => state.user);
    const navigate = useNavigate();
    const token = useAccessToken((state) => state.token);
    const raffle = useRaffleStore((state) => state.raffle);
    const isClickAttempt = useIsAttempt((state) => state.isAttempt);
    const updateIsClickAttempt = useIsAttempt((state) => state.update);
    const {saveData, loading, error, success} = useLocaleStorageFromDB();
    const [isAttempts, setIsAttempts] = useState(true);
    const [attempts, setAttempts] = useState(0);
    const [currentAttempts, setCurrentAttempts] = useState(0);
    const drawParameters = useDrawParameters((state) => state.drawParameters);
    const updateDrawParameters = useDrawParameters((state) => state.update);
    const [openAll, setOpenAll] = useState(false);
    const [openSorter, setOpenSorter] = useState(false);
    const drawDetails = useDrawDetails((state) => state.drawDetails);
    const updateDrawDetails = useDrawDetails((state) => state.update);
    const [isComplete, setIsComplete] = useState(false);
    const tickets = JSON.parse(drawDetails).tickets_winner;
    const ticketSelected = JSON.parse(drawParameters).draw;
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [errorComplete, setErrorComplete] = useState(null);

    const [inputs,setInputs] = useState({
        number: ''
    });

    const handleInput = (e) => {

        let value = e.target.value;
        const inputName = e.target.name;
        if(inputName === 'number'){
            value = value.replace(CHARACTERS_LETTERS_SPECIALS,'');
            
            if(parseInt(value) > 5){
                value = value.substring(0,value.length - 1);
                
            }
            if(parseInt(value) <= 0){
                value = '';
                
            }
        }

        setInputs(
            {
                ...inputs,
                [e.target.name]:  value,
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputs.number === '') toast({title: 'Error', description: 'Error no existen parámetros', status: 'error'});
        let data = JSON.parse(drawParameters);
        data.total_attempts = parseInt(inputs.number);
        data.current_attempts = currentAttempts;
        data.assignation = true;

        saveData(`${url}/${raffle.id}`,raffle,drawDetails,'draw_details','details');
        saveData(`${url}/${raffle.id}`,raffle,JSON.stringify(data),'draw_parameters','parameters');




    }

    const clickAttempts = () => {
        setCurrentAttempts(attempts + 1);
        setAttempts(attempts + 1);
        let data = JSON.parse(drawParameters);
        data.current_attempts = attempts + 1;
        if(data.current_attempts === data.total_attempts){
            data.final = true;
        }
        saveData(`${url}/${raffle.id}`,raffle,JSON.stringify(data),'draw_parameters','parameters');
    };

    const restartParameters = () => {
        let data = JSON.parse(drawParameters);
        data.total_attempts = 0;
        data.current_attempts = 0;
        data.final = false;
        data.assignation = false;
        let dataDetails = {...JSON.parse(drawDetails)};
        dataDetails.tickets_discarded = dataDetails.tickets_discarded.map((item) => {
            if(item.description.id === ticketSelected.id){
                item.lost = [];
                return item;
            }

            return item;
        });

        setAttempts(0);
        setCurrentAttempts(0);
        setInputs({...inputs,number: ''});
        setIsAttempts(true);
        saveData(`${url}/${raffle.id}`,raffle,JSON.stringify(data),'draw_parameters','parameters');
        saveData(`${url}/${raffle.id}`,raffle,JSON.stringify(dataDetails),'draw_details','details');
        updateIsClickAttempt(false);
        setIsComplete(false);

    }
    const restartAllParameters = () => {
        let draw_details = {
            tickets_winner: [],
            tickets_discarded: []
        }
        const ticketsWinner =   JSON.parse(raffle.awards)
                .sort((a,b) => a.id - b.id)
                .map((award,i) => {
                    return {
                        description: award,
                        winner: null,
                        selected: false,
                        complete: false,
                    };
                })
                const ticketsLost =   JSON.parse(raffle.awards)
                .sort((a,b) => a.id - b.id)
                .map((award,i) => {
                    return {
                        description: award,
                        lost: []
                    };
                })
                draw_details.tickets_winner = ticketsWinner;
                draw_details.tickets_discarded= ticketsLost;
        saveData(`${url}/${raffle.id}`,raffle,JSON.stringify(draw_details),'draw_details','details');
        setAttempts(0);
        setCurrentAttempts(0);
        setInputs({...inputs,number: ''});
        setIsAttempts(true);
        saveData(`${url}/${raffle.id}`,raffle,defaultDrawParameters,'draw_parameters','parameters');
        setIsComplete(false);
        updateIsClickAttempt(false);
        
    }


    const completeRaffle = async () => {
        const urlComplete = credentials.server + routesapi.raffle_complete.replace('{id}',raffle.id);
        try{
            const form = new FormData();
            form.append('id', raffle.id);
            form.append('is_complete', true);
            const response  = await fetchQuery(token,urlComplete,{method: 'POST', body: form},setLoadingComplete,setErrorComplete);
            if(!response.status){
                throw Error(response.message);
            }

            toast({
                title: 'Éxito',
                description: 'Se completo correctamente la rifa.',
                status: 'success'
            });
            setOpenSorter(false);
            const time = setTimeout(() => {
                navigate('/dashboard/raffles/me/sorter');
                clearInterval(time);
            },1000);
        }catch(e){
            toast({
                title: 'Error',
                description: e.message,
                status: 'error',
                duration: 5000 
            });
        }finally{
            setLoadingComplete(false);
        }
    }


    useEffect(() => {
        if(tickets && tickets.length > 0){
            const ticket = tickets?.find((item) => item.selected === true);
            let parameters = JSON.parse(drawParameters);
           if(ticket){
               parameters.draw = ticket.description;
               parameters.final = false;
        }

        if(!parameters.assignation){
            parameters.assignation = false;
            setAttempts(0);
            setCurrentAttempts(0);
            setInputs({...inputs,number: ''});
            setIsAttempts(true);
        }

        updateDrawParameters(JSON.stringify(parameters))
        }
    }, [drawDetails]);

    useEffect(() => {
        if(JSON.parse(drawParameters).assignation){
            setIsAttempts(false);
        } else {
            setIsAttempts(true);
        }
    },[drawParameters]);

    useEffect(() => { 

        if(JSON.parse(drawParameters).total_attempts > 0){
            setInputs({...inputs, number:JSON.parse(drawParameters).total_attempts});
            setCurrentAttempts(JSON.parse(drawParameters).current_attempts);
            setAttempts(JSON.parse(drawParameters).current_attempts);
        }
    },[drawParameters])

    useEffect(() => {
        if(JSON.parse(drawDetails).tickets_winner.every(item => item.complete === true)){
            setIsComplete(true);
        }

        return () => {
            setIsComplete(false);
        }
    },[drawDetails])
    
    return (
        <>
        <Loader loading={loadingComplete} />
        <ConfirmDialog 
            open={openAll}
            handleClose={() => setOpenAll(false)}
            title={'¿Esta seguro de restablecer todo el sorteo?'}
            info={false}
            msgBtnCancel="Regresar"
            msgBtnConfirm="Restablecer"
            size="xl"
            handleConfirm={restartAllParameters}
        >
            <Alert status='warning'>
                <AlertIcon />
                Al restablecer todos los parámetros, boletos ganadores y descartados se perderá el avance hasta el momento.
            </Alert>
        </ConfirmDialog>

        <ConfirmDialog 
            open={openSorter}
            handleClose={() => setOpenSorter(false)}
            title={'¿Esta seguro de completar el sorteo?'}
            msgBtnCancel="Regresar"
            msgBtnConfirm="Aceptar"
            size="xl"
            handleConfirm={completeRaffle}
        >
            <Alert status='info'>
                <AlertIcon />
                Al completar la rifa se enviaran los correos electrónicos a los ganadores y los a los concursantes con los detalles del sorteo.
            </Alert>
        </ConfirmDialog>

            <div className="w-[24rem] h-[30rem] ps-8">
                <div className="w-full h-full border-2 border-indigo-950 rounded-xl flex flex-col">
                    <h2 className="text-center text-indigo-950 border-b-2 border-b-indigo-950 py-2 font-bold
                    rounded-tr-xl rounded-tl-xl bg-gray-100
                    ">Parámetros de sorteo</h2>
                    <div className="w-full p-2 border-b-2 border-b-black/25">
                        <p className="text-md text-primary text-center"> {ticketSelected ? ticketSelected.title : '?'} - Seleccionado </p>
                    </div>
                    <Alert status='info' marginTop={2}>
                    <AlertIcon />
                    <Box>
                        <AlertTitle fontSize={'0.75rem'}>Informativo!</AlertTitle>
                        <AlertDescription>
                            <p className="text-[0.75rem] text-justify">
                                Este parámetro indica las veces que puede descartar un boleto hasta que el ultimo intento sea el ganador.
                                <br />
                                <span className="text-red-900">El valor no puede ser mayor a 5</span>
                            </p>
                        </AlertDescription>
                    </Box>
                    </Alert>
                    <div className="w-full px-2 mt-2 flex-grow flex flex-col">
                    <Form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                        <div className="p-4">
                            <FormControl isDisabled={!isAttempts} isRequired>
                                    <FormLabel marginBottom={0} textAlign={'center'} fontSize={'1rem'} fontWeight={'bold'}>
                                        Intentos para el ganador
                                    </FormLabel>
                                    <Input margin='auto'
                                        display={'block'}
                                        width={'8rem'}
                                        fontSize={'1rem'}
                                        height={50}
                                        className="shadow"
                                        name="number"
                                        value={inputs.number}
                                        onInput={handleInput}
                                        placeholder="Ejemplo: 3"
                                        />
                            </FormControl>
                        </div>
                        <div className="flex-grow flex flex-col justify-end">
                            <div className="flex justify-center p-2 gap-2">
                                    <AppButton className="" type="submit" leftIcon={<FaSave className="text-md -mt-1" />}
                                        isDisabled={inputs.number === ''  || !isAttempts || ticketSelected === null}
                                    >
                                        <span className="text-sm">Guardar</span>
                                    </AppButton>
                                    <Button  leftIcon={<MdOutlineRocketLaunch className="text-md -mt-1" />}
                                    variant={'outline'}
                                    isDisabled={isAttempts || JSON.parse(drawParameters).final || isClickAttempt}
                                    className="px-8" colorScheme="green" onClick={clickAttempts}> 
                                        { JSON.parse(drawParameters).current_attempts + 1  > JSON.parse(drawParameters).total_attempts ? '?'  :  JSON.parse(drawParameters).current_attempts + 1} Intento
                                    </Button>
                            </div>
                            <div className="flex justify-center p-2 gap-2  flex-wrap">
                                <Button  onClick={restartParameters} isDisabled={isAttempts} leftIcon={<MdRestore className="text-md -mt-1" />}
                                    className="px-8" colorScheme="purple"> 
                                        Restablecer
                                    </Button>
                                    <Button isDisabled leftIcon={<BsXbox className="text-md -mt-1" />}
                                    className="px-8" colorScheme="facebook"> 
                                        Simulación
                                    </Button>
                                    <Button onClick={() => setOpenAll(true)} isDisabled={!isComplete}  leftIcon={<FaTrashRestore className="text-md -mt-1" />}
                                    className="px-8" colorScheme="red"> 
                                        Restablecer todo
                                    </Button>
                            </div>
                            <div className="w-full">
                                <Button onClick={() => setOpenSorter(true)} isDisabled={!isComplete}  leftIcon={<FaCheck className="text-md -mt-1" />}
                                    className="px-8 w-full my-2" colorScheme="green"> 
                                        Completar sorteo
                                    </Button>
                            </div>
                        </div>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Parameters;