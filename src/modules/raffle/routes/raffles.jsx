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
import AppPaymentMethod from '../views/PaymentMethod/App';
import NewAccount from "../views/PaymentMethod/tabs/NewAccount";
import ListAccount from "../views/PaymentMethod/tabs/ListAccount";
import AppMembership from "../views/Membership/App";
import AuthorizationPayments from "../views/PaymentConfirm/tabs/AuthorizationPayments";
import ListPayments from "../views/PaymentConfirm/tabs/ListPayments";

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
            path: routes.confirm_payment.root,
            element: <AppPayment />,
            handle:{'payment.default': true},
            children: [
                {
                    path: routes.confirm_payment.children.authorization,
                    element: <AuthorizationPayments />
                },
                {
                    path: routes.confirm_payment.children.payments,
                    element: <ListPayments />
                }
            ],
        },
        {
            path: routes.payment_method.root,
            element: <AppPaymentMethod />,
            handle:{'payment_method.default': true},
            children:[
                {
                    path: routes.lottery.children.create,
                    element: <NewAccount />
                },
                {
                    path: routes.lottery.children.list,
                    element: <ListAccount />
                },
            ]
        },
        {
            path: routes.membership,
            element: <AppMembership />

        }
    ]
}