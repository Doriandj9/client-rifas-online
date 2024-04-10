import { useEffect, useState } from "react";
import AppTicket from "../../../../app/app_components/Core/AppTicket";
import { credentials } from "../../../../app/config/app";
import routesapi from "../../../../app/config/routesapi";
import { useAccessToken, useAuth } from "../../../../app/store/app/userStore";
import { useFetch } from "../../../../app/utilities/hooks/data/useFetch";
import { Skeleton } from  "@chakra-ui/react";
import { lottieOptions } from "../../../../app/utilities/web/configs";
import Lottie from "react-lottie";
import boxEmpty from '@app/assets/imgs/animations/box-empty.json';

let url = credentials.server + routesapi.seller_sales;

const App = () => {
    // HOOKS
    const user = useAuth(state => state.user);
    const token = useAccessToken(state => state.token);
    const [dataDisplay,setDataDisplay] = useState([]);
    url = url.replace('{taxid}',user.taxid);
    const {data,error,loading,refetch} = useFetch(url,{method: 'GET'},'data',true,token);
    
    useEffect(() => {
        if(data.length > 0){
            const url = new URL(window.location.href);
            const params = url.searchParams;
            if(params.has('filter')){
                const dataFilter = JSON.parse(params.get('filter'));
                const result = data.filter((item) => {
                    return dataFilter.some((index) => item.ticket.id === index);
                });

                setDataDisplay(result);
                return;
            }

            setDataDisplay(data);
            
            
        }
    },[data])
    return (
        <>
            <div className='flex gap-4 flex-wrap'>
          {
            dataDisplay && dataDisplay.length > 0
            &&
            dataDisplay.map(item => {
              return (
                <AppTicket size={'sm'} ticket={item.ticket} key={item.id} download  />
              );
            })
          }
        </div>
          {
            loading && <>
              <div className="flex gap-2 flex-wrap">
                <Skeleton width={300} height={450} rounded={'xl'} />
                <Skeleton width={300} height={450} rounded={'xl'} />
                <Skeleton width={300} height={450} rounded={'xl'} />
                <Skeleton width={300} height={450} rounded={'xl'} />
                <Skeleton width={300} height={450} rounded={'xl'} />
                <Skeleton width={300} height={450} rounded={'xl'} />
                <Skeleton width={300} height={450} rounded={'xl'} />
                <Skeleton width={300} height={450} rounded={'xl'} />

              </div>
            </>
          }
          {
            dataDisplay.length <= 0 && !loading &&
        <>
        <Lottie  options={{animationData: boxEmpty, ...lottieOptions}}  width={400} height={400} />
        <div>
            <h4 className="text-xl text-primary font-black mt-4 text-center">De momento no contiene boletos vendidos por el proceso físico.</h4>
        </div>
        </>
        }
        </>
    );

}

export default App;