import { NavLink, Outlet, useMatches, useNavigate } from "react-router-dom";
import routesweb from "../../../../app/config/routesweb";
import { useEffect } from "react";

const routes = routesweb.dashboard.children.raffles.children.lottery.children;
const App = () => {
  const handler = useMatches();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(handler.length === 3 && handler[2].handle['lottery.default']){
        navigate(routes.create);
    }
  },[])
  
  if(handler.length === 3 && handler[2].handle['lottery.default']){
    return  navigate(routes.create);
  }
    return (
        <>
             <div>
                <nav className="text-sm font-semibold mb-6" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center text-blue-500">
                    <NavLink to={routes.create} className="text-gray-700 text-md text-primaryop-700">Organizar nuevas rifas</NavLink>
                    <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                    </li>
                    <li className="flex items-center">
                    <NavLink to={routes.list} className="text-gray-600 text-md">Listado de mis rifas</NavLink>
                    </li>
                </ol>
                </nav>
                <div className="min-h-[67vh]">
                <Outlet />
                </div>
            </div>
        </>
    );
}

export default App;