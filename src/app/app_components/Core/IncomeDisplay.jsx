import { credentials } from "../../config/app";
import logoRaffle from '@app/assets/imgs/biglietti-lotteria.png';

import AppButton from "./AppButon";
import { Avatar, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { ImInfo } from "react-icons/im";
import { formatTimeDate } from "../../utilities/web/times/formatTimeFull";


const IncomeDisplay = ({raffle, handleClick}) => {

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
                    </p>
                    <div>
                        <AppButton data-raffles-id={raffle.id}  onClick={handleClick} className="w-ful h-12">
                            <span className="text-sm pointer-events-none"> Solicitar Retiro </span>
                        </AppButton>
                    </div>
                </div>
                <div className="w-12 h-full">
                    {/* <div className="bg-primary text-white text-center text-sm">${raffle.price}</div> */}
                    <div className="bg-purple-950 text-white text-center text-sm mt-1">${raffle.income}</div>
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
                            <strong>Información</strong>
                            </PopoverHeader>
                        <PopoverBody>
                            Al soltar el retiro de tus ingreso de la rifa <strong>{raffle.name}</strong>,
                            la plataforma realizar la transacción a tu payphone en menos de 24 horas.
                        </PopoverBody>
                    </PopoverContent>
                    </Popover>
                    
                    </div>
                </div>
            </div>
        </>
    );
}


export default IncomeDisplay;