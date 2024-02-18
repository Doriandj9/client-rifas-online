import { Card, CardHeader, CardBody, CardFooter,Stack ,Heading,Text,Divider, ButtonGroup, Button,
    Image

} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { FaMoneyBillAlt } from "react-icons/fa";
import { useFetch } from '../../utilities/hooks/data/useFetch';
import { withAPIFeedbackTable } from '../../utilities/web/withFeedback';
import AppButton from './AppButon';
import { credentials } from '../../config/app';
import logoRaffle from '@app/assets/imgs/biglietti-lotteria.png';
import { BsFillGiftFill } from "react-icons/bs";
import { lottieOptions } from '../../utilities/web/configs';
import empty from '@app/assets/imgs/animations/empty.json';
import Lottie from 'react-lottie';
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import routesweb from '../../config/routesweb';
import { formatTimeFull } from '../../utilities/web/times/formatTimeFull';


const AppCard = ({url,options={} }) => {
  const {data,error,loading,refetch} = useFetch(url,options,'data');
  const FillCardWithFeedback = withAPIFeedbackTable(TotalCards);
    return (
        <>
                <FillCardWithFeedback {...{data:{data}}} hasError={error} isLoading={loading} type='card'  />
        </>
    );
}

const TotalCards = ({data}) => {
    
    return (
        <>
            {
                data.length > 0 ? 
                <>
                {
                    data.map((item, i) => {
                        return (
                            <CardApp key={i} item={item} />
                        )
                    })
                }
                <div className='absolute bottom-[-50px] md:bottom-0 left-0 w-full flex justify-center gap-12'  >
                        <div className='shadow-sm shadow-primary px-8 rounded-lg hover:shadow-lg hover:shadow-primary'>
                        <GiPreviousButton title=' Anterior' className='text-5xl text-primary cursor-pointer hover:text-green-500 ease-in-out duration-500' />
                        </div>
                        <div className='shadow-sm shadow-primary px-8 rounded-lg hover:shadow-lg hover:shadow-primary '>
                            <GiNextButton title='Siguiente' className='text-5xl text-primary cursor-pointer hover:text-green-500 ease-in-out duration-500' />
                        </div>
                </div>
                </>
                :
                <EmptyData />
                
            }
        </>
    );
}

const CardApp = ({item}) => {
    const [moreText, setMoreText] = useState(item.description);
    const lengthText = 140;
    const navigate = useNavigate();
    useEffect(() => {
        if(moreText.length > lengthText) {
            const text = moreText.substring(0,lengthText) + '...';
            setMoreText(text);
        }

    },[])
    const handleClick = () =>{
        setMoreText(item.description);
    } 
    const handleClickDismuis = () => {
        const text = moreText.substring(0,lengthText) + '...';
        setMoreText(text);
    }

    const handlePayment = (e,item) => {
        const url = '/' + routesweb.pay_raffles.replace(':id', item.id);
        navigate(url);
    }

    return (
        <>
        <Card className='w-72 card-animate' >
        <CardBody> 
            <Image 
            src={item.logo_raffles !== 'logo-raffle.png' ? `${credentials.server}${item.logo_raffles}` : logoRaffle}
            width={'15.625rem'}
            height={'15.5rem'}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading size='sm'>{item.name}</Heading>
            <Text className='text-xs'>
               {moreText}
                { moreText !== item.description  && <button className='text-black/50' onClick={handleClick}>(Ver más)</button>}
                { (moreText === item.description && lengthText < item.description.length ) && <button className='text-black/50' onClick={handleClickDismuis}>(Ver menos)</button>}
                             
            </Text>
            <Heading size='sm'>Premios</Heading>
                <ul>
                    { JSON.parse(item.awards).map((award,i) => {

                        return (
                            <li key={i} className='flex gap-2'>
                                <BsFillGiftFill className='w-4 h-4 text-yellow-500' />
                                {award.description}
                            </li>
                        );
                    }) }
                </ul>
            <Text className='text-secondary font-bold text-center' fontSize='lg'>
                Valor del boleto <span className='text-2xl'> { Number(item.price).toFixed(2) ?? 0}$ </span> 
            </Text>
            <Text className='text-primary font-bold text-center' fontSize='lg'>
                {formatTimeFull(item.draw_date)}
            </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter justifyContent='center'>
                {/* <Button className="mb-2"  colorScheme="facebook" leftIcon={<FaMoneyBillAlt />}> Comprar </Button>     */}
                <AppButton onClick={(e) => handlePayment(e, item)}
                className='mb-2' leftIcon={<FaMoneyBillAlt />} >
                    Comprar
                </AppButton>
        </CardFooter>
        </Card>
        </>
    );

}


const EmptyData = () => {

    return (
        <>
        <div className='flex flex-col gap-4 justify-center w-full items-center'>
                <Lottie options={{animationData: empty, ...lottieOptions}}  width={200} height={200} />
                <h2 className='text-secondary'>
                    ! OH NO DE MOMENTO NO DISPONEMOS DE RIFAS !
                </h2>
        </div>
        <div className='flex flex-col gap-4 justify-center w-full items-center'>
                <Lottie options={{animationData: empty, ...lottieOptions}}  width={200} height={200} />
                <h2 className='text-secondary'>
                    ! OH NO DE MOMENTO NO DISPONEMOS DE RIFAS !
                </h2>
        </div>
        <div className='flex flex-col gap-4 justify-center w-full items-center'>
                <Lottie options={{animationData: empty, ...lottieOptions}}  width={200} height={200} />
                <h2 className='text-secondary'>
                    ! OH NO DE MOMENTO NO DISPONEMOS DE RIFAS !
                </h2>
        </div>
        <div className='flex flex-col gap-4 justify-center w-full items-center'>
                <Lottie options={{animationData: empty, ...lottieOptions}}  width={200} height={200} />
                <h2 className='text-secondary'>
                    ! OH NO DE MOMENTO NO DISPONEMOS DE RIFAS !
                </h2>
        </div>
        </>
    );
}

export default AppCard;