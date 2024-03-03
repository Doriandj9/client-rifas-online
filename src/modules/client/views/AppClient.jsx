import { Outlet, useMatches } from "react-router-dom";
import { useAuth } from "../../../app/store/app/userStore";
import Default from "./Dashboard/Default";
import NotPermissions from "../../../components/NotPermissions";

const AppClient = () => {
    const user = useAuth((state) => state.user);
    const handler = useMatches();
    let index = false
    const arrOp = handler.map((op) => Object.keys(op.handle ?? {}));
    const values = arrOp.reduce((preview,value) => {
        preview.push(value[0]);
        return preview;
    },[])
    if(user ===  null || user.is_client !== true){
        return <NotPermissions />;
    }



    if(handler.length === 2 && values.some((value) => value === 'op_client')){
        return <Default />;
    }
    
        
        return (<div className="min-h-[70.85vh] relative">
                <Outlet />
        </div>);
}

export default AppClient;