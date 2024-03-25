import { credentials } from "../../config/app";
import logoRaffle from '@app/assets/imgs/biglietti-lotteria.png';

import AppButton from "./AppButon";
import { Avatar, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { ImInfo } from "react-icons/im";
import { formatTimeDate } from "../../utilities/web/times/formatTimeFull";


const SolicitudeReserve = ({raffle, handleClick}) => {

    return (
        <>
            <div className="flex w-[22rem] shadow-md gap-2 items-center">
                <div className="p-2">
                    <img
                      src={raffle.logo_raffles !== 'logo-raffle.png' ? `${credentials.server}${raffle.logo_raffles}` : logoRaffle}
                      className="w-24 h-20"
                        alt="Logo" />
                </div>
                <div className="p-2">
                    <h2 className="font-bold">{raffle.name}</h2>
                    <p className="text-gray-500 text-xs w-40">
                        {raffle.description}
                        En beneficio de los más necesitados "Ayudemos a Ayudar". Envio de premios a los ganadores a cualquier parte del Ecuador
                    </p>
                    <div>
                        <AppButton data-raffles-id={raffle.id}  onClick={handleClick} className="w-16 h-12">
                            <span className="text-sm pointer-events-none"> Solicitar </span>
                        </AppButton>
                    </div>
                </div>
                <div className="w-12 h-full">
                    <div className="bg-primary text-white text-center text-sm">${raffle.price}</div>
                    <div className="bg-purple-950 text-white text-center text-sm mt-1">{(raffle.commission_sellers * 100)}%</div>
                    <div className="mt-4">
                    <Popover>
                    <PopoverTrigger>
                    <IconButton
                        colorScheme='yellow'
                        aria-label='Search database'
                        icon={<ImInfo />}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader className="flex gap-4 items-center">
                            Información
                            <div>
                                <Avatar className="cursor-pointer" name={raffle.user.first_name.split(' ')[0] + ' ' + raffle.user.last_name.split(' ')[0]} 
                                size={'sm'} src={credentials.server + raffle.user.avatar} />
                            </div></PopoverHeader>
                        <PopoverBody>
                            <div className="">
                               <span className="font-bold">Porcentaje de ganancia: </span>
                               <span className="text-purple-950"> {(raffle.commission_sellers * 100)}% </span>  
                            </div> 
                            <div className="">
                               <span className="font-bold">Precio del boleto: </span>
                               <span className="text-primary"> ${raffle.price} </span>  
                            </div>                 
                            <div className="">
                               <span className="font-bold">Organizador: </span>
                               <span> {raffle.user.first_name} {raffle.user.last_name} </span>  
                            </div>
                            <div className="">
                               <span className="font-bold">Fecha del sorteo: </span>
                               <span> {formatTimeDate(raffle.draw_date)} </span>  
                            </div>
                            
                        </PopoverBody>
                    </PopoverContent>
                    </Popover>
                    
                    </div>
                </div>
            </div>
        </>
    );
}


export default SolicitudeReserve;