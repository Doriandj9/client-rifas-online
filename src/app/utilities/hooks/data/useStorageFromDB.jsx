import { useState } from "react"
import { useDrawDetails, useDrawParameters, useRaffleStore } from "../../../store/app/raffleSorterStore";
import { fetchQuery } from "../../web/fetchQuery";
import { useAccessToken, useAuth } from "../../../store/app/userStore";
import { useToast } from "@chakra-ui/react";
import { toastConfig } from "../../web/configs";

/**
 * 
 * 
 * 
 */

export const useLocaleStorageFromDB = () => {

    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const updateParameters = useDrawParameters((state) => state.update);
    const updateDetails = useDrawDetails((state) => state.update);
    const user = useAuth((state) => state.user);
    const token = useAccessToken((state) => state.token);
    const toast = useToast(toastConfig);

    const saveData = async (url,raffle,payload,column,action = null) => {
        setLoading(true);
        try {
            if(action === 'parameters') updateParameters(payload);
            if(action === 'details') updateDetails(payload);
    
            const response = await fetchQuery(token,url,{method: 'PUT', body: new URLSearchParams({[column]:payload})},setLoading,setError);

            if(!response.status){
                throw Error(response.message);
            }
            toast({
                title: 'Actualización',
                description: 'Datos sincronizados correctamente',
                status: 'success'
            });
            setSuccess(true);
        } catch (error) {
            setError(error.message)
        }
        
    }
    
    return { saveData, loading, error, success };
}