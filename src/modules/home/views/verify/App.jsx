import Layout from '@app/app/layouts/Layout';
import Lottie from 'react-lottie';
import success from '@app/assets/imgs/animations/Animation - 1704578819310.json';
import LinkButton from '../../../../app/app_components/Core/LinkButton';
import routesweb from '../../../../app/config/routesweb';

const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const App = () => {
    const pathAnimation =  'Animation - 1704578819310.json';
    return (
        <>
    <Layout >
        <section className="bg-gray-100 dark:bg-gray-900 md:p-12 sm:p-0">
            <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto sm:w-full">
              <div className='flex items-center mt-12 border border-primary xl:w-5/12 m-auto'>
                <div className='bg-white min-h-[38rem] flex-grow lg:px-4 xl:px-8 sm:px-0 p-0'>
                    <div className='flex justify-center items-center p-4'>
                        <Lottie options={{animationData: success, ...defaultOptions}}  width={150} height={150} />
                    </div>
                    <p className='p-4 text-center w-full  m-auto text-md italic font-bold text-primary mt-4'>Te has registrado correctamente.</p>

                    <div className='p-2 w-11/12 m-auto'>
                        <p>
                        Estamos emocionados de tenerte como parte de nuestra comunidad. Para completar el proceso de registro, por favor revisa tu correo electrónico.
                        <br /> <br />
                        Hemos enviado un mensaje de confirmación a la dirección de correo electrónico que proporcionaste. Haz clic en el enlace de confirmación dentro del correo para activar tu cuenta y sumergirte completamente en todas las experiencias que ofrecemos.
                        <br /> <br />
                        Gracias por elegirnos. ¡Esperamos verte pronto en nuestra plataforma!
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

export default App;