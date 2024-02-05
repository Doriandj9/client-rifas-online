import { Outlet, useMatches } from "react-router-dom";
import { useAuth } from "../../../app/store/app/userStore";

const App = () => {
    const user = useAuth((state) => state.user);
    const handler = useMatches();
    let index = false
    const arrOp = handler.map((op) => Object.keys(op.handle ?? {}));
    const values = arrOp.reduce((preview,value) => {
        preview.push(value[0]);
        return preview;
    },[])
    console.log(user);
    if(user ===  null || user.is_raffles !== true || user.organize_riffs !== true){
        return <> No tiene permisos</>;
    }



    if(handler.length === 2 && values.some((value) => value === 'op_raffles')){
        return <>Default 2</>;
    }
    
        
        return (<div className="min-h-[70.85vh] relative">
                <Outlet />
        </div>);
}

export default App;