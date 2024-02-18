import { useEffect } from 'react';

const useSetHeader =(title) => {

    useEffect(() => {
        document.title = `${title} | HAYU24`;
    },[title])
}


export {useSetHeader};