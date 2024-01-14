import { useAuth } from "../../../app/store/app/userStore";
import Dashboard from "./Dashboard/Dashboard";
const App = () =>  {
    const user = useAuth((state) => state.user);

    if(!user){
        return <>no permite</>
    }
    return (
        <>
            <Dashboard  />
        </>
    );
}

export default App;