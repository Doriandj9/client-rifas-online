import AppTable from "../../../../../app/app_components/Core/AppTable";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useAccessToken, useAuth } from "../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import TableHelper from "./TableHelper";
import actions from './Actions';
import { useState } from "react";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { Alert, AlertIcon, Box, Button, useToast } from "@chakra-ui/react";
import { FaCode } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { TbWorldCode } from "react-icons/tb";
import ConfirmDialog from "../../../../../app/app_components/Core/ConfirmDialog";
import { toastConfig } from "../../../../../app/utilities/web/configs";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import Loader from "../../../../../app/app_components/Core/Loader";
let url_comm = credentials.server + routesapi.seller_commissions_by_user;
let urlRCom= credentials.server + routesapi.seller_commissions;

const List = () => {
    const [mLink, setMLink] = useState(false);
    const [mDown, setMDown] = useState(false);
    const [mPay, setMPay] = useState(false);
    const [oLink, setOLink] = useState({});
    const [cMDown, setCMDown] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(false);

    const toast = useToast(toastConfig);

    const user = useAuth(state => state.user);
    const key = useAccessToken(state => state.token);
    url_comm = url_comm.replace('{taxid}',user.taxid);
    let {columns,actionColumns} = TableHelper.data();
   actions[0].onclick = (item,i) => (e) => {
    if(item.status !== 'AC') {
        toast({
            title: 'Informativo',
            description: 'No puede visualizar su código y link de ventas en un estado que no sea activo.',
            status: 'info',
            duration: 3000
        })
        return;
    }
    setOLink(item);
    setMLink(true);
   } 
   actions[1].onclick = (item,i) => (e) => {
    if(item.status === 'CL') {
        toast({
            title: 'Informativo',
            description: 'No puede darse de baja de una afiliación cancelada por el organizador.',
            status: 'info',
            duration: 3000
        })
        return;
    }

    if(item.status === 'DO') {
        toast({
            title: 'Informativo',
            description: 'No puede darse de baja mas de una vez.',
            status: 'info',
            duration: 3000
        })
        return;
    }

    setOLink(item);
    setMDown(true);
   } 
   actions[2].onclick = (item,i) => (e) => {
    // if(item.status === 'CL') {
        toast({
            title: 'Informativo',
            description: 'Se habilitara la confirmación de pago una vez que el sorteo de la rifa haya terminado.',
            status: 'info',
            duration: 3000
        })
        return;
    // }
   } 
   //actualizar funciones
   actionColumns.list = actions;


    const {data,error,loading,refetch} = useFetch(url_comm,{method: 'GET'},'data',true,key);

   const handleDown = () => {
    setCMDown(true);
   }

   const handleConfirm = async (e, option) => {
    setLoadingFetch(true);
    urlRCom = urlRCom + '/' + oLink.id;
    try {
        const response = await fetchQuery(key,urlRCom,{method: 'PATCH',body: new URLSearchParams({status: option})},setLoadingFetch,setErrorFetch);
        if(!response.status){
            throw Error(response.message);
        }

        toast({
            title: 'Actualización',
            description: 'Se actualizo con éxito el registro.',
            status: 'success'
        });
        refetch();
        setCMDown(false); 
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


   const handleCopy = async (e,text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                position: 'bottom-right',
                render: () => (
                  <Box color='white' p={3} bg='black'>
                    Texto copiado al portapapeles.
                  </Box>
                ),
              })
        } catch (e) {
            toast({
                position: 'bottom-right',
                status: 'error',
                render: () => (
                  <Box color='white' p={3} bg='red.500'>
                    Error al copiar el texto al portapapeles.
                  </Box>
                ),
              })
        }
   }

return (<>
        {oLink.id &&  
        <AppModal isOpen={mLink} onClose={() => setMLink(false)}  
        buttons={<>
            <Button onClick={() => setMLink(false)} colorScheme="green">
                Cerrar
            </Button>
        </>}
        size='xl'
        >
            <Alert status='success'>
                <AlertIcon />
                Esta sección te mostrara tu código único para 
                que realices ventas y ganar una comisión al igual que un
                link que puedes compartir entre tus clientes, para compras rápidas.
            </Alert>
            <div className="bg-primary p-4 mt-8">
                <div className="flex gap-4 items-center bg-black/30 p-2 relative">
                    <FaCode className="w-6 h-6 text-white" />
                    <span className="text-white mt-1">{oLink.code}</span>

                    <FaRegCopy onClick={(e) => handleCopy(e,oLink.code)}
                     className="w-6 h-6 text-white absolute
                     cursor-pointer
                     right-2 top-1/2 -translate-y-1/2" />
                </div>
                <div className="flex gap-4 items-center bg-black/30 p-2 relative mt-2">
                    <TbWorldCode className="w-6 h-6 text-white" />
                    <span className="text-white mt-1">{oLink.url}</span>

                    <FaRegCopy onClick={(e) => handleCopy(e,oLink.url)}
                     className="w-6 h-6 text-white absolute
                     cursor-pointer
                     right-2 top-1/2 -translate-y-1/2" />
                </div>
            </div>
        </AppModal> 
        }
        {oLink.id &&
        <>  
            <Loader loading={loadingFetch} />
            <ConfirmDialog handleClose={() => setMDown(false)} 
            open={mDown}
            info={false}
            msgBtnCancel="Regresar"
            msgBtnConfirm="Darme de Baja"
            handleConfirm={handleDown}
            title={'Esta seguro de darse de baja en esta afiliación'}> 
            Recuerde que no podrá volver a afiliarse a esta rifa. <br />
            <Alert status='warning'>
                <AlertIcon />
                Al darse de baja por su voluntad no podrá reclamar el pago 
                de sus comisiones.
            </Alert>
            </ConfirmDialog>

            <ConfirmDialog open={cMDown} handleClose={() => {
                setCMDown(false); setMDown(false);
            }} 
            handleConfirm={(e) => handleConfirm(e,'DO')}
            title={''}
            msgBtnCancel="Cerrar"
            msgBtnConfirm="Confirmar"
            >
                Desea continuar con la baja de la afiliación.
            </ConfirmDialog>
        </>
        } 
        <AppTable actionColumns={actionColumns} columns={columns} data={data} error={error} loading={loading} refetch={refetch} />
    </>)
}

export default List;