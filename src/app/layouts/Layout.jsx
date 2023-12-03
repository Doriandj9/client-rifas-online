import Footer from "../app_components/Footer/Footer";
import Header from "../app_components/Header/Header";

const Layout  = ({children}) => {
    return (
        <div className="min-h-screen">
            <Header />
                {children}
            <Footer />
        </div>
    );
}

export default Layout;