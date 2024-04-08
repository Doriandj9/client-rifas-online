import AppTable from "../../../../app/app_components/Core/AppTable";
import { credentials } from "../../../../app/config/app";
import routesapi from "../../../../app/config/routesapi";
import { useAccessToken } from "../../../../app/store/app/userStore";
import { useFetch } from "../../../../app/utilities/hooks/data/useFetch";
import TableHelper from "./TableHelper";
import actions from './Actions';
import { useState } from "react";
import AppModal from "../../../../app/app_components/Core/AppModal";
import { FaCheckCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import { Avatar, Button, useToast } from "@chakra-ui/react";
import { IoLogoWhatsapp } from "react-icons/io";
import Loader from "../../../../app/app_components/Core/Loader";
import { fetchQuery } from "../../../../app/utilities/web/fetchQuery";
import ConfirmDialog from "../../../../app/app_components/Core/ConfirmDialog";
import { toastConfig } from "../../../../app/utilities/web/configs";
import {Alert, AlertIcon} from '@chakra-ui/react';

let url = credentials.server + routesapi.raffle_commissions;
 
const App = ( ) => {
    const key = useAccessToken(state => state.token);
    //states
    const [pagePaginate,setPagePaginate] = useState(1);//pagination
    const [mAccept,setMAccept] = useState(false);
    const [oAccept, setOAccept] = useState({});
    const [loadingFetch,setLoadingFetch] = useState(false);
    const [errorFetch,setErrorFetch] = useState(null);
    const [mDown, setMDown] = useState(false);
    const [mSellerPos,setMSellerPos] = useState(false);
    const [desicisionSPOS,setDesicisionSPOS] = useState(false);

    const toast = useToast(toastConfig);

 
    let {columns,actionColumns} = TableHelper.data();
   actions[0].onclick = (item,i) => (e) => {
        if(item.status === 'AC'){
            toast({
                title: 'Informativo',
                description: 'No puede validar la afiliación mas de una vez.',
                status: 'info'
            })
            return;
        }
        setOAccept(item);
        setMAccept(true);
   } 
   actions[1].onclick = (item,i) => (e) => {
    setOAccept(item);
    setDesicisionSPOS(true);
    setMSellerPos(true);
   }
   actions[2].onclick = (item,i) => (e) => {
    setOAccept(item);
    setDesicisionSPOS(false);
    setMSellerPos(true);
   }
   actions[3].onclick = (item,i) => (e) => {
    setOAccept(item);
    setMDown(true);
   } 
   //actualizar funciones
   actionColumns.list = actions;

    const { data, error, total, loading,refetch} = useFetch(url,{method: 'GET'},'data',true,key,[pagePaginate],true,pagePaginate)//pagination

    const handleOption = async (e,option) => {
        setLoadingFetch(true);
        const urlUp = url + '/' + oAccept.id;

        try {
            const response = await fetchQuery(key,urlUp,{method: 'PATCH',body: new URLSearchParams({status: option})},setLoadingFetch,setErrorFetch);
            
            if(!response.status){
                throw Error(response.message);
            }

            toast({
                title: 'Actualización',
                description: 'Se actualizo con éxito el registro.',
                status: 'success'
            });
            refetch();
            setMDown(false);
        } catch (e) {
            toast({
                title: 'Error',
                description: e.message,
                status: 'error'
            });
        } finally {
            setLoadingFetch(false);
        }
    }

    const handleSellerPos = async (e,option) => {
        setLoadingFetch(true);
        const urlUp = url + '/' + oAccept.id;

        try {
            const response = await fetchQuery(key,urlUp,{method: 'PATCH',body: new URLSearchParams({seller_pos: option})},setLoadingFetch,setErrorFetch);
            
            if(!response.status){
                throw Error(response.message);
            }

            toast({
                title: 'Actualización',
                description: 'Se actualizo con éxito el registro.',
                status: 'success'
            });
            refetch();
            setMSellerPos(false);
        } catch (e) {
            toast({
                title: 'Error',
                description: e.message,
                status: 'error'
            });
        } finally {
            setLoadingFetch(false);
        }
    }
    
    return (
        <>
        <Loader loading={loadingFetch} />
            {oAccept.id &&
                <AppModal isOpen={mAccept} header={<HeaderModal />}
                scrollBehavior='inside'
                buttons={<Buttons obj={oAccept} refetch={refetch} setCloseModal={setMAccept} toast={toast} token={key} />}
                 onClose={() => setMAccept(false)}
                 size='3xl'
                >
                <div className="bg-primary p-4">
                <div className="flex justify-center">
                 <Avatar className="cursor-pointer" name={oAccept.user.first_name.split(' ')[0] + ' ' + oAccept.user.last_name.split(' ')[0]} 
                 size={'2xl'} src={credentials.server + oAccept.user.avatar} />
                </div>
                <div className="flex gap-4 items-center bg-black/30 p-2 relative mt-4">
                    <FaUser className="w-6 h-6 text-white" />
                    <span className="text-white mt-1">{oAccept.user.first_name} {oAccept.user.last_name}</span>
                </div>
                <div className="flex gap-4 items-center bg-black/30 p-2 relative mt-2">
                    <PiIdentificationBadgeFill className="w-7 h-7 text-white" />
                    <span className="text-white mt-1">{oAccept.user.taxid}</span>
                </div>
                <div className="flex gap-4 items-center bg-black/30 p-2 relative mt-2">
                    <IoLogoWhatsapp className="w-6 h-6 text-white" />
                    <span className="text-white mt-1">{oAccept.user.taxid}</span>
                </div>
                <div className="p-4">
                        {
                            oAccept.user.verify_photo ? <a target="__blank"
                            href={credentials.server + oAccept.user.verify_photo}>
                                <img className="block w-full shadow max-h-[25rem]"
                                src={credentials.server + oAccept.user.verify_photo} alt="auth" />
                            </a> 
                            : 
                            <div className="font-bold text-secondary">
                                No se ha registrado la imagen de verificación.
                            </div>
                        }
                        
                </div>
            </div>

                </AppModal>
            }
            <ConfirmDialog open={mDown} handleClose={() => setMDown(false)} 
             title={'Esta seguro de dar baja la afiliación.'}
             handleConfirm={(e) => handleOption(e,'CL') }
             info={false}
             msgBtnCancel="Regresar"
             msgBtnConfirm="Dar de Baja"
            >
            ¿ Desea continuar con la cancelación ?
            </ConfirmDialog>
            {/* Dialog for accept a user is seller pos */}
            <ConfirmDialog 
            title={desicisionSPOS ? 'Esta seguro de permitir ventas físicas.' : 'Esta seguro de retirar los permisos de ventas físicas.' }
            open={mSellerPos}
            handleClose={() => setMSellerPos(false)}
            handleConfirm={(e) => handleSellerPos(e,desicisionSPOS)}
            info={ desicisionSPOS }
            msgBtnCancel="Regresar"
            msgBtnConfirm={desicisionSPOS ? 'Dar Permisos' : 'Retirar Permisos'}
            size="xl"
            >
                {
                    desicisionSPOS ? 
                    <div>
                    <p>
                        Esta sección le permite confirmar que un afiliado puede realizar 
                        ventas físicas de boletos. <br />
                    </p>
                    <Alert status='warning'>
                        <AlertIcon />
                        Toda acción que realice en este proceso se realizara bajo su bajo responsabilidad.
                    </Alert>
                    </div>

                    :
                    <div>
                    <p>
                        
                    </p>
                    <Alert status='warning'>
                        <AlertIcon />
                        Toda acción que realice en este proceso se realizara bajo su bajo responsabilidad.
                    </Alert>
                    </div>
                }
            </ConfirmDialog>
            <AppTable actionColumns={actionColumns} columns={columns} data={data} error={error} loading={loading} refetch={refetch}
             total={total} setPagePaginate={setPagePaginate} pagePaginate={pagePaginate} 
              />
        </>
    );
}

const HeaderModal = () => {

    return (
        <>
            <div className="flex gap-2">
                <FaCheckCircle className="w-6 h-6 text-primary" />
                Verificación de afiliación
            </div>
        </>
    );
}

const Buttons = ({refetch,obj,setCloseModal, toast,token}) => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const urlUp = url + '/' + obj.id;
    
    const handleOption = async (e,option) => {
        setLoading(true);
        try {
            const response = await fetchQuery(token,urlUp,{method: 'PATCH',body: new URLSearchParams({status: option})},setLoading,setError);
            if(!response.status){
                throw Error(response.message);
            }

            toast({
                title: 'Actualización',
                description: 'Se actualizo con éxito el registro.',
                status: 'success'
            });
            refetch();
            setCloseModal(false);

        } catch (e) {
            toast({
                title: 'Error',
                description: e.message,
                status: 'error'
            });
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Loader loading={loading} />
            <div className="flex gap-4">
                <Button onClick={(e) => handleOption(e,'CL')} colorScheme="red">
                    Negar Afiliación
                </Button>
                <Button onClick={(e) => handleOption(e,'AC')}   colorScheme="green">
                    Confirmar Afiliación
                </Button>
            </div>
        </>
    );
}

export default App;