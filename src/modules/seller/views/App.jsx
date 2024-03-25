import { Outlet, useMatches } from "react-router-dom";
import { useAuth } from "../../../app/store/app/userStore";
import Default from "../../client/views/Dashboard/Default";
import NotPermissions from "../../../components/NotPermissions";

const App = () => {
    const user = useAuth((state) => state.user);
    const handler = useMatches();
    let index = false
    const arrOp = handler.map((op) => Object.keys(op.handle ?? {}));
    const values = arrOp.reduce((preview,value) => {
        preview.push(value[0]);
        return preview;
    },[])
    if(user ===  null || user.is_seller !== true || user.is_pending == true){
        return <NotPermissions />;
    }



    if(handler.length === 2 && values.some((value) => value === 'op_seller')){
        return <Default />;
    }
    
        
        return (<div className="min-h-[70.85vh] relative">
                <Outlet />
        </div>);
}

export default App;