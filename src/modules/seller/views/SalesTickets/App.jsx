import { useEffect, useState } from "react";
import { credentials } from "../../../../app/config/app";
import routesapi from "../../../../app/config/routesapi";
import { useFetch } from "../../../../app/utilities/hooks/data/useFetch";
import SaleTicketsDisplay from "../../../../app/app_components/Core/SaleTicketsDisplay";
import { useAccessToken, useAuth } from "../../../../app/store/app/userStore";
import { useNavigate } from "react-router-dom";
import routesweb from "../../../../app/config/routesweb";
let url_comm = credentials.server + routesapi.seller_commissions_by_user;

const App = () => {
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
            const result = data.filter((item) => item.seller_pos);
            setDataDisplay(result);
        }
    },[data]);

    return (
        <>
            {dataDisplay.length > 0 
            &&
            data.map((item) => (
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
        </>
    );
}


export default App;