import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDynamicUrl } from "../../../store/app/queriesStore";
/**
 * 
 * @param {string} url 
 * @param {object} options 
 * @param {string|null} keyData Palabra clave para acceder directamente a un elemento de la respuesta
 * @param {boolean} auth Autorización para consumo de apis
 * @param {string} apiKey token de acceso para consumo de apis 
 * @param {Array} dependencies dependencias para realizar nuevas con consultas
 * @param {boolean} paginate informa si es hay datos para paginar
 * @returns {*} { data, error, loading,total, refetch: fetchData }
 */
const useFetch = (url, options= {}, keyData= null, auth=false, apiKey='',dependencies=[], paginate=false, page=0, search = false) => {
    //hooks 
    const navigate = useNavigate();
    const urlDynamic = useDynamicUrl((state) => state.url);
    const [data,setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const headers = new Headers();
    
    if(auth){
        headers.append('Accept','application/json');
        headers.append('Authorization', `Bearer ${apiKey}`);
        options = {...options,headers}
    }

    const fetchData = async () => {
        if(search){
            url = urlDynamic;
        }
        try{
            setLoading(true);
            if(url === '') return;

            if(paginate && page > 1 && !url.includes('filters')){
                url = url + "?page=" + page;
            }

            if(paginate && page > 1 && url.includes('filters')){
                url = url + "&page=" + page;
            }

            const res = await fetch(url, options);
            if(res.status !== 200){
                navigate('/');
            }
            const response = await res.json();
            if(paginate){
                setTotal(response.total);
            }
            setData(keyData ? response[keyData] : response);
        }catch(error){
            setError(error);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    }   
    useEffect(() => {
        fetchData();
      }, dependencies);

    return { data, error, loading,total,updateData: setData, refetch: fetchData }; 
}

export {useFetch};