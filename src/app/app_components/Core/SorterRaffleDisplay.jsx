import { credentials } from "../../config/app";
import logoRaffle from '@app/assets/imgs/biglietti-lotteria.png';

import AppButton from "./AppButon";
import { Avatar, Badge, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { ImInfo } from "react-icons/im";
import { formatTimeDate } from "../../utilities/web/times/formatTimeFull";
import { HiRocketLaunch } from "react-icons/hi2";
import moment from "moment";
import { useEffect, useState } from "react";

const SorterRaffleDisplay = ({raffle, handleClick}) => {
    const currentDate = moment();
    const drawDate = moment(raffle.draw_date);
    const drawDateDiff = moment(raffle.draw_date).subtract(30, 'minutes');
    let disabled = false;
   
    if(currentDate.isAfter(drawDateDiff) && currentDate.isBefore(drawDate)){
        disabled= false;
    }

    const [disabledButton, setDisabledButton] = useState(disabled);

    useEffect(() => {

        const timer = setInterval(() => {
        const currentDate = moment()
            if(currentDate.isAfter(drawDateDiff) && currentDate.isBefore(drawDate)){
                setDisabledButton(false);
            }
        },1000)

        return () => {
            clearInterval(timer)
        }

    },[])


    return (
        <>
            <div className="flex w-auto shadow-md gap-2 items-center rounded-xl">
                <div className="p-2">
                    <img
                      src={raffle.logo_raffles !== 'logo-raffle.png' ? `${credentials.server}${raffle.logo_raffles}` : logoRaffle}
                      className="w-26 h-20"
                        alt="Logo" />
                    <div className="mt-2">
                        <AppButton
                        isDisabled={disabledButton}
                         data-raffles-id={raffle.id}  onClick={handleClick} className="w-ful h-12" leftIcon={<HiRocketLaunch />}>
                            <span className="text-sm pointer-events-none">Iniciar sorteo </span>
                        </AppButton>
                    </div>
                </div>

                <div className="p-2">
                    <h2 className="font-bold">{raffle.name}</h2>
                    <p className="text-gray-500 text-xs w-40">
                        {raffle.description} 
                    </p>
                    <p className="text-center">
                    <Badge variant='subtle' colorScheme='blue'>
                        <span className="text-xs">Fecha y hora del sorteo</span> <br />
                        {raffle.draw_date}
                    </Badge>
                    </p>
                    <p><span className="text-sm">Boletos vendidos: </span> 
                    <Badge variant='outline' colorScheme='green'>
                        {raffle.purchased_tickets} / {raffle.number_tickets}
                    </Badge>
                    </p>
                    <p><span className="text-sm">Boletos restantes: </span> 
                    <Badge variant='outline' colorScheme='red'>
                        {raffle.unsold_tickets} / {raffle.number_tickets}
                    </Badge>
                    </p>
                    <p><span className="text-sm">Boletos pendientes: </span> 
                    <Badge variant='outline' colorScheme='yellow'>
                        {raffle.pending_tickets}
                    </Badge>
                    </p>
                </div>
            </div>
        </>
    );
}


export default SorterRaffleDisplay;