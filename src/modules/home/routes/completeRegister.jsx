/**
 * Opciones de los routes obj
 * path: direccion web /example
 * element: Componente JSX a renderizar
 * children: Array de objetos de rutas
 */

import routesweb from "../../../app/config/routesweb"
import App from "./../views/verify/Complete"
/**
 * @constant completeRegister rutas del home
 */
export default {
    path: routesweb.register_success,
    element: <App />
}