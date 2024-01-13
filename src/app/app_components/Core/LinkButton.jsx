import { NavLink } from "react-router-dom";

const LinkButton = ({url, children}) => {
    return (
        <>
            <NavLink to={url} 
                    className="text-white bg-primary hover:bg-primaryop-900 focus:ring-4 focus:ring-primaryop-700 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-primary dark:hover:bg-primaryop-900 focus:outline-none dark:focus:ring-primaryop-700">
                    {children}
            </NavLink>
        </>
    );
}

export default LinkButton;