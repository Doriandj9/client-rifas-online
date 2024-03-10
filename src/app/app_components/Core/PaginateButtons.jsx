import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { application } from '../../config/app';
import { useEffect, useState } from 'react';
const PaginateButtons = ({total, page , setPage, raffles = false}) => {
    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(page);
    const pag = Math.ceil(total / (raffles ? application.paginateRaffles : application.paginateCount));
    let buttons = [];

    const handleClick = (e) => {
        const num = e.target.dataset.page;
        setPage(parseInt(num));

    }

        for(let i = 1; i <= pag; i++){
            buttons.push(
                <Button onClick={handleClick}
                key={i}
                isActive={i === page}
                data-page={i} colorScheme='blue'>{i}</Button>
            )
    
        }
    useEffect(() => {
        if(page === 1){
            setPrev(1);
        }else{
            setPrev( parseInt(page) - 1);
        }

        if(page === total ){
            setNext(total);
        }

        if(page < total){
            setNext(parseInt(page) + 1);
        }


        if(page > 1){
            setPage(page);
        }

    }, [page])

    // console.log('pag', prev, page, next);
    return (
        <>
            <ButtonGroup variant='outline' spacing='2'>
            <IconButton
                variant='outline'
                onClick={handleClick}
                colorScheme='blue'
                aria-label='Send email'
                data-page={prev}
                icon={<GrFormPrevious  className='pointer-events-none'/>}
                />
            {buttons.map((button) => (button))}
            <IconButton
                variant='outline'
                onClick={handleClick}
                colorScheme='blue'
                data-page={next}
                aria-label='Send email'
                icon={<GrFormNext className='pointer-events-none' />}
                />
            </ButtonGroup>
        </>
    );
}


export default PaginateButtons;