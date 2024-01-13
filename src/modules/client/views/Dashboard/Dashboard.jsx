import DashboardClient from "@app/app/layouts/DashboardClient";
import { Link, NavLink, Outlet, useNavigate, redirect, useMatch, useMatches } from "react-router-dom";
import routesweb from "../../../../app/config/routesweb";
import {useEffect } from "react";
import Default from "./Default";
const Dashboard = () => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     navigate(routesweb.admin.root + '/' + routesweb.admin.children.dashboard.root);

//   },[])
// console.log(routesweb.admin.root + '/' + routesweb.admin.children.dashboard.root);
  const handler = useMatches();
  let index = false
  if(handler.length === 1 && handler[0].handle.op){
    index = true;
  }
    return (
        <>
        <DashboardClient index={index} content={<Outlet />} component={<Default />} />
        </>
    );
}

export default Dashboard;