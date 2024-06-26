import { Form } from "react-router-dom";
import AppModal from "@appcomponents/Core/AppModal";
import { Button, FormControl, FormLabel, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDelete, MdEditDocument, MdOutlineAddCircle } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "@appcomponents/Core/Loader";
import { FaRegImages } from "react-icons/fa6";
import { credentials } from "../../../../../../app/config/app";
import { useAccessToken } from "../../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../../app/utilities/hooks/data/useFetch";
import routesapi from "../../../../../../app/config/routesapi";
import { fetchQuery } from "../../../../../../app/utilities/web/fetchQuery";
import { reloadTable } from "../../../../../../app/utilities/events/customs";
import { toastConfig } from "../../../../../../app/utilities/web/configs";
import { IoAddCircle } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import AppButton from "../../../../../../app/app_components/Core/AppButon";
import { IoTicketOutline } from "react-icons/io5";

const Modal = ({id, open,onClose, setUpdate, refetch}) => {
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const toast = useToast(toastConfig);
    const [qrImage,setQRImage] = useState('');
    const [qrImageValue,setQRImageValue] = useState('');

    //states
    const[inputs, setInputs] = useState({
        name_account:'',
        account_number: '',
        bank_name: '',
        type: '',
        qr_image: '',
        qr_image_update: '',
        taxid: '',
        is_account_local: false
    })

    //code
    const url = credentials.server + routesapi.raffle_bank_accounts + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error:erroFetch, loading:loadingUseFetch } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {
        setLoadingFetch(true);
        delete inputs.qr_image_update;
        let form = new URLSearchParams(inputs)
        try{
            if(qrImage !== ''){
               form.append('qr_image_file',qrImageValue.value);
               form.append('qr_file_name',qrImageValue.name);                  
            }

            const response = await fetchQuery(token,url,{method:'PATCH',body:form},setLoadingFetch,setErrorFetch);
            if(response.status){
                    refetch();
                    setUpdate({
                        status: response.status,
                        message: response.message
                    });
                    onClose();
               } else {
                setUpdate({
                    status: false,
                    message: response.message
                })
               }
            
        }catch(e){
            setUpdate({
                status: false,
                message: e.message
            })
        }finally{
            setLoadingFetch(false);
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
    //handlers
    const handleInput = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.name === 'qr_image_update' ?  setQRImage(e.target.files[0]) : e.target.value,
            }
        )
    }


    //effects
    useEffect(() => {
        if(data !== null &&  data['id'] > 0){
            setInputs({...data});
        }
        setQRImage('');
    },[data])

    useEffect(() => {
        if(qrImage !== ''){
            const reader = new FileReader();
            reader.readAsDataURL(qrImage);
            reader.onloadend =  function () {
                // 'result' contendrá los datos en formato base64
                const base64Data = reader.result;
                // Haz lo que necesites con la cadena base64, por ejemplo, enviarla a través de una solicitud HTTP
                setQRImageValue({
                    name: qrImage.name,
                    value: base64Data.replace(/data:image\/[a-z]+;base64,/,'')
                });
              }; 
        }
   },[qrImage]);


    return (
        <>
            <Loader loading={loadingFetch} />
            <AppModal   isOpen={open} onClose={onClose} scrollBehavior={'inside'}
                header={<><IoTicketOutline className="text-secondary text-3xl" /> Edita tu rifa.</>}
                buttons={buttons}
                size='4xl'
            >
                <Form>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Nombre de entidad financiera
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'}
                        onInput={handleInput}
                        name="bank_name"
                        value={inputs.bank_name}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                        Número de cédula de la cuenta
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'}
                        onInput={handleInput}
                        name="taxid"
                        value={inputs.taxid}/>
                    </FormControl>
                    <FormControl isDisabled={!inputs.is_account_local} className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                        Nombre de la cuenta
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'}
                        onInput={handleInput}
                        name="name_account"
                        value={inputs.name_account}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                        Número de la cuenta bancaria
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'}
                        onInput={handleInput}
                        name="account_number"
                        value={inputs.account_number}/>
                    </FormControl>
                    <FormControl isDisabled={!inputs.is_account_local} className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                        Tipo de cuenta
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'}
                        onInput={handleInput}
                        name="type"
                        value={inputs.type}/>
                    </FormControl>
                    { inputs.is_account_local && <>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Imagen QR
                        </FormLabel>
                    </FormControl>
                    <div className="p-4 w-56 h-56">
                        {
                            inputs.qr_image ? <a target="__blank"
                            href={credentials.server + inputs.qr_image}>
                                <img className="block w-56 h-56"
                                src={credentials.server + inputs.qr_image} alt="auth" />
                            </a> 
                            : 
                            <div className="font-bold text-secondary">
                                No se ha registrado la imagen QR.
                            </div>
                        }
                        
                    </div>
                    <FormControl marginTop={25} className="">
                                    <FormLabel fontWeight={'bold'}>
                                    <span className="text-sm">Seleccione otra imagen QR de pago </span> 
                                    </FormLabel>
                                    <Input className="shadow"
                                        name="qr_image_update"
                                        accept="image/*"
                                        onChange={handleInput}
                                        type="file"
                                    />
                    </FormControl>
                    </>
                    }
                </Form>
            </AppModal>
        </>
    );
}


const Item = ({handleRemove}) => {
    return (
        <>
        <div data-content-items className="flex mt-2">
            <Input data-header-item 
            className='shadow' width={'35%'} height={50} 
            defaultValue={'Otro lugar'} />
            <Input data-header-content
                className='shadow w-4/5' height={50} placeholder='Por ejemplo: Audífonos Inalámbricos.'
            />
            <IconButton
            onClick={handleRemove}
            height={50} aria-label='Borrar Item' className="w-14"
            icon={<MdDelete className="w-8 h-8 text-secondary" />} />

            <FormControl borderRadius={'0.5rem'} backgroundColor={'#f1f5f9'} position={'relative'} width={'auto'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <FormLabel margin={0} padding={0} paddingRight={2} paddingLeft={2} cursor={'pointer'} >
                    <BsImage className="w-6 h-6 text-primary" />
                    <Input position={'absolute'} top={0} left={0} zIndex={-2} width={1} height={1} type="file" opacity={0} />
                </FormLabel>
            </FormControl>
        </div>
        </>
    );

}
export default Modal;