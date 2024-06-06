import { useEffect, useState } from "react";
import { credentials } from "../../../../app/config/app";
import routesapi from "../../../../app/config/routesapi";
import { useFetch } from "../../../../app/utilities/hooks/data/useFetch";
import SaleTicketsDisplay from "../../../../app/app_components/Core/SaleTicketsDisplay";
import { useAccessToken, useAuth } from "../../../../app/store/app/userStore";
import { useNavigate } from "react-router-dom";
import routesweb from "../../../../app/config/routesweb";
let url_comm = credentials.server + routesapi.seller_commissions_by_user;
import { Skeleton } from  "@chakra-ui/react";
import { lottieOptions } from "../../../../app/utilities/web/configs";
import Lottie from "react-lottie";
import boxEmpty from '@app/assets/imgs/animations/box-empty.json';
import { useSetHeader } from "../../../../app/utilities/hooks/web/useSetHeader";

const App = () => {
    useSetHeader('Afiliaciones para ventas físicas')
    //HOOKS
    const navigate = useNavigate();
    const user = useAuth(state => state.user);
    const key = useAccessToken(state => state.token);
    url_comm = url_comm.replace('{taxid}',user.taxid);
    const {data,error,loading,refetch} = useFetch(url_comm,{method: 'GET'},'data',true,key);
    //STATES
    const [dataDisplay,setDataDisplay] = useState([]);

    //EFFECTS
    useEffect(() => {
        if(data.length > 0){
            const result = data.filter((item) => item.seller_pos && item.status === 'AC' && item.raffle.is_complete !== true);  
            setDataDisplay(result);
        }
    },[data]);

    return (
        <>
        <div className="flex gap-2 flex-wrap">

            {dataDisplay.length > 0 
            &&
            dataDisplay.map((item) => (
                <SaleTicketsDisplay
                handleClick={(() => {
                   return () => navigate(
                    routesweb.dashboard.children.seller.children
                    .pos_sales_tickets.replace(':id',`${item.raffle.id}?commission=${item.id}`)
                   );
                })()}
                raffle={item.raffle}
                key={item.id}
                />
            ))
            }
        </div>


            {
            loading && <>
              <div className="flex gap-2 flex-wrap">
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
                <Skeleton width={300} height={200} rounded={'xl'} />
              </div>
            </>
          }
          {
            dataDisplay.length <= 0 && !loading &&
        <>
        <Lottie  options={{animationData: boxEmpty, ...lottieOptions}}  width={400} height={400} />
        <div>
            <h4 className="text-xl text-primary font-black mt-4 text-center">De momento no tiene ninguna afiliación que le haya permitido ventas físicas.</h4>
        </div>
        </>
        }
        </>
    );
}


export default App;