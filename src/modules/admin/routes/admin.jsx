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
import AppPlans from "../views/Plans/App";
import Default from "../views/Dashboard/Default";
import ListPlans from "../views/Plans/tabs/ListPlans";
import NewPlans from "../views/Plans/tabs/NewPlans";
import AppAuth from "../views/AuthenticationUser/App";
import AppAuthRaffles from "../views/AuthenticationRaffles/App";
import NewAccount from "../../raffle/views/PaymentMethod/tabs/NewAccount";
import ListAccount from "../../raffle/views/PaymentMethod/tabs/ListAccount";
import AppPaymentMethod from "../views/PaymentMethod/App";

const routes = routesweb.admin.children;
/**
 * @constant home rutas del home
 */
export default {
    path: routesweb.admin.root,
    element: <App />,
    handle: {op:true},
    children: [
        {
            path: routesweb.admin.children.plans.root,
            element: <AppPlans />,
            handle:{'plans.default': true},
           
            children:[
                {
                    path: routesweb.admin.children.plans.children.create,
                    element: <NewPlans />
                },
                {
                    path: routesweb.admin.children.plans.children.view,
                    element: <ListPlans />
                }
            ]
        },
        {
            path: routesweb.admin.children.authentication.root,
            element: <AppAuth />
        },
        {
            path: routesweb.admin.children.authentication_raffles.root,
            element: <AppAuthRaffles />
        },
        {
            path: routesweb.admin.children.payment_method.root,
            element: <AppPaymentMethod />,
            handle:{'payment_method.default': true},
            children:[
                {
                    path: routes.payment_method.children.create,
                    element: <NewAccount />
                },
                {
                    path: routes.payment_method.children.list,
                    element: <ListAccount />
                },
            ]
        },
        {
            path: routesweb.admin.children.dashboard.root,
            element: <Default />
        },
        {
            path: routesweb.admin.children.reports.root,
            element: <>Reportes</>
        },
        {
            path: routesweb.admin.children.users.root,
            element: <>Usuarios</>
        },
        {
            path: routesweb.admin.children.passwords.root,
            element: <>Claves</>
        }
    ]
}