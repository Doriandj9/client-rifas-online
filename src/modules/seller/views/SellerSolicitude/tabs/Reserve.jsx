import { useEffect, useState } from "react";
import SolicitudeReserve from "../../../../../app/app_components/Core/SolicitudeReserve";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useAccessToken, useAuth } from "../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import ModalSuccess from "../../../../../app/app_components/Core/ModalSuccess";
import ConfirmDialog from "../../../../../app/app_components/Core/ConfirmDialog";
import { Alert, AlertIcon, Skeleton, Stack, useToast } from "@chakra-ui/react";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import { toastConfig } from "../../../../../app/utilities/web/configs";
import Loader from "../../../../../app/app_components/Core/Loader";
import Lottie from "react-lottie";
import { lottieOptions } from '@app/app/utilities/web/configs';
import boxEmpty from '@app/assets/imgs/animations/box-empty.json';
import { Link } from "react-router-dom";
import routesweb from "../../../../../app/config/routesweb";


const url_base =  credentials.server  +  routesapi.seller_raffles;
const Reserve = () => {
    const key = useAccessToken(state => state.token);
    const user = useAuth(state => state.user);
    const [id,setId] = useState(null);
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [openModal,setOpenModal] = useState(false);
    const [commission, setCommission] = useState(null);
    const toast = useToast(toastConfig);
    const { data,loading:useloading, error:useerror, refetch } = useFetch(url_base,{method: 'GET'},'data',true,key);
    
    const closeConfirm = () => setOpen(false);

    const closeModal = () => setOpenModal(false);

    

    const handleConfirm = async () => {
        setLoading(true);
        const form = new FormData();
        form.append('raffles_id', id);
        try {
            const response = await fetchQuery(key,url_base,{method: 'POST',body: form},setLoading,setError);

            if(!response.status){
                throw Error(response.message);
            }
            setCommission(response.data);
            setOpenModal(true);
            refetch();            
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error'
            });

        }finally{
            setLoading(false);
            setOpen(false);
        }
    }

    const handleClick = (e) => {
        const raffleId = e.target.dataset.rafflesId;
        setId(raffleId);
        setOpen(true);
    }
    
    return (<>
    <Loader loading={loading} />
    <ModalSuccess open={openModal} handleClose={closeModal}>
    {
        commission &&
        <>
            <p className="text-justify">
                Se ha enviado correctamente tu solicitud de afiliación.
            </p>

            <p className="text-justify">
                Una vez que el organizador de la rifa acepte tu solicitud,
                podrás empezar a realizar ventas con el 
                <span className="font-bold"> código(xxx{commission.code.substring(-4)}). </span> 
                <br />
                Ademas dispondrás de un link para que puedas enviárselos a tus contactos y puedan realizar 
                la compra de boletos de manera mas fácil y rápida.
            </p>
            <p className="text-justify mt-5">
                Ingresa en la pestaña de <span className="text-primary font-bold"> Afiliaciones</span> ubicado en la parte superior para poder todas tus afiliaciones.
            </p>
        </>
    }
    </ModalSuccess>
    <div className="flex flex-wrap gap-4">
        <ConfirmDialog title='Esta seguro de solicitar afiliación.' open={open} handleClose={closeConfirm} handleConfirm={handleConfirm}  >
            <div>
            <Alert status='info'>
                <AlertIcon />
                Recuerde que en cualquier momento puede darse de baja de 
                esta afiliación.
            </Alert>
            </div>
        </ConfirmDialog>
        {data.length > 0 &&
            data.map((raffle) => {
                return <SolicitudeReserve key={raffle.id} raffle={raffle} handleClick={handleClick}/>
            } )
        }
    </div>
    {
            data.length <= 0 && !useloading &&
        <>
        <div>
            <h2 className="text-3xl font-black text-center text-primaryop-700 underline">Ver  mis     <Link to={'/dashboard/seller/solicitude/list'}>
                afiliaciones</Link></h2>
        </div>
        <Lottie  options={{animationData: boxEmpty, ...lottieOptions}}  width={400} height={400} />
        <div>
            <h4 className="text-xl text-primary font-black mt-4 text-center">De momento no existen posibles afiliaciones.</h4>
        </div>
        </>
        }
    {
        useloading &&
        <div className="flex gap-4 flex-wrap">
            <Skeleton width={350} height={180} />
            <Skeleton width={350} height={180} />
            <Skeleton width={350} height={180} />
            <Skeleton width={350} height={180} />
            <Skeleton width={350} height={180} />
            <Skeleton width={350} height={180} />
            <Skeleton width={350} height={180} />
        </div>
    }
    </>);
}

export default Reserve;