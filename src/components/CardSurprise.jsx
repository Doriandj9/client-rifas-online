import { useEffect, useState } from "react";
import { useDrawDetails, useDrawParameters, useIsAttempt, useRaffleStore, useTicketsRaffleStore } from "../app/store/app/raffleSorterStore";
import { credentials } from "../app/config/app";
import routesapi from "../app/config/routesapi";
import { useLocaleStorageFromDB } from "../app/utilities/hooks/data/useStorageFromDB";

let url = credentials.server  + routesapi.raffles_lottery;

const CardSurprise = ({index=null}) => {
    const {saveData, loading, error, success} = useLocaleStorageFromDB();
    const updateIsAttempt = useIsAttempt((state) => state.update);
    const drawParameters = useDrawParameters((state) => state.drawParameters);
    const raffle = useRaffleStore((state) => state.raffle);
    const drawDetails = useDrawDetails((state) => state.drawDetails);
    const updateDrawDetails = useDrawDetails((state) => state.update);
    const parameters = JSON.parse(drawParameters);
    const currentAttempts = parameters.current_attempts;
    const totalAttempts = parameters.total_attempts;
    const [value,setValue] = useState(null);
    const ticketsRaffle = useTicketsRaffleStore((state) => state.ticketsRaffle);
    const [ticketsSorter, setTicketsSorter] = useState(ticketsRaffle);
    const [finalAttempt, setFinalAttempt ] = useState(false);
    const [ticketRandom, setTicketRandom] = useState(null);
    const [ticketWinner, setTicketWinner] = useState(null); 
    const drawSelected = JSON.parse(drawParameters).draw;
    const drawDetailsData = JSON.parse(drawDetails); 
    const ticketsLost = drawDetailsData.tickets_discarded;

    const recursiveAttempt = (valor) => {
        const ticksLost = ticketsLost.find((item) => item.description.id === drawSelected.id);

        if(ticksLost && ticksLost.lost.some((item) => item.order === valor) || valor === 0){      
            return recursiveAttempt(Math.round(Math.random() * ticketsRaffle.length))
        } 
        const isUser = ticketsRaffle.find((item) => item.order === valor);
        if(!isUser.user){
            return recursiveAttempt(Math.round(Math.random() * ticketsRaffle.length));
        }

        return valor;
    }


    useEffect(() => {
        let interval = null;
        let time = null;
        const ticketWinner = drawDetailsData.tickets_winner.find((item) => item.description.id === drawSelected?.id);
        const ticksLost = ticketsLost.find((item) => item.description.id === drawSelected?.id);

        if(index === currentAttempts && ticketWinner && ticketWinner.complete === false && ticksLost.lost.length < currentAttempts){
            setFinalAttempt(false);
            updateIsAttempt(true);
            interval= setInterval(() => {
                let valor = recursiveAttempt(Math.round(Math.random() * ticketsRaffle.length));
                setValue(valor);
                setTicketRandom(ticketsRaffle.find((item) => item.order === valor));
            },500);
            time = setTimeout(() => {
                clearInterval(interval);
                setFinalAttempt(true);
                updateIsAttempt(false);
            },1000 * 6);
        }
        
    },[currentAttempts])

    useEffect(() => {
        if(finalAttempt && ticketRandom){
            if(currentAttempts === totalAttempts){
                const ticketsWinners = drawDetailsData.tickets_winner.map((item) =>{
                    if(item.description.id === drawSelected.id){
                        item.winner = ticketRandom;
                        item.complete = true;
                        item.selected = false;
                    }

                    return item;
                });
                let data = {...drawDetailsData};
                data.tickets_winner = ticketsWinners;
                saveData(`${url}/${raffle.id}`,raffle,JSON.stringify(data),'draw_details','details');
                //restablecer parámetros
                let params = {...parameters};
                params.total_attempts = 0;
                params.current_attempts = 0;
                params.draw = null;
                params.final = false;
                params.assignation = false;
                saveData(`${url}/${raffle.id}`,raffle,JSON.stringify(params),'draw_parameters','parameters');

            }else{
                const ticketsDescartes = drawDetailsData.tickets_discarded.map((item) =>{
                    if(item.description.id === drawSelected.id){
                        item.lost.push(ticketRandom);
                    }
                    return item;
                });
                let data = {...drawDetailsData};
                data.tickets_discarded = ticketsDescartes;
                saveData(`${url}/${raffle.id}`,raffle,JSON.stringify(data),'draw_details','details');
            }

        }
    },[ticketRandom,finalAttempt])
    
    return (
        <>
            <div className="w-56 h-64 bg-primary rounded-lg flex justify-center items-center">
                <span className="text-6xl text-white">
                    {value ? value : '?'}
                </span>
            </div>
        </>
    );
}


export default CardSurprise;