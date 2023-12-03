import { useState, useEffect } from "react"

const useFetch = (url, options= {}, keyData= null) => {
    const [data,setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try{
            setLoading(true);
            const res = await fetch(url, options);
            const response = await res.json();
            console.log(response);
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
      }, []);

    return { data, error, loading, refetch: fetchData }; 
}

export {useFetch};