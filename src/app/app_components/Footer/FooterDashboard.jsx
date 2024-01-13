
const FooterDashboard = () => {
    return (
        <>
        <div className="w-full border-t-2 px-8 py-6 lg:flex justify-between items-center bg-primary" >
        <p className="mb-2 lg:mb-0 text-white">© Derechos reservados</p>

        <div className="flex">
            <a href="#" className="mr-6 hover:text-gray-900 text-white">Términos y Condiciones</a>
            <a href="#" className="mr-6 hover:text-gray-900 text-white">Pólitica de Privacidad</a>
            <a href="#" className="hover:text-gray-900 text-white">Sobre Nosotros</a>
        </div>
    </div>
        </>
    );
}

export default FooterDashboard;