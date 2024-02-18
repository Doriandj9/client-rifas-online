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
import ModalDelete from "../../../../../app/app_components/Core/ModalDelete";
import { MdDeleteOutline } from "react-icons/md";
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
const ListLottery = () => {
    //hooks 
    const token = useAccessToken((state) => state.token);
    const user = useAuth(state => state.user);
    const toast = useToast(toastConfig);
    const url = credentials.server + routesapi.raffles_list_raffles.replace('{taxid}',user.taxid);
   //states 
   const [openModal,setOpenModal] = useState(false);
   const [idItem, setIdItem] = useState(null);
   const [openDelete,setOpenDelete] = useState(false);
   const [idItemDelete,setIdItemDelete] = useState(null);
   const [message,setMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const [error,setError] = useState(null);
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
    setMessage('Esta seguro de borrar su rifa');
   }
   //actualizar funciones
   actionColumns.list = actions;
   //handlers
   const handleCloseModal = () => setOpenModal(false);
   const handleSaveModal = () => {
       document.dispatchEvent(reloadTable);
       setOpenModal(false);
   }

   const handleCloseDelete = () => setOpenDelete(false);

   const handleDeleteItem = async () => {
      try{
        const url = credentials.server + routesapi.raffles_lottery + `/${idItemDelete}`;
        const response  = await fetchQuery(token,url,{method: 'DELETE'},setLoading,setError);
        if(response.status){
          toast({
            title: 'Borrado',
            description: 'Se borro con éxito su rifa.',
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
      {idItem && (
        <Modal
          id={idItem}
          open={openModal}
          onClose={handleCloseModal}
          setUpdate={setResultUpdate}
        />
      )}
      {
        idItemDelete && (
          <ModalDelete open={openDelete} message={message} handleClose={handleCloseDelete} handleSave={handleDeleteItem} />
        )
      }
      <AppTable
        url={url}
        columns={columns}
        keyData="data"
        actionColumns={actionColumns}
        auth={true}
        token={token}
        paginate={true}
      />
    </>
  );
};

export default ListLottery;
