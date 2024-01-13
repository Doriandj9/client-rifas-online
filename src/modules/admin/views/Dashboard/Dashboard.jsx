import DashboradLayout from "@app/app/layouts/DashboardLayout";
import { Outlet, useMatches } from "react-router-dom";
import Default from "./Default";
const Dashboard = () => {
  const handler = useMatches();
  let index = false
  if(handler.length === 1 && handler[0].handle.op){
    index = true;
  }
    return (
        <>
        <DashboradLayout index={index} content={<Outlet />} component={<Default />} />
        </>
    );
}

export default Dashboard;