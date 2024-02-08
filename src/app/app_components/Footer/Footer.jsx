import { Basquet_Small, FacebookSVG_Small, GitHub_Small, InstagramSVG_Small, Twitter_Small } from "../../../components/ImgSVG";
import logo from '@app/assets/imgs/DigitalEducas-Logos/hayu24.png';
import routesweb from "../../config/routesweb";
const Footer  = () => {
    return (
        <>
            <footer className="bg-white dark:bg-gray-800">
                <div className="w-full bg-primary">
                    <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
                        <div className="flex justify-around w-1/2 m-auto">
                            <div>
                                <h3 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Ayuda</h3>
                                <ul className="text-gray-200 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a target="__blank" href="https://twitter.com/digital_educas" className="hover:underline">Twitter</a>
                                    </li>
                                    <li className="mb-4">
                                        <a target="__blank" href="https://www.facebook.com/digitaleducas.oficial" className="hover:underline">Facebook </a>
                                    </li>
                                    <li className="mb-4">
                                        <a target="__blank" href="https://www.instagram.com/digitaleducas/" className="hover:underline">Instagram</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Legal</h3>
                                <ul className="text-gray-200 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a target="__blank" href={routesweb.company_policy} className="hover:underline">Políticas de privacidad</a>
                                    </li>
                                    <li className="mb-4">
                                        <a target="__blank" href="#" className="hover:underline">Licencia</a>
                                    </li>
                                    <li className="mb-4">
                                        <a target="__blank" href="#" className="hover:underline">Términos y condiciones</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="text-center">
                    <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© 2023-2024 <a className="text-primaryop-500" target="__blank" href="https://www.digitaleducas.com">Digital Educas </a>| Todos los derechos reservados</span>
                    <ul className="flex justify-center mt-5 space-x-5">
                        <li>
                            <a target="__blank" href="https://www.facebook.com/digitaleducas.oficial" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                <FacebookSVG_Small />
                            </a>
                        </li>
                        <li>
                            <a target="__blank" href="https://www.instagram.com/digitaleducas/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                <InstagramSVG_Small />
                            </a>
                        </li>
                        <li>
                            <a target="__blank" href="https://twitter.com/digital_educas" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                <Twitter_Small />
                            </a>
                        </li>

                    </ul>
                </div>
                    </div>
                </div>
        </footer>
        </>
    );
}

export default Footer;