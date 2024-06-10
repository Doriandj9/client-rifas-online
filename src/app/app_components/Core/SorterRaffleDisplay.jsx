import { credentials } from "../../config/app";
import logoRaffle from '@app/assets/imgs/biglietti-lotteria.png';

import AppButton from "./AppButon";
import { Badge, Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ImInfo } from "react-icons/im";
import { formatTimeDate } from "../../utilities/web/times/formatTimeFull";
import { HiRocketLaunch } from "react-icons/hi2";
import moment from "moment";
import { useEffect, useState } from "react";
import { GiPodiumWinner } from "react-icons/gi";
import AppModal from "./AppModal";
import { BsFillInfoCircleFill } from "react-icons/bs";

const SorterRaffleDisplay = ({raffle, handleClick}) => {
    const currentDate = moment();
    const drawDate = moment(raffle.draw_date);
    const drawDateDiff = moment(raffle.draw_date).subtract(60, 'minutes');
    const [open, setOpen] = useState(false);
    let disabled = true;
   
    if(currentDate.isAfter(drawDateDiff) && currentDate.isBefore(drawDate)){
        disabled= false;
    }

    const [disabledButton, setDisabledButton] = useState(disabled);

    const awards = JSON.parse(raffle.draw_details);


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
           {
            raffle.is_complete &&
            <AppModal
            header={<>
                <div className="flex gap-2 items-center ">
                    <BsFillInfoCircleFill className="w-12 h-12 text-green-600" />
                    <h2 className="mt-2 text-primary italic ">Información de los ganadores de la rifa.</h2>
                </div>
            </>}
            isOpen={open}
            onClose={() => setOpen(false)}
            size='full'
            buttons={<>
                <Button onClick={() => setOpen(false)}
                colorScheme="facebook">
                        Entendido
                </Button>
            </>}
            >
            <TableContainer className="bg-slate-100 rounded-xl shadow">
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>Información general</TableCaption>
                <Thead>
                <Tr>
                    <Th>Nombre del ganador</Th>
                    <Th>Cédula</Th>
                    <Th>Nº de celular</Th>
                    <Th>Correo electrónico</Th>
                    <Th>Lugar del premio</Th>
                    <Th>Descripción</Th>
                </Tr>
                </Thead>
                <Tbody>
                {
                   awards && awards.tickets_winner.map((item,i) => {
                    if(!item.winner){
                        return null
                    }
                    return (<Tr key={i}>
                        <Td className="uppercase" >{item.winner.user.first_name}  {item.winner.user.last_name}</Td>
                        <Td className="uppercase" >{item.winner.user.taxid}</Td>
                        <Td className="uppercase" >{item.winner.user.phone}</Td>
                        <Td className="">{item.winner.user.email}</Td>
                        <Td className="uppercase" >{item.description.title}</Td>
                        <Td className="uppercase" >{item.description.description}</Td>
                    </Tr>)}
                    )
                }
                </Tbody>
            </Table>
            </TableContainer>
                
            </AppModal>
           } 
            <div className="flex w-auto shadow-md gap-2 items-center rounded-xl">
                <div className="p-2">
                    <img
                      src={raffle.logo_raffles !== 'logo-raffle.png' ? `${credentials.server}${raffle.logo_raffles}` : logoRaffle}
                      className="w-26 h-20"
                      alt="Logo" />
                    <div className="mt-2">
                        {
                        !raffle.is_complete ?
                        <AppButton
                        isDisabled={disabledButton || raffle.is_complete}
                         data-raffles-id={raffle.id}  onClick={handleClick} className="w-ful h-12" leftIcon={<HiRocketLaunch />}>
                            <span className="text-sm pointer-events-none">Iniciar sorteo</span>
                        </AppButton>
                        :
                        <Button colorScheme="yellow"
                        onClick={() => setOpen(true)}
                        className="w-ful h-12" leftIcon={<GiPodiumWinner />}>
                            <span className="text-sm pointer-events-none">Ganadores</span>
                        </Button>
                        }
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