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
import AppClient from "../views/AppClient";
import AppTickets from "../views/Tickets/App";
import AppPaymentTickets from "../views/PaymentTickets/App";
import AppOrgRaffles from "../views/OrganizationRaffles/App";

import AppProfile from "../views/Profile/App";


// import AppPlans from "../views/Plans/App";
// import Default from "../views/Dashboard/Default";
// import ListPlans from "../views/Plans/tabs/ListPlans";
// import NewPlans from "../views/Plans/tabs/NewPlans";
/**
 * @constant home rutas del home
 */
const routes = routesweb.dashboard.children.client;

export default {
    path: routesweb.dashboard.root,
    element: <App />,
    handle: {op:true},
     children: [
      raffles,
      {
        path: routes.root,
        handle: {op_client:true},
        element: <AppClient />,
        children: [
          {
            path: routes.children.tickets,
            element: <AppTickets />
          },
          {
            path: routes.children.payment_tickets,
            element: <AppPaymentTickets />

          },
          {
            path: routes.children.organization_raffles,
            element: <AppOrgRaffles />

          },
          {
            path: routes.children.client_profile,
            element: <AppProfile />
          }
          
        ]
      }
     ]
}