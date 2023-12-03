/**
 * Contiene los elementos de las rutas web
 * Que se extraern de los diferentes modulos
 */

import admin from "../../modules/admin/routes/admin";
import home from "./../../modules/home/routes/home";

/**
 * @var {Array} rootRoutes rutas de todo el sistema
 */
const rootRoutes = [home,admin];

export default rootRoutes;