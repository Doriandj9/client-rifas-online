import Footer from "../app_components/Footer/Footer";
import { ChakraProvider } from '@chakra-ui/react';
import Header from "../app_components/Header/Header";
// import "react-toastify/dist/ReactToastify.css";

const Layout  = ({children}) => {
    return (
    <ChakraProvider >
        <div className="min-h-screen">
            <Header />
                {children}
            <Footer />
        </div>
    </ChakraProvider >
    
    );
}

export default Layout;