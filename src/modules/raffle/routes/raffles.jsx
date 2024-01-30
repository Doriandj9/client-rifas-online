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
import AppPlans from "../views/Plans/App";
import routesweb from "../../../app/config/routesweb";
import AppLottery from "../views/Lotteries/App";
import NewLottery from "../views/Lotteries/tabs/NewLottery";
import ListLottery from "../views/Lotteries/tabs/ListLottery";
import AppPayment from "../views/PaymentConfirm/App";


const routes = routesweb.dashboard.children.raffles.children;

/**
 * @constant raffles rutas del home
 */
export default {
    path: routesweb.dashboard.children.raffles.root,
    element: <App />,
    handle: {op_raffles:true},
    children: [
        {
            path: routes.plans,
            element: <AppPlans />
        },
        {
            path: routes.lottery.root,
            element: <AppLottery />,
            handle:{'lottery.default': true},
            children:[
                {
                    path: routes.lottery.children.create,
                    element: <NewLottery />
                },
                {
                    path: routes.lottery.children.list,
                    element: <ListLottery />
                },
            ]
        },
        {
            path: routes.confirm_payment,
            element: <AppPayment />
        }
    ]
}