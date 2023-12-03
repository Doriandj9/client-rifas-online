import { Basquet_Small, FacebookSVG_Small, GitHub_Small, InstagramSVG_Small, Twitter_Small } from "../../../components/ImgSVG";
import logo from '@app/assets/imgs/DigitalEducas-Logos/DigitalEducas_2023.png';
const Footer  = () => {
    return (
        <>
            <footer className="bg-white dark:bg-gray-800">
            <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
                <div className="flex justify-around w-1/2 m-auto">
                    <div>
                        <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Ayuda</h3>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Twitter</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Facebook </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h3>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Privacy Policy</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Licensing</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Terms</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="text-center">
                    <a href="#" className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img src={logo} className="h-[5rem] mr-3 sm:h-[6rem]" alt="Digital Educas Logo" />    
                    </a>
                    <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© 2023-2024 Digital Educas | Todos los derechos reservados </span>
                    <ul className="flex justify-center mt-5 space-x-5">
                        <li>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                <FacebookSVG_Small />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                <InstagramSVG_Small />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                <Twitter_Small />
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </footer>
        </>
    );
}

export default Footer;