import AppTable from '@appcomponents/Core/AppTable';
import TableHelper from './TableHelper';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa6";
import routesapi from '../../../../app/config/routesapi';
import { credentials } from '../../../../app/config/app';
import { useAccessToken } from '../../../../app/store/app/userStore';
import { useEffect, useState } from 'react';
import Modal from './Modal/Modal';
import { Alert, AlertIcon, Button, useToast } from '@chakra-ui/react';
import { reloadTable } from '../../../../app/utilities/events/customs';
import { MdAddModerator } from "react-icons/md";
import { ToastContainer,toast } from 'react-toastify';
import { useSetHeader } from '../../../../app/utilities/hooks/web/useSetHeader';
import { useFetch } from '../../../../app/utilities/hooks/data/useFetch';
import { GrTransaction } from "react-icons/gr";
import ConfirmDialog from '../../../../app/app_components/Core/ConfirmDialog';
import { fetchQuery } from '../../../../app/utilities/web/fetchQuery';
import { toastConfig } from '../../../../app/utilities/web/configs';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdInput } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { TbEyeX } from "react-icons/tb";

import Loader from '../../../../app/app_components/Core/Loader';


const url = credentials.server + routesapi.admin_winners;
const url_winner = credentials.server + routesapi.public_winners;

let actions = [{
       name: 'Ingresar',
       icon: MdInput,
       color: 'green.700',
       element: null,
       onclick: () => {
           console.log('click | Editar');
       }
   }, {
    name: 'Ocultar',
    icon: FaEyeSlash,
    color: 'red.700',
    element: null,
    onclick: () => {
        console.log('click | Editar');
    }
}, {
  name: 'Mostrar',
  icon: IoEye,
  color: 'blue.700',
  element: null,
  onclick: () => {
      console.log('click | Editar');
  }
}, {
  name: 'Ocultar para mi',
  icon: TbEyeX,
  color: 'purple.700',
  element: null,
  onclick: () => {
      console.log('click | Editar');
  }
}];
const App  = () => {
  const [pagePaginate,setPagePaginate] = useState(1);//pagination

    //hooks 
    useSetHeader('Solicitudes de comentarios ');
    const toast = useToast(toastConfig);
    const token = useAccessToken((state) => state.token);
    const { data, error, total, loading,refetch} = useFetch(url,{method: 'GET'},'data',true,token,[pagePaginate],true,pagePaginate)//pagination
    //states 
    const [openModal,setOpenModal] = useState(false);
    const [idItem, setIdItem] = useState(null);
    const [obj, setObj] = useState(null);
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openAc, setOpenAc] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
  
    const [resultUpdate, setResultUpdate] = useState({
      status: null,
      message: ''
    })
    //code
    let {columns,actionColumns} = TableHelper.data();
    actions[0].onclick = (item,i) => () => {
        setObj(item);
        setOpenModal(true);
    } 

    actions[1].onclick = (item,i) => () => {
      if(!item.winner){
        toast({title: 'Error', description: 'No existe un registro de los ganadores',status: 'error'});
        return;
      }
      setObj(item);
      setOpen(true);
  }

  actions[2].onclick = (item,i) => () => {
    if(!item.winner){
      toast({title: 'Error', description: 'No existe un registro de los ganadores',status: 'error'});
      return;
    }
    setObj(item);
    setOpenView(true);
}

