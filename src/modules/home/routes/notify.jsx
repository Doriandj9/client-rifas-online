import routesweb from "../../../app/config/routesweb"
import NotRecibeNotify from "../../../components/NotRecibeNotify"


export default {
        path: routesweb.not_recibe_emails + "/:mail",
        element: <NotRecibeNotify />
}