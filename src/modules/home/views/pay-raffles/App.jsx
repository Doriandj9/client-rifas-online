import Layout from '@app/app/layouts/Layout';
import { useFetch } from '../../../../app/utilities/hooks/data/useFetch';
import { Form, useParams } from 'react-router-dom';
import routesapi from '../../../../app/config/routesapi';
import { credentials } from '../../../../app/config/app';
import logoRaffle from '@app/assets/imgs/biglietti-lotteria.png';
import gift from '@app/assets/imgs/gifts.png';
import { BsFillCalendarDateFill } from "react-icons/bs";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { BsAwardFill } from "react-icons/bs";
import { FaMedal } from "react-icons/fa6";
import { useState } from 'react';
import { IoTicket } from "react-icons/io5";
import { FaMoneyBillAlt } from "react-icons/fa";
import PaymentTickets from './components/PaymentTickets';
import AppButton from '../../../../app/app_components/Core/AppButon';
import { useAuth } from '../../../../app/store/app/userStore';
import { Input, useToast } from '@chakra-ui/react';
import { toastConfig } from '../../../../app/utilities/web/configs';
import { fetchQuery, initialFetch } from '../../../../app/utilities/web/fetchQuery';
import Loader from '../../../../app/app_components/Core/Loader';
import Modal from './components/Modal';
import { FaTicketSimple } from "react-icons/fa6";
import { CiSaveDown2 } from "react-icons/ci";

const urlPayment = credentials.server + routesapi.public_payment_raffles;

