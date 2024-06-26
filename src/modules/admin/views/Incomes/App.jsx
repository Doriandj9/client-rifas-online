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
import { Button, useToast } from '@chakra-ui/react';
import { reloadTable } from '../../../../app/utilities/events/customs';
import { MdAddModerator } from "react-icons/md";
import { ToastContainer,toast } from 'react-toastify';
import { useSetHeader } from '../../../../app/utilities/hooks/web/useSetHeader';
import { useFetch } from '../../../../app/utilities/hooks/data/useFetch';
import { GrTransaction } from "react-icons/gr";
import ConfirmDialog from '../../../../app/app_components/Core/ConfirmDialog';
import { fetchQuery } from '../../../../app/utilities/web/fetchQuery';
import { toastConfig } from '../../../../app/utilities/web/configs';


const url = credentials.server + routesapi.raffles_income;
let actions = [
   {
       name: 'Responder',
       icon: GrTransaction,
       color: 'green.700',
       element: null,
       onclick: () => {
           console.log('click | Editar');
       }
   }
  ];
const App  = () => {
  const [pagePaginate,setPagePaginate] = useState(1);//pagination

    //hooks 
    useSetHeader('Solicitudes de retiros de ingresos.');
    const toast = useToast(toastConfig);
    const token = useAccessToken((state) => state.token);
    const { data, error, total, loading,refetch} = useFetch(url,{method: 'GET'},'data',true,token,[pagePaginate],true,pagePaginate)//pagination
    //states 
    const [openModal,setOpenModal] = useState(false);
    const [idItem, setIdItem] = useState(null);
    const [open, setOpen] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
  
    const [resultUpdate, setResultUpdate] = useState({
      status: null,
      message: ''
    })
    //code
    let {columns,actionColumns} = TableHelper.data();
    actions[0].onclick = (item,i) => () => {
        if(item.status === 'AC' || item.status === 'CL'){
          toast({
            title: 'Información',
            description: 'No se puede contestar mas de una vez.',
            status: 'info'
          })
          return;
        }
        setIdItem(item.id);
        setOpen(true);
    } 
    //actualizar funciones
    actionColumns.list = actions;
    //handlers
    const handleCloseModal = () => {
      setOpenModal(false)
      setIdItem(null);
    };
   
    const handleModal = async () => {
      setOpenModal(true);
      try{
          const response = await fetchQuery(token,`${url}/${idItem}`,{method: 'PUT', body: new URLSearchParams({status: "DO"})},setLoadingFetch,setErrorFetch)
          if(!response.status){
            throw Error(response.message);
          }
          refetch();
          toast({
            title: 'Éxito',
            description: 'Se actualizo correctamente el estado.',
            status: 'success',
          })

          setOpen(false);

        }catch(e){
          toast({
            title: 'Error',
            description: e.message,
            status: 'error',
            duration: 3500
          });
          setOpenModal(false);
      } finally {
        setLoadingFetch(false);
      }
    }
    //jsx


     return (
        <>
        <div id="home">
        <nav className="text-sm font-semibold mb-6" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              {/* <NavLink to={routes.create} className="text-gray-700 text-md text-primaryop-700">Nuevos Planes de Compra</NavLink> */}
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li className="flex items-center tab-active">
               Solicitudes de retiro de fondos
            </li>
          </ol>
        </nav>
        <div className="min-h-[67vh]">
        <>
          <ConfirmDialog
            open={open}
            handleClose={() => { setOpen(false) }}
            title={'¿ Esta seguro de empezar de el proceso de respuesta ?'}
            handleConfirm={handleModal}
            msgBtnCancel='Regresar'
            msgBtnConfirm='Aceptar'
            size='2xl'
          >
            <p>
              Si acepta seguir con el proceso el estado de la solicitud cambiara a <strong>En progreso</strong>
            </p>
          </ConfirmDialog>
           {idItem && <Modal id={idItem} open={openModal} onClose={handleCloseModal} setUpdate={setResultUpdate} refetch={refetch} />}
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