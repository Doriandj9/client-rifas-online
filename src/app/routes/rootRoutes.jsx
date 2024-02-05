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
import payRaffles from "../../modules/home/routes/payRaffles";
import plans from "../../modules/home/routes/plans";
import terms from "../../modules/home/routes/terms";
import NoAutorice from "../../components/NoAutorice";

/**
 * @var {Array} rootRoutes rutas de todo el sistema
 */
const rootRoutes = [home,admin,login, register,verify, confirmRegister, client, payRaffles,plans,terms,{
    path: '*',
    element: <NoAutorice />
}];

export default rootRoutes;