const App = () => {
    const params = useParams();
    const user = useAuth(state => state.user);
    const toast = useToast(toastConfig);
    const [displayImg, setDImage] = useState(null);
    const [idImg, setIdImg] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [ticketsSaved, setTicketsSaved] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [messageModal, setMessageModal] = useState(null);
    const url = credentials.server + routesapi.public_raffles + `/${params.id}`
    const urlTickets = credentials.server  + routesapi.public_tickets_by_raffles.replace('{id}',params.id);
    const {data, error, loading,refetch} = useFetch(url,{method: 'GET'},null,false);
    const {data:tickets, error:ticketsError, loading:ticketsLoading,refetch:ticketsRefetch} = useFetch(urlTickets,{method: 'GET'},null,false);
    console.log(urlTickets);
    
    const handleImg = (e, img, item) => {
        e.preventDefault();
        e.stopPropagation();
        setIdImg(item.id);
        const x = e.clientX + 45;
        const y = e.clientY - 300;
        console.log(x);
        const element = <div onMouseLeave={handleImgRemove} 
        className={`w-96 h-96 shadow-lg fixed z-50 bg-white` }
        style={{top: `${y}px`, left:`${x}px`}}
        >
            <img src={img} alt="img" />
        </div>
        setDImage(element);
    }
    const handleImgRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDImage(null);
    }

    const handleSelectedTicket = (e,item) => {
        if(ticketsSaved.some(value => value === item.id)){
                setTicketsSaved([...ticketsSaved.filter(ticket => ticket !== item.id)]);
        }else {
            setTicketsSaved([...ticketsSaved,item.id]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(ticketsSaved.length <= 0){
            toast({
                title: 'Error',
                description: 'Por favor seleccione por lo menos un boleto para realizar la compra',
                status: 'error',
                duration: 2500
            })

            return;
        }
        setPaymentLoading(true);
        const form =new FormData(e.target);
        form.append('tickets',JSON.stringify(ticketsSaved));
        if(user && !form.has('email')){
            form.append('email',user.email);
        }
        const subtotal = (data.data.price * ticketsSaved.length)
        const iva = subtotal * (0);
        const total = (subtotal + iva);
        const amount = ticketsSaved.length;
        const single_price = data.data.price;

        form.append('subtotal', subtotal.toFixed(2));
        form.append('total', total.toFixed(2));
        form.append('amount', amount);
        form.append('single_price', single_price);

        try {
            const response =  await initialFetch(urlPayment,{method: 'POST', body: form});

            if(!response.status){
                throw Error(response.message);
            }
            setMessageModal(response.message);
            setOpenSuccess(true);
            ticketsRefetch();
            e.target.querySelectorAll('input')
            .forEach(input => input.value = '');
            setTicketsSaved([]);
        } catch (e) {
            toast({
                title: 'Error',
                description: e.message,
                status:'error',
                duration: 3500
            })
        } finally {
            setPaymentLoading(false);
        }

        
    }

    const handleCloseModal = () => {
        setOpenSuccess(false);
    }
    return (
        <>
            <Layout>
            <Loader loading={paymentLoading} />
            <Modal open={openSuccess} handleClose={handleCloseModal} message={messageModal}/>
            {data && data.status && 
            <section className="bg-white dark:bg-gray-900 ">
            <div className=" max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-18 lg:pt-32">
                
                <div className='flex gap-4 items-center pl-4 justify-center'>
                    <div className={`w-[30rem] h-[40rem] shadow-2xl rounded-3xl shadow-primary/50 p-6 relative`}  style={{backgroundImage: `url('${data.data.logo_raffles !== 'logo-raffle.png' ? credentials.server + data.data.logo_raffles : logoRaffle}')`}}>
                    
                        <div className=''>
                            <span> 
                                {data.data.price}$
                            </span>
                        </div>
                    </div>
                    <div className='max-h-[40rem] p-4 overflow-y-auto'>
                        <div className='flex items-center gap-2'>
                            <BsFillCalendarDateFill className='w-8 h-8' />
                            <span className='font-bold text-xl mt-2'>{data.data.draw_date}</span>
                        </div>
                        <div className='mt-2'> 
                            <h2 className='font-sans text-6xl text-primary font-black'>{data.data.name}</h2>
                        </div>
                        <div className='flex gap-2 items-center mt-2'>
                        <BsTicketPerforatedFill className='w-8 h-8' />  <span className='text-3xl mt-1 font-extrabold text-primary'>{data.data.number_tickets} Boletos</span>
                        </div>

                        <div>
                            <div className='flex items-center gap-2 mt-2'>
                                <BsAwardFill className='w-6 h-6 text-yellow-600' />
                                <h3 className='text-xl italic text-primary font-bold'>Se sortean los siguientes premios</h3>
                            </div>
                            <div>
                                <ul className='p-2'>
                                    {JSON.parse(data.data.awards).map(item => {
                                        const img = item.path !== '' ? credentials.server + item.path : gift;
                                        return (
                                            <li onMouseLeave={handleImgRemove}  key={item.id} className='flex gap-2 items-center'>
                                                <FaMedal  /> 
                                                <span> {item.title}: {item.description} </span>
                                                <img   onMouseEnter={(e) => handleImg(e,img, item)} className='w-8 h-8' src={img} alt="" />
                                                {displayImg && item.id === idImg ? displayImg : ''}
                                            </li>

                                        );
                                    })}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
            <div className="max-w-screen-xl px-4 pt-12 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-4 lg:pt-4">
                <div className='bg-primaryop-50 p-4'>
                    <h2 className='text-center text-primary font-black text-4xl mt-12'>Boletos disponibles</h2>
                    <p className='flex justify-center items-center gap-2'
                    > <span className='text-xl font-bold text-primaryop-700'>Tus boletos: </span>
                     <span className='text-xl font-black'> {ticketsSaved.length} </span>  <IoTicket className='w-6 h-6 text-yellow-500 -ml-1'  />  </p>
                     <p className='flex justify-center items-center gap-2'
                    > <span className='text-xl font-bold text-green-700'>Total: </span>
                     <span className='text-xl font-black'> ${(data.data.price * ticketsSaved.length).toFixed(2)} </span>  <FaMoneyBillAlt className='w-6 h-6 text-green-500 -ml-1'  />  </p>
                    <div className='p-4 bg-white w-full h-[32rem] rounded-2xl overflow-auto flex flex-wrap gap-2'>
                        {tickets && tickets.status && tickets.data.map((item,i) => {
                            console.log(item);
                            return (
                                <div key={item.id} onClick={(e) => handleSelectedTicket(e,item)}
                                className={`${ticketsSaved.some(value => value === item.id) ? 'bg-primary text-white' : 'text-black shadow'} 
                                ${item.user_taxid && item.is_buy ? 'bg-black text-white cursor-none pointer-events-none' : ''}
                                ${item.user_taxid && !item.is_buy ? 'bg-secondary text-white pointer-events-none' : ''}
                                font-semibold w-12 h-7 rounded-xl  cursor-pointer flex justify-center items-center`}>
                                        <span className='mt-1 text-sm'>{item.order}</span>     
                                </div>
                            );
                        })}
                    </div>
                    <div className='mt-8 bg-white p-4'>
                        <h3 className='text-center text-primary text-center font-black text-3xl mt-2'>Realiza el pago de tus boletos</h3>
                        <Form onSubmit={handleSubmit} className=''>
                            <Input type='hidden' name='raffles_id' value={data.data.id} />
                            <PaymentTickets tickets={ticketsSaved.length} price={data.data.price} total={(data.data.price * ticketsSaved.length).toFixed(2)} />
                            <div className='text-center w-full'>
                                <AppButton leftIcon={<CiSaveDown2 className='w-8 h-8 text-white' />} className='w-8/12 py-6 mt-6' type='submit' >
                                        <span className='mt-1'>Comprar mis boletos </span>
                                </AppButton>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            </section>    
            }
            </Layout>
        </>
    );
}

export default App;