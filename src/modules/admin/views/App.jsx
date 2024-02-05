import { useMatches } from "react-router-dom";
import { useInterval } from "../../../app/store/app/resfreshIterval";
import { useAccessToken, useAuth } from "../../../app/store/app/userStore";
import Dashboard from "./Dashboard/Dashboard";
import { useEffect } from "react";
import { fetchQuery } from "../../../app/utilities/web/fetchQuery";
import { credentials } from "../../../app/config/app";
import routesapi from "../../../app/config/routesapi";
import NoAutorice from "../../../components/NoAutorice";

const url = credentials.server + routesapi.refresh_data_user;

const App = () =>  {
    const user = useAuth((state) => state.user);
    const updateUser = useAuth((state) => state.save);
    const token = useAccessToken(state => state.token);
    const interval = useInterval(state => state.interval);
    const updateInterval = useInterval(state => state.update);
    if(user === null || user.is_admin !== true){
        return <NoAutorice  />
    }
    const handlers = useMatches();
    useEffect(() => {
        if(interval){
            clearInterval(interval)
        }
        const refreshDataUser = setInterval(() => {
            for(let entries of handlers ){
                const [id,pathnames] = Object.entries(entries);
                if(pathnames[1] === '/admin/payment-method/create'
                ){
                    fetchQuery(token,url,{method:'POST'})
                    .then((response) => {
                        updateUser(response.data);
                    })
                }
            }

        },5000,[interval]);
        updateInterval(refreshDataUser);
        return () => {
            clearInterval(refreshDataUser);
        }
        
    },[handlers])
    return (
        <>
            <Dashboard  />
        </>
    );
}

export default App;