import { Form } from "react-router-dom";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useAccessToken } from "../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import { Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Stack,ButtonGroup, Button, Textarea, useToast, Box, Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import { FaCircleCheck, FaCode, FaRegCopy } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import Loader from "../../../../../app/app_components/Core/Loader";
import { reloadTable } from "../../../../../app/utilities/events/customs";
import { FaUserCheck } from "react-icons/fa";
import { formatNumberTwoDigits } from "../../../../../app/utilities/web/formatNumber";
import { toastConfig } from "../../../../../app/utilities/web/configs";
import { FaAward } from "react-icons/fa";

const url = credentials.server + routesapi.public_winners;

const Modal = ({obj, open,onClose, setUpdate, refetch}) => {
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
    const toast = useToast(toastConfig);
    const params = JSON.parse(obj.draw_details);
    const [buttonsClicks , setButtonsClick] = useState({
        accept: false,
        cancel: false
    })
    //states
    const [inputs,setInputs] = useState(obj.winner ? {...obj.winner} : { 
        payload: JSON.stringify(params.tickets_winner.map((item,i) => {
        const obj = {};
        Reflect.set(obj,'user', item.winner.user);
        Reflect.set(obj,'description', item.description);
        Reflect.set(obj,'comment', '');
        Reflect.set(obj,'img_reference', 'winner_' + i);
        Reflect.set(obj,'path', '');
        return obj;
    })),
    raffles_id: obj.id
});
    
    //code
    const token = useAccessToken((state) => state.token);

    const handleSubmit = async () => {

        try{
          const form = new FormData();
          const files = Array.from(document.querySelectorAll('input[type=file]'))
          .map((input) => {
            const obj = {};
            const file = input.files[0];
            if(file){
                Reflect.set(obj,'name', input.name);
                Reflect.set(obj,'file', file);

                return obj;
            }
            return null;
          }).filter((item) => item);

          for(let [key, value] of Object.entries(inputs)){
            form.append(key, value);
          }

          files.forEach((item) => {
             form.append(item.name,item.file);
          })

          
          const response = await fetchQuery(token,url,{method:'POST',body: form},setLoadingFetch,setErrorFetch);
          if(!response.status){
            throw Error(response.message);
          }
          
          toast({
            title:'Éxito',
            description: 'Se actualizo correctamente.',
            status: 'success'
          });
          refetch();
          onClose();
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

    const handleChangeJson = (e,index) =>{
        const name = e.target.name;
        let value  = e.target.value;
        let payloadData = JSON.parse(inputs.payload);
        payloadData[index][name] = value;
        setInputs({...inputs,payload: JSON.stringify(payloadData)})
      }
    
    const handleImg = (e) => {
        const file = e.target.files[0];
        
        if(file) {
            const img = e.target.parentElement.querySelector('img');
            console.log(file)
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64String = event.target.result;
                img.src = base64String;
            };
            reader.readAsDataURL(file);
        }
    } 

    const buttons = <>
    <Button colorScheme='red' mr={3} onClick={onClose}>
        Cerrar
    </Button>
    <Button colorScheme='blue' onClick={handleSubmit} >
        Guardar
      </Button>
    </>;

  
    return (
        <>
            <Loader loading={loadingFetch} />
            <AppModal isOpen={open} onClose={onClose} scrollBehavior={'inside'}
                header={<div className="flex items-center gap-4"><FaAward className="text-3xl text-primary" /> <h3 className="title-dynamic "> Ingresar datos de los ganadores</h3></div>}
                buttons={buttons}
                size='full'
            >
                <div className="w-full md:w-10/12 md:m-auto">
                <Alert>
                    <AlertIcon />
                    Ingrese los datos de los ganadores de esta según los premios, no son obligatorios ingresar todos los datos los participantes.
                </Alert>
                    <Form className="mt-4">
                        <div className="flex flex-col gap-2">
                            {JSON.parse(inputs.payload).map((item, i) => {

                                return (
                                    <div className="shadow px-1 py-4 rounded-md">
                                <h3  className="text-lg"><span className="text-primary font-semibold">{item.description.title}:</span>  <span className="text-black text-sm">{item.description.description}</span></h3>
                                <div className="w-11/12 m-auto">
                                    <p className="text-md text-gray-600"><span className="text-lg font-semibold">Ganador:</span> {item.user.taxid} - {item.user.first_name} {item.user.last_name}</p>
                                    <FormControl className="" >
                                        <FormLabel margin={0} width={'25%'}>
                                            <span className="text-lg text-gray-600 font-semibold text-sm">Comentarios del ganador</span>
                                        </FormLabel>
                                        <Textarea
                                        onChange={(e) => handleChangeJson(e,i)}
                                        name='comment'
                                        value={item.comment}
                                        resize={"none"}
                                        
                                        />
                                    </FormControl>
                                    <FormControl className="" >
                                        <FormLabel margin={0} width={'25%'}>
                                            <span className="text-lg text-gray-600 font-semibold text-sm">Imagen de constancia</span>
                                        </FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Input type='file'
                                                onChange={handleImg} 
                                                name={item.img_reference}
                                                accept='image/*'
                                                className='shadow' />
                                            <img src={ item.path === '' ? '' : credentials.server + item.path }
                                            className="w-20 h-20" alt="previsualización" />

                                        </div>
                                    </FormControl>
                                </div>
                            </div>
                                )
                            })}
                        </div>
                        
                    </Form>
                </div>
            </AppModal>
        </>
    );
}


export default Modal;