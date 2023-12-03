
const FooterDashboard = () => {
    return (
        <>
        <div className="w-full border-t-2 px-8 py-6 lg:flex justify-between items-center">
        <p className="mb-2 lg:mb-0">© Derechos reservados</p>

        <div className="flex">
            <a href="#" className="mr-6 hover:text-gray-900">Términos y Condiciones</a>
            <a href="#" className="mr-6 hover:text-gray-900">Pólitica de Privacidad</a>
            <a href="#" className="hover:text-gray-900">Sobre Nosotros</a>
        </div>
    </div>
        </>
    );
}

export default FooterDashboard;