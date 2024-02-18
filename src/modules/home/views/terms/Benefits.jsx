import Layout from "@app/app/layouts/Layout";
import { useSetHeader } from "../../../../app/utilities/hooks/web/useSetHeader";


const Benefits = () => {
useSetHeader('Beneficios');
    return (
        <>
      <Layout>
        <section className="bg-white dark:bg-gray-900">
          <div className=" max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-2 lg:py-16 lg:pt-20">
            <div className="relative">
              {/* <div className='lg:-top-20 lg:left-40 lg:absolute relative -top-10'>
                <Lottie options={{animationData: party, ...lottieOptions}}  width={125} height={125} />
            </div>
            <h1 className='text-xl italic font-bold text-primary text-center'> Encuentra la mejor rifa y cómprala para ganar muchos premios. </h1> */}
              <div className="flex gap-6 mt-8">
                <div className="max-w-screen-xl pt-2 px-4 pb-2 w-full lg:gap-8 xl:gap-16 lg:py-2 lg:pt-2">
                  <h1 className="text-black font-bold text-center text-2xl">
                  BENEFICIOS
                  </h1>
                  {/* <img className='w-32 h-22 block m-auto' src={logo} alt="" /> */}
                  <p className="px-8 py-2">
                  Beneficios de nuestra plataforma de rifas online
                    <span className="font-bold italic">HAYU24.</span>
                  </p>
                  <ul className="list-disc px-12">
                    <li className="font-bold mt-3">
                     Accesibilidad: <span className="font-normal">
                     Permite a los participantes acceder y participar en rifas desde cualquier
lugar con conexión a internet.
                     </span>
                    </li>
                    <li className="font-bold mt-3">
                    Comodidad: <span className="font-normal">
                    Facilita el proceso de participación al permitir a los usuarios comprar
boletos y participar en rifas desde la comodidad de sus hogares o dispositivos móviles.
                     </span>
                    </li>
                    <li className="font-bold mt-3">
                    Seguridad: <span className="font-normal">
                    Garantiza la seguridad de las transacciones y la protección de los datos
personales de los participantes, utilizando protocolos de seguridad avanzados.
                     </span>
                    </li>
                    <li className="font-bold mt-3">
                    Variedad de Rifas: <span className="font-normal">
                    Ofrece una amplia variedad de rifas con diferentes premios y
temáticas, brindando opciones para todos los gustos e intereses.
                     </span>
                    </li>
                    <li className="font-bold mt-3">
                    Facilidad de Uso: <span className="font-normal">
                    Presenta una interfaz intuitiva y amigable que facilita la navegación y
el uso del sistema tanto para organizadores como para participantes.
                     </span>
                    </li>
                    <li className="font-bold mt-3">
                    Promoción de la Solidaridad: <span className="font-normal">
                    Fomenta la solidaridad al permitir que las rifas se utilicen
como una herramienta para recaudar fondos para causas benéficas y proyectos sociales.
                     </span>
                    </li>
                    <li className="font-bold mt-3">
                    Ahorro de Tiempo y Recursos: <span className="font-normal">
                    Reduce el tiempo y los recursos necesarios para
organizar y participar en rifas, al eliminar la necesidad de procesos manuales y
presenciales.
                     </span>
                    </li>
                    <li className="font-bold mt-3">
                    Innovación: <span className="font-normal">
                    Introduce nuevas formas de participación en rifas, como sorteos en vivo,
integración con redes sociales y otros elementos interactivos que mejoran la experiencia
del usuario.
                     </span>
                    </li>
                    <li className="font-bold mt-3">
                    Apoyo a la Comunidad: <span className="font-normal">
                    Contribuye al fortalecimiento de la comunidad al brindar una
plataforma donde los miembros pueden apoyarse mutuamente y colaborar en la
realización de proyectos y eventos beneficiosos para todos.
                     </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
    );

}

export default Benefits;