actions[3].onclick = (item,i) => () => {
  setObj(item);
  setOpenAc(true);
}

    //actualizar funciones
    actionColumns.list = actions;
    //handlers
    const handleCloseModal = () => {
      setOpenModal(false)
      setObj(null);
    };

    const handleHide = async () => {
      const data = {state: 'IE'};
      const id = obj.winner.id;
      try{
               
        const response = await fetchQuery(token,url_winner + '/' + id ,{method:'PATCH',body: new URLSearchParams(data)},setLoadingFetch,setErrorFetch);
        if(!response.status){
          throw Error(response.message);
        }
        
        toast({
          title:'Éxito',
          description: 'Se actualizo correctamente.',
          status: 'success'
        });
      setObj(null);
       refetch();
       setOpen(false);
      }catch(e){
          toast({
              title:'Error',
              description: e.message,
              status: 'error',
              duration: 3000
          });
      }finally{
          setLoadingFetch(false);
      }
    }
   
    const handleShow = async () => {
      const data = {state: 'AC'};
      const id = obj.winner.id;
      try{
               
        const response = await fetchQuery(token,url_winner + '/' + id ,{method:'PATCH',body: new URLSearchParams(data)},setLoadingFetch,setErrorFetch);
        if(!response.status){
          throw Error(response.message);
        }
        
        toast({
          title:'Éxito',
          description: 'Se actualizo correctamente.',
          status: 'success'
        });
      setObj(null);
       refetch();
       setOpenView(false);
      }catch(e){
          toast({
              title:'Error',
              description: e.message,
              status: 'error',
              duration: 3000
          });
      }finally{
          setLoadingFetch(false);
      }
    }

    const handleAc = async () => {
      const data = {is_active: false};
      const id = obj.winner.id;
      try{
               
        const response = await fetchQuery(token,url + '/' + id ,{method:'PATCH',body: new URLSearchParams(data)},setLoadingFetch,setErrorFetch);
        if(!response.status){
          throw Error(response.message);
        }
        
        toast({
          title:'Éxito',
          description: 'Se actualizo correctamente.',
          status: 'success'
        });
      setObj(null);
       refetch();
       setOpenAc(false);
      }catch(e){
          toast({
              title:'Error',
              description: e.message,
              status: 'error',
              duration: 3000
          });
      }finally{
          setLoadingFetch(false);
      }
    }
    //jsx


     return (
        <>
        <ConfirmDialog
        open={open}
        handleClose={() => setOpen(false)}
        title={'¿ Esta seguro de ocular el registro ?'}
        msgBtnCancel='Regresar'
        msgBtnConfirm='Aceptar'
        handleConfirm={handleHide}
        >
          <Alert status='warning'>
            <AlertIcon />
            Al aceptar se ocultara el registro en la plataforma.
          </Alert>
        </ConfirmDialog>

        <ConfirmDialog
        open={openView}
        handleClose={() => setOpenView(false)}
        title={'¿ Esta seguro de mostrar el registro ?'}
        msgBtnCancel='Regresar'
        msgBtnConfirm='Aceptar'
        handleConfirm={handleShow}
        >
          <Alert status='info'>
            <AlertIcon />
            Al aceptar se mostrara el registro en la plataforma.
          </Alert>
        </ConfirmDialog>

        <ConfirmDialog
        open={openAc}
        handleClose={() => setOpenAc(false)}
        title={'¿ Esta seguro de ocular el registro solo para mi ?'}
        msgBtnCancel='Regresar'
        msgBtnConfirm='Aceptar'
        handleConfirm={handleAc}
        size='xl'
        info={false}
        >
          <Alert status='warning'>
            <AlertIcon />
            Al aceptar se ocultara el registro para que ya no se muestre en la lista de reseñas de ganadores, no afecta al flujo en la plataforma.
          </Alert>
        </ConfirmDialog>

        <Loader loading={loadingFetch} />
        <div id="home">
        <nav className="text-sm font-semibold mb-6" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              {/* <NavLink to={routes.create} className="text-gray-700 text-md text-primaryop-700">Nuevos Planes de Compra</NavLink> */}
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li className="flex items-center tab-active">
               Reseñas de ganadores
            </li>
          </ol>
        </nav>
        <div className="min-h-[67vh]">
        <>
           {obj && <Modal obj={obj} open={openModal} onClose={handleCloseModal} setUpdate={setResultUpdate} refetch={refetch} />}

           <AppTable actionColumns={actionColumns} columns={columns} data={data} error={error} loading={loading} refetch={refetch}
             total={total} setPagePaginate={setPagePaginate} pagePaginate={pagePaginate}
            />
        </>
        </div>
      </div>
        </>
     );
}

export default App;