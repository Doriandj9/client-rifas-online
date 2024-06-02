
import AppTable from '@appcomponents/Core/AppTable';
import TableHelper from '../TableHelper';
import routesapi from '../../../../../app/config/routesapi';
import { credentials } from '../../../../../app/config/app';
import { useAccessToken, useAuth } from '../../../../../app/store/app/userStore';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { reloadTable } from '../../../../../app/utilities/events/customs';
import { ToastContainer,toast } from 'react-toastify';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useSetHeader } from '../../../../../app/utilities/hooks/web/useSetHeader';
import { useFetch } from '../../../../../app/utilities/hooks/data/useFetch';
let actions = [
    {
        name: 'Autorizar comprobante de pago',
        icon: FaFileInvoiceDollar,
        color: 'green.700',
        element: null,
        onclick: () => {
            console.log('click | Editar');
        }
    }
   ];

const AuthorizationPayments = () => {

  const [pagePaginate,setPagePaginate] = useState(1);//pagination

    //hooks 
    useSetHeader('Confirmar comprobantes de pago');
    const token = useAccessToken((state) => state.token);
    const user = useAuth(state => state.user);
    const url = credentials.server + routesapi.raffles_list_payment_confirm.replace('{taxid}',user.taxid);
    const { data, error, total, loading,refetch} = useFetch(url,{method: 'GET'},'data',true,token,[pagePaginate],true,pagePaginate)//pagination

    //states 
    const [openModal,setOpenModal] = useState(false);
    const [idItem, setIdItem] = useState(null);
    const [resultUpdate, setResultUpdate] = useState({
      status: null,
      message: ''
    })
    //code
    let {columns,actionColumns} = TableHelper.data();
    actions[0].onclick = (item,i) => () => {
        setOpenModal(true);
        setIdItem(item.id);
    } 
    //actualizar funciones
    actionColumns.list = actions;
    //handlers
    const handleCloseModal = () => setOpenModal(false);
    const handleSaveModal = () => {
        document.dispatchEvent(reloadTable);
        setOpenModal(false);
    }
   //effects
    useEffect(() => {
      if(resultUpdate.message !== ''){
        if(resultUpdate.status){
          toast.success(resultUpdate.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'p-8 w-full',
           })
        }else{
          toast.error(resultUpdate.message,{
            position: toast.POSITION.TOP_RIGHT,
            className: 'p-8 w-full',
        })
        }
      }
    }, [resultUpdate])
    //jsx


     return (
        <>
        <ToastContainer className={'w-[32rem]'}  />
        <div className="min-h-[67vh]">
        <>
           {idItem && <Modal id={idItem} open={openModal} onClose={handleCloseModal} setUpdate={setResultUpdate} refetch={refetch} />}
           <AppTable actionColumns={actionColumns} columns={columns} data={data} error={error} loading={loading} refetch={refetch}
             total={total} setPagePaginate={setPagePaginate} pagePaginate={pagePaginate}
              />
        </>
        </div>
        </>
     );
}

export default AuthorizationPayments;
