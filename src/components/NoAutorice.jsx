import Layout from '@app/app/layouts/Layout';
import notFound from '@app/assets/imgs/undraw_page_not_found_re_e9o6.svg';
import { Link } from 'react-router-dom';
import routesweb from '../app/config/routesweb';
const NoAutorice =() => {

    return (<>
        <Layout>
            <div className="min-h-[45rem]">
            <div className=" max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-2 lg:py-16 lg:pt-20">
                <div className='relative'>
                <div className='flex gap-6 mt-8'>
                <div className="max-w-screen-xl pt-2 px-4 pb-2 mx-auto lg:gap-8 xl:gap-16 lg:py-2 lg:pt-2">
                  
                  <img src={notFound} alt="" className='w-96 h-96' />
                    <p className='text-center'>
                        Contenido no disponible <br />
                        No contiene los permisos necesarios 
                        <Link className='text-primary underline text-2xl ms-4' to={routesweb.login} > Iniciar Session </Link>
                    </p>
                </div>
                </div>
                </div>
                
            </div>
            </div>
        </Layout>
    </>);
}   


export default NoAutorice;