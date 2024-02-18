/**
 * Opciones de los routes obj
 * path: direccion web /example
 * element: Componente JSX a renderizar
 * children: Array de objetos de rutas
 */

import routesweb from "../../../app/config/routesweb"
import App from "./../views/terms/VisionAndMision"
/**
 * @constant home rutas del home
 */
export default {
    path: routesweb.mission_and_vision,
    element: <App />
}