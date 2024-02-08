/**
 * Opciones de los routes obj
 * path: direccion web /example
 * element: Componente JSX a renderizar
 * children: Array de objetos de rutas
 */

import routesweb from "../../../app/config/routesweb"
import App from "./../views/recovery-password/App"
/**
 * @constant home rutas del home
 */
export default {
    path: routesweb.recovery_password,
    element: <App />
}