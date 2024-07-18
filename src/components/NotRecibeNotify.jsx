import { Alert, AlertIcon, Button, useToast } from "@chakra-ui/react";
import Layout from "../app/layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { initialFetch } from "../app/utilities/web/fetchQuery";
import { credentials } from "../app/config/app";
import routesapi from "../app/config/routesapi";
import { useState } from "react";
import { toastConfig } from "../app/utilities/web/configs";
import Loader from "../app/app_components/Core/Loader";

const url = credentials.server + routesapi.not_notify

const NotRecibeNotify = () => {
    const [loading, setLoading] = useState(false);
    const toast = useToast(toastConfig);
    const params = useParams();
    const email = params.mail;
    const navigate = useNavigate();
    const sendNotify = async () => {
        try {
            setLoading(true);
            const payload = { email: email, send_email: false };
            const response =  await initialFetch(url,{method: 'POST',body: new URLSearchParams(payload)});
            if(!response.status){
                throw Error(response.message);
            }
            toast({
                title: 'Éxito',
                description: 'Se actualizo correctamente',
                status: 'success'
            });
            setTimeout(() => {
                navigate('/');
            },1000);
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error'
            });
        }finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Layout>
                <Loader loading={loading} />
                <div className="min-h-[45rem] flex justify-center items-center">

                    <div className="shadow w-[35rem] p-4">
                          <Alert status="warning">
                             <AlertIcon />
                                Tenga en cuenta al desactivar la opción de recibir notificaciones, no se encontrara al tanto de las actualizaciones de las rifas como los ganadores o cambios de fechas de sorteos.
                           </Alert>  

                           <p className="mt-2 text-primary">
                            Si desea continuar presione en aceptar. 
                           </p>

                           <div className="flex gap-2 justify-end mt-4">
                                <Button colorScheme="blue" onClick={() => navigate('/')}>
                                    Regresar
                                </Button>
                                <Button colorScheme="red" onClick={sendNotify}>
                                    Aceptar
                                </Button>
                           </div>
                    </div>

                </div>
            </Layout>
        </>
    );
}

export default NotRecibeNotify;