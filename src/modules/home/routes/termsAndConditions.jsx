/**
 * Opciones de los routes obj
 * path: direccion web /example
 * element: Componente JSX a renderizar
 * children: Array de objetos de rutas
 */

import routesweb from "../../../app/config/routesweb"
import App from "./../views/terms/TermsAndConditions"
/**
 * @constant home rutas del home
 */
export default {
    path: routesweb.terms_and_conditions,
    element: <App />
}