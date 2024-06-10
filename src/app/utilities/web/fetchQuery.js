
const fetchQuery = async (apiKey,url, options = {}, setLoading = () => {}, setError = () => {} ) => {
    setLoading(true);
    const headers = new Headers();
    headers.append('Accept','application/json');
    headers.append('Authorization', `Bearer ${apiKey}`);
    
    if(options.headers){
        for(let [key,value] of Object.entries(options.headers)){
            headers.append(key,value);
        }
    }
    
    const optionsFetch = {...options,headers}
    
    try{
        const query =  await fetch(url,optionsFetch);
        if(query.status === 401){
           location.reload();
        }
        const response = await query.json();
        return response;
    }catch(e){
        setError(e);
    }finally{
        setLoading(false);
    }
}

const initialFetch = async (url,options) => {
    const headers = new Headers();
    headers.append('Accept','application/json');
    const optionsFetch = {...options,headers}
    
    try{
        const query =  await fetch(url,optionsFetch);
        const response = await query.json();
        return response;
    }catch(e){
        console.error(e);
    }
}

export {fetchQuery, initialFetch};