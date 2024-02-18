/**
 * Opciones de los routes obj
 * path: direccion web /example
 * element: Componente JSX a renderizar
 * children: Array de objetos de rutas
 */

import routesweb from "../../../app/config/routesweb"
import App from "./../views/terms/Benefits"
/**
 * @constant home rutas del home
 */
export default {
    path: routesweb.benefits,
    element: <App />
}