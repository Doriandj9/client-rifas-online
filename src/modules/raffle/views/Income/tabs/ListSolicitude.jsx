import AppTable from '@appcomponents/Core/AppTable';
import { FaRegEdit } from "react-icons/fa";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useAccessToken, useAuth } from "../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import TableHelper from "./TableHelper";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ConfirmDialog from '../../../../../app/app_components/Core/ConfirmDialog';
import { Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { toastConfig } from '../../../../../app/utilities/web/configs';
import { fetchQuery } from '../../../../../app/utilities/web/fetchQuery';
import Loader from '../../../../../app/app_components/Core/Loader';

let actions = [
    {
      name: "Eliminar Solicitud.",
      icon: MdDeleteOutline,
      color: "red.800",
      element: null,
      onclick: () => {
        console.log("click | Editar");
      },
    },
  ];

  let url = credentials.server + routesapi.raffles_me_income;
  let urlIncome = credentials.server + routesapi.raffles_income;

const ListSolicitude = () => {
    const [pagePaginate,setPagePaginate] = useState(1);//pagination
    const [openAlert, setOpenAlert] = useState(false);
    const [obj, setObj] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast(toastConfig);
    const user = useAuth((state) => state.user);
    const token = useAccessToken((state) => state.token);
    url = url.replace('{id}',user.id);
    const { data, error:errorData, total, loading:loadingData,refetch} = useFetch(url,{method: 'GET'},'data',true,token,[pagePaginate],true,pagePaginate)//pagination

   let {columns,actionColumns} = TableHelper.data();
   actions[0].onclick = (item,i) => () => {
       setObj(item);
       setOpenAlert(true);
   } 
   //actualizar funciones
   actionColumns.list = actions;

   const handleSubmit  = async () => {
        try {
            const response = await fetchQuery(token,`${urlIncome}/${obj.id}`,{method: 'DELETE'},setLoading,setError);

            if(!response.status){
                throw Error(response.message);
            }
            toast({
                title: 'Éxito',
                description: 'Se borro correctamente.',
                status: 'success'
            });
            refetch();
            setOpenAlert(false);
            setObj(null);
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                duration: 3500,
                status:'error'
            });
        } finally {
            setLoading(false);
        }
   }
    return (<>
        <Loader loading={loading} />
        <ConfirmDialog
        handleClose={() => {setObj(null); setOpenAlert(false)}}
        open={openAlert}
        title={'¿ Esta seguro de eliminar la solicitud ?'}
        msgBtnCancel='Cancelar'
        msgBtnConfirm='Eliminar'
        info={false}
        handleConfirm={handleSubmit}
        size='xl'
        >
            <Alert>
                <AlertIcon />
                Una vez que se elimine no podrá realizarse la transacción de retiro. <br />
            </Alert>
            Si tiene una solicitud de retiro de fondos en estado <strong>En proceso</strong> no se completara el 
            proceso de eliminación.
        </ConfirmDialog>
        <AppTable actionColumns={actionColumns} columns={columns} data={data} error={errorData} loading={loadingData} refetch={refetch}
                    total={total} setPagePaginate={setPagePaginate} pagePaginate={pagePaginate}
                    />
    </>);
}

export default ListSolicitude;