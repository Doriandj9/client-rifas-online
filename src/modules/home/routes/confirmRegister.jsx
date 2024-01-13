import routesweb from "../../../app/config/routesweb"
import App from "../views/confirm/App"


export default {
        path: `${routesweb.confirm_register}/:code`,
        element: <App />
}