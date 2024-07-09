import Lottie from "react-lottie";
import start from '@app/assets/imgs/animations/start.json';
import { lottieOptions } from "../app/utilities/web/configs";
import ComponentMUI from "../app/app_components/Core/ComponentMUI";
import { Rating } from "@mui/material";
import { useState } from "react";
import { Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import Comments from "./Comments";
import { useFetch } from "../app/utilities/hooks/data/useFetch";
import { credentials } from "../app/config/app";
import routesapi from "../app/config/routesapi";
import { useEffect } from "react";

const url = credentials.server + routesapi.rating;

const ReviewHayu = () => {
    const option2 = {...lottieOptions, loop: 8}
    const [value, setValue] = useState(0);
    const {data, error, loading} = useFetch(url,{method: 'GET'},'data');

    useEffect(() => {
        if(data && data.length > 0){
            const value = data.length;
            let suma = 0;
            data.forEach((item) => {
                suma += parseFloat(item.calification);
            })
            const textValue = (suma / value).toFixed(1);
            const partial = textValue.split('.');
            let valueFinal = 0;
            if(partial.length > 1){
                const numberInt = partial[0];
                valueFinal = parseInt(numberInt) >= 5 ? 5 : parseFloat(numberInt + '.5');
            } else {
                valueFinal = parseInt(partial[0]);
            }
            
            setValue(valueFinal);
        }
    },[data])
    
    return (
        <>
        <div className="flex w-full mt-6 relative">  
            <iframe width="300" height="180" src="https://www.youtube.com/embed/W_oVH-iNUyI?si=5YzgmOqNN9rAEz-f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <div className="flex-grow">
                    <h2 className="title-dynamic italic text-md font-black text-center relative">
                    <span className="uppercase">Reseñas de los clientes</span>
                        <div className="absolute top-0 left-0">
                        <Lottie  options={{animationData: start, ...option2}}  width={25} height={25} />
                        </div>   
                        <div className="absolute top-0 right-0">
                        <Lottie  options={{animationData: start, ...option2}}  width={25} height={25} />
                        </div>  
                    </h2>
                    <div>
                        <p className="text-xs p-2 text-justify">
                            Para nosotros es muy importante tu confianza, 
                             puedes calificarnos a tu gusto cada vez que compres un
                             boleto en tu plataforma de rifas <span className="font-semibold italic" >Hayu24</span> con la seguridad y confianza que te mereces.
                        </p>
                        <ComponentMUI>
                            <div className="flex justify-center">
                                <Stat className="pl-3 flex justify-center">
                                    <StatLabel className="text-center"><span className="text-primaryop-900 italic">Calificación de clientes</span></StatLabel>
                                    <StatNumber>
                                        <div className="flex items-center gap-1 flex-wrap">
                                            <span className="text-md mt-[0.15rem] italic font-normal">{value}</span>
                                            <Rating
                                                name="read-only"
                                                value={value}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </div>
                                    </StatNumber>
                                    <StatHelpText>
                                    <span className="text-sm text-primary italic">{data?.length} Clientes satisfechos</span>
                                    </StatHelpText>
                                </Stat>

                            </div>
                        </ComponentMUI>
                    </div>
            </div>
        </div>
        <div className="flex-grow w-full text-primary">
            <h3 className="mt-2 text-md text-start text-black font-bold">{data.filter((item) => item.status === 'AC').length} Opiniones de los clientes</h3>
            <hr />
            <section className="h-48 overflow-y-auto">
                {data && data.length > 0 && data.filter((item) => item.status === 'AC').map((item) => (<Comments key={item.id} rating={item} />))}
            </section>
        </div>            
        </>
    );
}

export default ReviewHayu;