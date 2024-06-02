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
import AppSolicitude from "./../views/SellerSolicitude/App";
import Reserve from "../views/SellerSolicitude/tabs/Reserve";
import List from "../views/SellerSolicitude/tabs/List";
import AppSalesTickets from "../views/SalesTickets/App";
import Sales from "../views/SalesTickets/Sales";
import AppBuyTickets from "../views/TicketsBuys/App";

const routes = routesweb.dashboard.children.seller.children;

/**
 * @constant seller rutas del afiliado
 */
export default {
    path: routesweb.dashboard.children.seller.root,
    element: <App />,
    handle: {op_seller:true},
    children: [
        {
            path: routes.solicitude.root,
            element: <AppSolicitude />,
            handle:{'lottery.default': true},
            children:[
                {
                    path: routes.solicitude.children.reserve,
                    element: <Reserve />
                },
                {
                    path: routes.solicitude.children.list,
                    element: <List />
                },
            ]
        },
        {
            path: routes.sales_tickets,
            element: <AppSalesTickets  />, //<AppPayment />
        },
        {
            path: routes.pos_sales_tickets,
            element: <Sales />
        },
        {
            path: routes.buys_tickets,
            element: <AppBuyTickets />
        }
    ]
}