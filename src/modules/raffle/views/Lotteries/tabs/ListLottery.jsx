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
import { Alert, AlertIcon, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { toastConfig } from "../../../../../app/utilities/web/configs";
import { FaRegEdit } from "react-icons/fa";
import Modal from "./Modal/Modal";
import ModalDelete from "../../../../../app/app_components/Core/ModalDelete";
import { MdDeleteOutline } from "react-icons/md";
import { reloadTable } from "../../../../../app/utilities/events/customs";
import Loader from "../../../../../app/app_components/Core/Loader";
import { ImCancelCircle } from "react-icons/im";
import AppModal from "@appcomponents/Core/AppModal";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PhoneInput from 'react-phone-number-input';


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
  {
    name: "Cancelar rifa.",
    icon: ImCancelCircle,
    color: "red.900",
    element: null,
    onclick: () => {
      console.log("click | Editar");
    },
  },
];
const ListLottery = () => {
  const [pagePaginate,setPagePaginate] = useState(1);//pagination

    //hooks 
    const token = useAccessToken((state) => state.token);
    const user = useAuth(state => state.user);
    const toast = useToast(toastConfig);
    const url = credentials.server + routesapi.raffles_list_raffles.replace('{taxid}',user.taxid);
    const { data, error:errorData, total, loading:loadingData,refetch} = useFetch(url,{method: 'GET'},'data',true,token,[pagePaginate],true,pagePaginate)//pagination

   //states 
   const [openModal,setOpenModal] = useState(false);
   const [idItem, setIdItem] = useState(null);
   const [openDelete,setOpenDelete] = useState(false);
   const [idItemDelete,setIdItemDelete] = useState(null);
   const  [openCancel, setOpenCancel] = useState(false);
   const [message,setMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const [error,setError] = useState(null);
   const [value, setValue] = useState('');
   const [valuePhone, setValuePhone] = useState('');
   const [inputs, setInputs] = useState({
    phone: ''
   });
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

   actions[2].onclick = (item,i) => () => {
    setOpenCancel(true);
    setIdItemDelete(item.id);
   }
   //actualizar funciones
   actionColumns.list = actions;
   //handlers
   const handleCloseModal = () => {
    setOpenModal(false);
    setIdItem(null);
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
          refetch();
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

   
   const handleCloseCancel = () => {
    setOpenCancel(false);
    setIdItemDelete(null);
   }

   const handleCancelSave = async () => {
    if(valuePhone === ''){

      toast({
        title: 'Error',
        description: 'Ingrese un contacto',
        status: 'error'
      });

      return;
    }

    if(value === ''){

      toast({
        title: 'Error',
        description: 'Ingrese una justificación',
        status: 'error'
      });

      return;
    }

    try{
      const url = credentials.server + routesapi.raffle_cancel.replace('{id}',idItemDelete);
      const form = new FormData();

      form.append('phone', valuePhone);
      form.append('description', value);

      const response  = await fetchQuery(token,url,{method: 'POST', body: form},setLoading,setError);
      if(response.status){
        toast({
          title: 'Éxito',
          description: 'Se cancelo la rifa y se envió correctamente las notificaciones.',
          status: 'success',
          duration: 3000
        });
        refetch();
        setOpenCancel(false);
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
   useEffect(() => {
     if(resultUpdate.message !== ''){
       if(resultUpdate.status){
        toast({
          title: 'Éxito',
          description: resultUpdate.message,
          status: 'success'
        });
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
      {idItem && (
        <Modal
          id={idItem}
          open={openModal}
          onClose={handleCloseModal}
          setUpdate={setResultUpdate}
          refetch={refetch}
        />
      )}
      {
        idItemDelete && (
          <ModalDelete open={openDelete} message={message} handleClose={handleCloseDelete} handleSave={handleDeleteItem} />
        )
      }
      <AppTable actionColumns={actionColumns} columns={columns} data={data} error={errorData} loading={loadingData} refetch={refetch}
             total={total} setPagePaginate={setPagePaginate} pagePaginate={pagePaginate}
            />

        <AppModal
        isOpen={openCancel}
        header={<><h1 className="title-dynamic">¿ Esta seguro de cancelar esta rifa ?</h1></>}
        size='2xl'
        buttons={<>
          <div className="flex gap-2">
            <Button  onClick={handleCloseCancel} colorScheme='blue'>
              Regresar
            </Button>
            <Button colorScheme='red' onClick={handleCancelSave}>
              Continuar
            </Button>
          </div>
        </>}
        >
          <Alert status="warning"> 
            <AlertIcon />
            Tenga en cuenta que esta rifa se cancelara unicamente si los boletos vendidos es menor al 50%
          </Alert>
          <p className="mt-4 p-2 text-justify">
            Una vez que se cancele la rifa se emitirá un correo electrónico notificando la cancelación de la rifa a cada usuario.
          </p>
          
          <FormControl marginTop={15} isRequired>
            <FormLabel fontWeight={'bold'}>Contacto para coordinar las devoluciones</FormLabel>
                  <div className="app-phone-cel">
                    <PhoneInput
                        defaultCountry="EC" // Puedes cambiar el país predeterminado
                        value={valuePhone}
                        onChange={setValuePhone}
                        international={true} // Permite ingresar números internacionales
                        />
                  </div>
            </FormControl>
            <div className="mt-4">
            <FormControl isRequired>
              <FormLabel>
                <strong>Ingrese su justificación de cancelación de la rifa</strong>
              </FormLabel>
                <ReactQuill  theme="snow" value={value} onChange={setValue}  />
            </FormControl>
            </div>
        </AppModal>
    </>
  );
};

export default ListLottery;
