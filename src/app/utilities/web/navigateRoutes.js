const routesRedirect = {
    admin: '/admin',
    dashboard: '/dashboard'
};
const navigateRoutes = (navigate,user) => {
    if(user.is_admin) {
        navigate(routesRedirect.admin);
        return
    }

    navigate(routesRedirect.dashboard);
}

export {navigateRoutes};