import AppTable from '@appcomponents/Core/AppTable';
import TableHelper from './TableHelperPayments';
import routesapi from '../../../../../app/config/routesapi';
import { credentials } from '../../../../../app/config/app';
import { useAccessToken, useAuth } from '../../../../../app/store/app/userStore';
import { useEffect, useState } from 'react';
import Modal from '../Modal/ModalPayment';
import { reloadTable } from '../../../../../app/utilities/events/customs';
import { ToastContainer,toast } from 'react-toastify';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useSetHeader } from '../../../../../app/utilities/hooks/web/useSetHeader';
import { useFetch } from '../../../../../app/utilities/hooks/data/useFetch';
import { FaInfoCircle } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import ConfirmDialog from '../../../../../app/app_components/Core/ConfirmDialog';
import { fetchQuery } from '../../../../../app/utilities/web/fetchQuery';
import Loader from '../../../../../app/app_components/Core/Loader';
import { useFetchFilter } from '../../../../../app/utilities/hooks/data/useFetchFilter';
import AppSearch from '../../../../../app/app_components/Core/AppSearch';
let actions = [
    {
        name: 'Información del comprobante de pago',
        icon: FaInfoCircle,
        color: 'yellow.700',
        element: null,
        onclick: () => {
            console.log('click | Editar');
        }
    },
    {
      name: 'Reenviar notificación electronica.',
      icon: MdMarkEmailRead,
      color: 'green.800',
      element: null,
      onclick: () => {
          console.log('click | Editar');
      }
  }
   ];


let url = credentials.server + routesapi.raffle_payments_receipts;
let urlReceipt= credentials.server + routesapi.raffle_payments_receipts_resend_mail;

const ListPayments = () => {
    const user = useAuth(state => state.user);
    const token = useAccessToken(state => state.token);
    const [pagePaginate,setPagePaginate] = useState(1);//pagination
    url = url.replace('{taxid}',user.taxid);
    const {data, error,loading, total, refetch,setData} = useFetchFilter(url,{method: 'GET'},'data',true,token,[pagePaginate],true,pagePaginate);

 //states 
 const [openModal,setOpenModal] = useState(false);
 const [idItem, setIdItem] = useState(null);
 const [objPayment, setObjPayment] = useState(null);
 const [mAlert, setMAlert] = useState(false);
 const [loadingMail,setLoadingMail] = useState(false);
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
 actions[1].onclick = (item,i) => () => {
  
  setObjPayment(item);
  setMAlert(true);
} 
 //actualizar funciones
 actionColumns.list = actions;
 //handlers
 const handleCloseModal = () => setOpenModal(false);
 const handleSaveModal = () => {
     document.dispatchEvent(reloadTable);
     setOpenModal(false);
 }

 const handleSendEmail = async () => {
    try {
      const objId = objPayment.id;
      const response = await fetchQuery(token,urlReceipt.replace('{receipt_id}',objId),{method: 'POST'},setLoadingMail,console.error);
      if(!response.status){
        throw Error(response.message);
      }

      setMAlert(false);

      setResultUpdate({
        status: true,
        message: 'Se envió correctamente la notificación al correo electrónico'
      });

    } catch (error) {
      setResultUpdate({
        status: false,
        message: error.message
      });
    } finally {
      setLoadingMail(false);
    }
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
     <Loader loading={loadingMail} />
     <ToastContainer className={'w-[32rem]'}  />
     <div className="min-h-[67vh]">
     <>
        {idItem && <Modal id={idItem} open={openModal} onClose={handleCloseModal} setUpdate={setResultUpdate} refetch={refetch} />}
        <AppTable actionColumns={actionColumns} columns={columns} data={data} error={error} loading={loading} refetch={refetch}
          total={total} setPagePaginate={setPagePaginate} pagePaginate={pagePaginate}
           />
     </>
     </div>
     <ConfirmDialog open={mAlert} handleClose={() => setMAlert(false)}
     handleConfirm={handleSendEmail}
     title={'Esta seguro de enviar la notificación al correo electrónico.'}
     info
     msgBtnCancel='Regresar'
     msgBtnConfirm='Enviar'
     size='xl'
     >
      Se reenviara la notificación de compra al correo electrónico del cliente,
      con el estado que fue administrado <span className='font-black'>(Aprobado, Rechazado)</span>.

     </ConfirmDialog>
     </>
  );
}


export default ListPayments;

