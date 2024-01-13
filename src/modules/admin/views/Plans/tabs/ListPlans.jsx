import AppTable from '@appcomponents/Core/AppTable';
import TableHelper from './TableHelper';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa6";
import routesapi from '../../../../../app/config/routesapi';
import { credentials } from '../../../../../app/config/app';
import { useAccessToken } from '../../../../../app/store/app/userStore';
import { formatTimeFull } from '../../../../../app/utilities/web/times/formatTimeFull';
import { useState } from 'react';
import Modal from './Modal/Modal';
import { Button } from '@chakra-ui/react';
import { reloadTable } from '../../../../../app/utilities/events/customs';
const url = credentials.server + routesapi.admin_subscriptions;
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
    //states 
    const [openModal,setOpenModal] = useState(false);
    const [idItem, setIdItem] = useState(null);
    //code
    let {columns,actionColumns} = TableHelper.data();
    actions[0].onclick = (item,i) => () => {
        setOpenModal(true);
        setIdItem(item.id);
    } 
    actions[1].onclick = (item,i) => () => { console.log('delete')}
    actionColumns.list = actions;

    //handlers
    const handleCloseModal = () => setOpenModal(false);
    const handleSaveModal = () => {
        document.dispatchEvent(reloadTable);
        setOpenModal(false);
    }

    //effects

    //jsx

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
           {idItem && <Modal id={idItem} open={openModal} onClose={handleCloseModal} buttons={buttons}  />}
            <AppTable url={url} columns={columns} keyData='data' actionColumns={actionColumns} auth={true} token={token}  />
        </>
    );
} 

export default ListPlans;