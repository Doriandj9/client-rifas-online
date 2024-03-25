import { useEffect, useState } from "react";
import AppTable from '@appcomponents/Core/AppTable';
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import {
  useAccessToken,
  useAuth,
} from "../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import TableHelper from "./TableHelper";
import { useToast } from "@chakra-ui/react";
import { toastConfig } from "../../../../../app/utilities/web/configs";
import { FaRegEdit } from "react-icons/fa";
import Modal from "./Modal/Modal";
import { MdDeleteOutline } from "react-icons/md";
import ModalDelete from "../../../../../app/app_components/Core/ModalDelete";
import Loader from "../../../../../app/app_components/Core/Loader";
import { reloadTable } from "../../../../../app/utilities/events/customs";
let actions = [
  {
    name: "Editar rifa.",
    icon: FaRegEdit,
    color: "blue.800",
    element: null,
    onclick: () => {
      console.log("click | Editar");
    },
  },
  {
    name: "Eliminar rifa.",
    icon: MdDeleteOutline,
    color: "red.800",
    element: null,
    onclick: () => {
      console.log("click | Editar");
    },
  },
];
const ListAccount = () => {
  const [pagePaginate,setPagePaginate] = useState(1);//pagination

    //hooks 
    const token = useAccessToken((state) => state.token);
    const user = useAuth(state => state.user);
   const [idItemDelete,setIdItemDelete] = useState(null);
   const [message,setMessage] = useState('');
   const [openDelete,setOpenDelete] = useState(false);
   const toast = useToast(toastConfig);
   const [loading, setLoading] = useState(false);
   const [error,setError] = useState(null);
    const url = credentials.server + routesapi.raffle_bank_accounts_by_user.replace('{user_id}',user.id);
    const { data, error:errorData, total, loading:loadingData,refetch} = useFetch(url,{method: 'GET'},'data',true,token,[pagePaginate],true,pagePaginate)//pagination

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
   actions[1].onclick = (item,i) => () => {
    setOpenDelete(true);
    setIdItemDelete(item.id);
    setMessage('Esta seguro de borrar su cuenta bancaria.');
   }
   //actualizar funciones
   actionColumns.list = actions;
   //handlers
   const handleCloseDelete = () => setOpenDelete(false);
   const handleCloseModal = () => setOpenModal(false);
   const handleSaveModal = () => {
       document.dispatchEvent(reloadTable);
       setOpenModal(false);
   }
   const handleDeleteItem = async () => {
    try{
      const url = credentials.server + routesapi.raffle_bank_accounts + `/${idItemDelete}`;
      const response  = await fetchQuery(token,url,{method: 'DELETE'},setLoading,setError);
      if(response.status){
        toast({
          title: 'Borrado',
          description: 'Se borro con éxito su cuenta bancaria.',
          status: 'success'
        });
        document.dispatchEvent(reloadTable);
        setOpenDelete(false);
        return;
      }

      throw Error(response.message);
    }catch(e){
      toast({
        title: 'Error',
        description: e.message,
        status: 'error'
      });
    }finally{
      setLoading(false);
    }
 }
  //effects
   useEffect(() => {
     if(resultUpdate.message !== ''){
       if(resultUpdate.status){
         toast({
          title: 'Actualización',
          description: resultUpdate.message,
          status: 'success'
         })
       }else{
         toast({
          title: 'Error',
          description: resultUpdate.message,
          status: 'error'
         });
       }
     }
   }, [resultUpdate])
   //jsx

  return (
    <>
    <Loader loading={loading} />
    {
        idItemDelete && (
          <ModalDelete open={openDelete} message={message} handleClose={handleCloseDelete} handleSave={handleDeleteItem} />
        )
      }
      {idItem && (
        <Modal
          id={idItem}
          open={openModal}
          onClose={handleCloseModal}
          setUpdate={setResultUpdate}
          refetch={refetch}
        />
      )}
      <AppTable actionColumns={actionColumns} columns={columns} data={data} error={errorData} loading={loadingData} refetch={refetch}
             total={total} setPagePaginate={setPagePaginate} pagePaginate={pagePaginate}
              />
    </>
  );
};

export default ListAccount;
