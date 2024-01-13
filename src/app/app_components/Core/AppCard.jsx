import { Card, CardHeader, CardBody, CardFooter,Stack ,Heading,Text,Divider, ButtonGroup, Button,
    Image

} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { FaMoneyBillAlt } from "react-icons/fa";
import { useFetch } from '../../utilities/hooks/data/useFetch';
import { withAPIFeedbackTable } from '../../utilities/web/withFeedback';
import AppButton from './AppButon';

const AppCard = ({url,options={} }) => {
  const {data,error,loading,refetch} = useFetch(url,options);
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
            {data.map((item, i) => {
                const {img,title, body,price} = item;
                return (
                    <CardApp img={img} title={title} description={body} price={price} key={item.id ?? i} />
                )
            })}
        </>
    );
}

const CardApp = ({img,title,description='',price}) => {
    const [moreText, setMoreText] = useState(description);
    const lengthText = 140;
    useEffect(() => {
        if(moreText.length > lengthText) {
            const text = moreText.substring(0,lengthText) + '...';
            setMoreText(text);
        }

    },[])
    const handleClick = () =>{
        setMoreText(description);
    } 
    const handleClickDismuis = () => {
        const text = moreText.substring(0,lengthText) + '...';
        setMoreText(text);
    }

    return (
        <>
        <Card className='w-72' >
        <CardBody>
            <Image 
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading size='sm'>{title}</Heading>
            <Text className='text-xs'>
               {moreText}
                { moreText !== description  && <button className='text-black/50' onClick={handleClick}>(Ver más)</button>}
                { (moreText === description && lengthText < description.length ) && <button className='text-black/50' onClick={handleClickDismuis}>(Ver menos)</button>}
                             
            </Text>
            <Text className='text-primary' fontSize='lg'>
                {price ?? 4}
            </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter justifyContent='flex-end'>
                {/* <Button className="mb-2"  colorScheme="facebook" leftIcon={<FaMoneyBillAlt />}> Comprar </Button>     */}
                <AppButton className='mb-2' leftIcon={<FaMoneyBillAlt />} >
                    Comprar
                </AppButton>
        </CardFooter>
        </Card>
        </>
    );

}

export default AppCard;