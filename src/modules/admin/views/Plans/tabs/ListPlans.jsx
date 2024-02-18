import AppTable from '@appcomponents/Core/AppTable';
import TableHelper from './TableHelper';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import routesapi from '../../../../../app/config/routesapi';
import { credentials } from '../../../../../app/config/app';
import { useAccessToken } from '../../../../../app/store/app/userStore';
import { useState } from 'react';
import Modal from './Modal/Modal';
import { Button, useToast } from '@chakra-ui/react';
import { reloadTable } from '../../../../../app/utilities/events/customs';
import ModalDelete from '../../../../../app/app_components/Core/ModalDelete';
import Loader from '../../../../../app/app_components/Core/Loader';
import { toastConfig } from '../../../../../app/utilities/web/configs';
import { fetchQuery } from '../../../../../app/utilities/web/fetchQuery';
let url = credentials.server + routesapi.admin_subscriptions;

let actions = [
    {
        name: 'Editar',
        icon: FiEdit,
        color: 'blue.800',
        element: null,
        onclick: () => {
            console.log('click | Editar');
        }
    }, {
        name: 'Borrar',
        icon: MdDelete,
        color: 'red.500',
        onclick: () => {
            console.log('click | Borrar');
        }
    }
   ];
const ListPlans = () => {
    //hooks 
    const token = useAccessToken((state) => state.token);
    const toast = useToast(toastConfig);
    //states 
    const [openModal,setOpenModal] = useState(false);
    const [idItem, setIdItem] = useState(null);
   const [message,setMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const [idItemDelete,setIdItemDelete] = useState(null);
   
   const [error,setError] = useState(null);
   
   const [openDelete,setOpenDelete] = useState(false);
   
   //code
    let {columns,actionColumns} = TableHelper.data();
    actions[0].onclick = (item,i) => () => {
        setOpenModal(true);
        setIdItem(item.id);
    } 
    actions[1].onclick = (item,i) => () => {
        setOpenDelete(true);
        setIdItemDelete(item.id);
        setMessage('Esta seguro de borrar el plan.');
       }
    actionColumns.list = actions;

    //handlers
    const handleCloseModal = () => {
        setOpenModal(false);
        setIdItem(null);
    };
    const handleSaveModal = () => {
        document.dispatchEvent(reloadTable);
        setOpenModal(false);
    }
    const handleCloseDelete = () => setOpenDelete(false);

    const handleDeleteItem = async () => {
        const urlDelete = url + '/' + idItemDelete; 
        try{
          const response  = await fetchQuery(token,urlDelete,{method: 'DELETE'},setLoading,setError);
          if(response.status){
            toast({
              title: 'Borrado',
              description: 'Se borro con éxito el plan.',
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
        } finally {
            setLoading(false);
        }
     }

    //effects

    //jsx
     console.log(toast);
    const buttons = <>
    <Button colorScheme='red' mr={3} onClick={handleCloseModal}>
        Cerrar
    </Button>
    <Button colorScheme='blue' onClick={handleSaveModal} >
        Guardar
        </Button>
    </>;
    return (
        <>
        <Loader loading={loading} />
        {
        idItemDelete && (
          <ModalDelete open={openDelete} message={message} handleClose={handleCloseDelete} handleSave={handleDeleteItem} />
        )
      }
           {idItem && <Modal id={idItem} open={openModal} onClose={handleCloseModal} buttons={buttons}  />}
            <AppTable url={url} columns={columns} keyData='data' actionColumns={actionColumns} auth={true} token={token}  />
        </>
    );
} 

export default ListPlans;