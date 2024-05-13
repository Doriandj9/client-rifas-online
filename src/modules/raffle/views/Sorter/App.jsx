import { useEffect, useState } from "react";
import { credentials } from "../../../../app/config/app";
import routesapi from "../../../../app/config/routesapi";
import { useFetch } from "../../../../app/utilities/hooks/data/useFetch";
import SaleTicketsDisplay from "../../../../app/app_components/Core/SaleTicketsDisplay";
import { useAccessToken, useAuth } from "../../../../app/store/app/userStore";
import { useNavigate } from "react-router-dom";
import routesweb from "../../../../app/config/routesweb";
import { Skeleton } from  "@chakra-ui/react";
import { lottieOptions } from "../../../../app/utilities/web/configs";
import Lottie from "react-lottie";
import boxEmpty from '@app/assets/imgs/animations/box-empty.json';
import { useSetHeader } from "../../../../app/utilities/hooks/web/useSetHeader";
import SorterRaffleDisplay from "../../../../app/app_components/Core/SorterRaffleDisplay";
let url = credentials.server + routesapi.raffles_list_raffles;

const App = () => {
    useSetHeader('Afiliaciones para ventas físicas')
    //HOOKS
    const navigate = useNavigate();
    const user = useAuth(state => state.user);
    const key = useAccessToken(state => state.token);
    const {data,error,loading,refetch} = useFetch(url.replace('{taxid}',user.taxid),{method: 'GET'},'data',true,key);
    //STATES
    const [dataDisplay,setDataDisplay] = useState([]);

    //EFFECTS
  

    return (
        <>
        <div className="p-2 w-11/12 m-auto shadow-lg rounded-2xl">
            <h2 className="text-2xl text-primary font-black text-center">Seleccionar rifa para el sorteo.</h2>
        </div>
        <hr className="mt-4" />
        <div className="flex gap-2 flex-wrap mt-2">

            {data.length > 0 
            &&
            data.map((item) => (
                <SorterRaffleDisplay
                handleClick={(() => {
                   return () => navigate(
                    "/" + routesweb.sorter.root.replace(':id',item.id)
                   );
                })()}
                raffle={item}
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
            data.length <= 0 && !loading &&
        <>
        <Lottie  options={{animationData: boxEmpty, ...lottieOptions}}  width={400} height={400} />
        <div>
            <h4 className="text-xl text-primary font-black mt-4 text-center">De momento no tiene ninguna rifa para realizar el sorteo.</h4>
        </div>
        </>
        }
        </>
    );
}


export default App;