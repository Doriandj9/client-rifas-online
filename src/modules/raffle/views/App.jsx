import { Outlet, useMatches } from "react-router-dom";

const App = () => {
    const handler = useMatches();
    let index = false
    const arrOp = handler.map((op) => Object.keys(op.handle ?? {}));
    const values = arrOp.reduce((preview,value) => {
        preview.push(value[0]);
        return preview;
    },[])
    if(handler.length === 2 && values.some((value) => value === 'op_raffles')){
        return <>Default</>;
    }
    
        
        return (<div className="min-h-[70.85vh]">
                <Outlet />
        </div>);
}

export default App;