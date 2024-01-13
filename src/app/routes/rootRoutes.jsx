/**
 * Contiene los elementos de las rutas web
 * Que se extraern de los diferentes modulos
 */

import admin from "../../modules/admin/routes/admin";
import home from "./../../modules/home/routes/home";
import login from "../../modules/home/routes/login";
import register from "../../modules/home/routes/register";
import verify from "../../modules/home/routes/verify";
import confirmRegister from "../../modules/home/routes/confirmRegister";
import client from "../../modules/client/routes/client";

/**
 * @var {Array} rootRoutes rutas de todo el sistema
 */
const rootRoutes = [home,admin,login, register,verify, confirmRegister, client];

export default rootRoutes;