import { useAuth } from "../../../app/store/app/userStore";
import Dashboard from "./Dashboard/Dashboard";
const App = () =>  {
    const user = useAuth((state) => state.user);
    
    if(user === null || user.is_admin !== true){
        return <> No tiene permisos </>
    }

    return (
        <>
            <Dashboard  />
        </>
    );
}

export default App;