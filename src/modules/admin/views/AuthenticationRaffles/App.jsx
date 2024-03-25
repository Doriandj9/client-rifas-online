import AppTable from '@appcomponents/Core/AppTable';
import TableHelper from './TableHelper';
import routesapi from '../../../../app/config/routesapi';
import { credentials } from '../../../../app/config/app';
import { useAccessToken } from '../../../../app/store/app/userStore';
import { useEffect, useState } from 'react';
import Modal from './Modal/Modal';
import { reloadTable } from '../../../../app/utilities/events/customs';
import { ToastContainer,toast } from 'react-toastify';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useSetHeader } from '../../../../app/utilities/hooks/web/useSetHeader';
import { useFetch } from '../../../../app/utilities/hooks/data/useFetch';

const url = credentials.server + routesapi.admin_auth_raffles;
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
const App  = () => {
  const [pagePaginate,setPagePaginate] = useState(1);//pagination
    //hooks 
    const token = useAccessToken((state) => state.token);
    useSetHeader('Autenticación de rifas');
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
        <div id="home">
        <nav className="text-sm font-semibold mb-6" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              {/* <NavLink to={routes.create} className="text-gray-700 text-md text-primaryop-700">Nuevos Planes de Compra</NavLink> */}
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li className="flex items-center tab-active">
               Autenticación de comprobantes de pago
            </li>
          </ol>
        </nav>
        <div className="min-h-[67vh]">
        <>
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