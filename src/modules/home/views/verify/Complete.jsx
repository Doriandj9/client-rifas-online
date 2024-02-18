import Layout from '@app/app/layouts/Layout';
import Lottie from 'react-lottie';
import success from '@app/assets/imgs/animations/Animation - 1704578819310.json';
import LinkButton from '../../../../app/app_components/Core/LinkButton';
import routesweb from '../../../../app/config/routesweb';
import { useSetHeader } from '../../../../app/utilities/hooks/web/useSetHeader';

const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Complete = () => {
    useSetHeader('Registro completado');

    const pathAnimation =  'Animation - 1704578819310.json';
    return (
        <>
    <Layout >
        <section className="bg-gray-100 dark:bg-gray-900 md:p-12 sm:p-0">
            <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto sm:w-full">
              <div className='flex items-center mt-12 border border-primary xl:w-5/12 m-auto'>
                <div className='bg-white min-h-[18rem] flex-grow lg:px-4 xl:px-8 sm:px-0 p-0'>
                    <div className='flex justify-center items-center p-4'>
                        <Lottie options={{animationData: success, ...defaultOptions}}  width={150} height={150} />
                    </div>
                    <p className='p-4 text-center w-full  m-auto text-md italic font-bold text-primary mt-4'>Te has registrado correctamente.</p>

                    <div className='p-2 w-11/12 m-auto'>
                        <p>
                        ¡Perfecto! ¡Tu contraseña ha sido creada exitosamente!<br />
                         ¡Listo para empezar a usar el sistema!
                        <br /> <br />
                        </p>
                        <br />
                        <div className='mb-8'>
                        <LinkButton url={routesweb.login} > Regresar </LinkButton>
                        </div>
                        
                    </div>
                </div>
              </div>
          </div>
      </section>
    </Layout>
        </>
    );
}

export default Complete;