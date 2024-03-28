import Footer from "../app_components/Footer/Footer";
import { ChakraProvider } from '@chakra-ui/react';
import Header from "../app_components/Header/Header";
import { application } from "../config/app";
// import "react-toastify/dist/ReactToastify.css";

const Layout  = ({children}) => {
    return (
    <ChakraProvider >
        {
            application.environment === 'test' &&
            <div className="fixed top-0 left-0 w-full bg-primary/25 text-black text-center text-xl" style={{zIndex: 9999}}>
                ES UN AMBIENTE DE PRUEBAS
          </div>
          } 
        <div className="min-h-screen">
            <Header />
                {children}
            <Footer />
        </div>
    </ChakraProvider >
    
    );
}

export default Layout;