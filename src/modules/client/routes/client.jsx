/* path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  hydrateFallbackElement?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  HydrateFallback?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
*/

import App from "../views/App";
import routesweb from "../../../app/config/routesweb";
import raffles from "../../raffle/routes/raffles";
// import AppPlans from "../views/Plans/App";
// import Default from "../views/Dashboard/Default";
// import ListPlans from "../views/Plans/tabs/ListPlans";
// import NewPlans from "../views/Plans/tabs/NewPlans";
/**
 * @constant home rutas del home
 */
export default {
    path: routesweb.dashboard.root,
    element: <App />,
    handle: {op:true},
     children: [
      raffles
        // {
        //     path: routesweb.admin.children.plans.root,
        //     element: <AppPlans />,
        //     handle:{'plans.default': true},
           
        //     children:[
        //         {
        //             path: routesweb.admin.children.plans.children.create,
        //             element: <NewPlans />
        //         },
        //         {
        //             path: routesweb.admin.children.plans.children.view,
        //             element: <ListPlans />
        //         }
        //     ]
        // },
    //     {
    //         path: routesweb.admin.children.dashboard.root,
    //         element: <Default />
    //     },
    //     {
    //         path: routesweb.admin.children.reports.root,
    //         element: <>Reportes</>
    //     },
    //     {
    //         path: routesweb.admin.children.users.root,
    //         element: <>Usuarios</>
    //     },
    //     {
    //         path: routesweb.admin.children.passwords.root,
    //         element: <>Claves</>
    //     }
     ]
}