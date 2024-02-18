import Layout from "@app/app/layouts/Layout";
import { credentials } from "../../../../app/config/app";
import routesapi from "../../../../app/config/routesapi";
import { useSetHeader } from "../../../../app/utilities/hooks/web/useSetHeader";


const url = credentials.server + routesapi.public_raffles;

function App() {
useSetHeader('Términos y Condiciones');

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
                    Términos y Condiciones
                  </h1>
                  {/* <img className='w-32 h-22 block m-auto' src={logo} alt="" /> */}
                  <p className="px-8 py-2">
                    Los términos y condiciones estipulan la operación de la
                    venta, concursos y sorteos a través del sistema de rifas
                    online <span className="font-bold italic">HAYU24.</span>
                  </p>
                  <ol className="list-decimal px-8 py-2">
                    <li className="font-bold mb-2">
                      Definiciones:
                      <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                          <span className="font-bold">"Cliente":</span>{" "}
                          <span className="font-normal">
                            {" "}
                            Individuo o entidad que utiliza HAYU24 para
                            participar en rifas.{" "}
                          </span>
                        </li>
                        <li className="font-normal mb-1">
                          <span className="font-bold">
                            "Cliente Organizador de Rifas":
                          </span>{" "}
                          <span className="font-normal">
                            Cliente que utiliza el sistema de rifas online para
                            crear, administrar y promover rifas.{" "}
                          </span>
                        </li>
                        <li className="font-normal mb-1">
                          <span className="font-bold">"Rifas":</span>{" "}
                          <span className="font-normal">
                            {" "}
                            Eventos organizados a través del sistema de rifas
                            online donde los participantes pueden comprar
                            boletos para tener la oportunidad de ganar premios.{" "}
                          </span>
                        </li>
                      </ol>
                    </li>
                    <li className="font-bold mb-2">
                      Uso del Sistema:
                      <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                          El cliente puede usar el sistema de rifas online para
                          participar en rifas organizadas por otros clientes.
                        </li>
                        <li className="font-normal mb-1">
                          El cliente organizador de rifas es responsable de
                          cumplir con todas las leyes y regulaciones aplicables
                          relacionadas con la organización y administración de
                          las rifas.
                        </li>
                      </ol>
                    </li>
                    <li className="font-bold mb-2">
                      Participación en Rifas:
                      <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                          Los participantes deben ser mayores de edad o cumplir
                          con los requisitos de edad establecidos por las leyes
                          para participar en rifas.
                        </li>
                        <li className="font-normal mb-1">
                        Al participar en una rifa, los participantes aceptan cumplir con todas las reglas y términos
establecidos el sistema de rifas online <span className="font-bold">HAYU24.</span>
                        </li>
                      </ol>
                    </li>
                    <li className="font-bold mb-2">
                    Registro:
                    <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                        Sólo podrán acceder y hacer uso del sistema de rifas online <span className="font-bold">HAYU24</span>, las personas jurídicas
y las personas físicas mayores de 18 años de edad.
                        </li>
                        <li className="font-normal mb-1">
                        Nos reservamos el derecho de rechazar solicitudes de registro, a nuestra entera discreción y
sin la obligación de proporcionar una razón específica.
                        </li>
                        <li className="font-normal mb-1">
                        Antes de utilizar el servicio, es necesario completar personalmente el formulario de registro
y leer, así como aceptar, las condiciones publicadas en la plataforma, incluyendo los términos y
condiciones.
                        </li>
                        <li className="font-normal mb-1">
                        <span className="font-bold">HAYU24.</span> puede solicitar cualquier documento de identificación a los “Cliente Organizador
de Rifas” con el fin de verificar su identidad.
                        </li>
                      </ol>
                    </li>
                    <li className="font-bold mb-2">
                    Compra de Boletos:
                    <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                        Los boletos de rifa pueden estar disponibles para su compra a través del sistema de rifas
online <span className="font-bold">HAYU24.</span>
                        </li>
                        <li className="font-normal mb-1">
                        Los precios de los boletos y las opciones de pago serán determinados por el cliente
organizador de la rifa.
                        </li>
                        <li className="font-normal mb-1">
                        Todas las compras de boletos son finales y no reembolsables.
                        </li>
                      </ol>
                    </li>
                    <li className="font-bold mb-2">
                    Selección de Ganadores:
                    <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                        La selección de ganadores se llevará en vivo a la fecha y hora programada en el sistema de
rifas online<span className="font-bold">HAYU24.</span>
                        </li>
                        <li className="font-normal mb-1">
                        La selección de ganadores se llevará a cabo de manera imparcial y aleatoria, utilizando el
sistema de rifas online <span className="font-bold">HAYU24</span> por el cliente organizador de la rifa.
                        </li>
                        <li className="font-normal mb-1">
                        Se garantizará que todos los participantes tengan una oportunidad equitativa de ganar,
independientemente de su asistencia de forma presencial o virtual al evento de entrega de
premios.
                        </li>
                        <li className="font-normal mb-1">
                        A los ganadores serán notificados mediante el sistema de rifas y a través de medios
electrónicos detallados al participar en la rifa.
                        </li>
                        <li className="font-normal mb-1">
                        Se harán todos los esfuerzos razonables para comunicarse con los ganadores y notificarles
sobre su premio, incluso si no estuvieron presentes en el evento de entrega de premios.
                        </li>
                      </ol>
                    </li>
                    <li className="font-bold mb-2">
                    Responsabilidades del Cliente Organizador de Rifas
                    <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                        El cliente organizador de la rifa es el único responsable de la administración, promoción y
entrega de premios de la rifa.
                        </li>
                        <li className="font-normal mb-1">
                        El cliente organizador de la rifa garantiza que todas las rifas organizadas a través del sistema
de rifas online <span className="font-bold">HAYU24</span> cumplirán con todas las leyes y regulaciones aplicables.
                        </li>
                        <li className="font-normal mb-1">
                        El cliente organizador hará todos los esfuerzos razonables para comunicarse con los
ganadores y notificarles sobre su premio, incluso si no estuvieron presentes de forma
presencial o virtual en el evento de entrega de premios.
                        </li>
                        <li className="font-normal mb-1">
                        El cliente organizador se esforzará por mantener la confianza de los participantes al
garantizar que el proceso de selección y entrega de premios sea justo y equitativo para
todos.
                        </li>
                      </ol>
                    </li>
                    <li className="font-bold mb-2">
                    Prohibiciones clientes:
                    <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                        El usuario es responsable de la confidencialidad de su información, de no proporcionar a
terceros su cuenta, contraseña, etc. <span className="font-bold">HAYU24</span> no se hace responsable del manejo de dicha
información por terceros, por causas imputables al usuario.
                        </li>
                        <li className="font-normal mb-1">
                        Se prohíbe el uso de lenguaje obsceno en cualquier apartado del registro incluyendo el
correo electrónico, contraseña, etc., <span className="font-bold">HAYU24</span>, se reserva el derecho a rehusar el servicio a
cualquier persona que así lo realice.
                        </li>
                        <li className="font-normal mb-1">
                        Está totalmente prohibido el uso de cualquier tipo de trampa, listas rellenadas, premios no
entregados, o cualquier tipo de estafa.
                        </li>
                        <li className="font-normal mb-1">
                        Si <span className="font-bold">HAYU24</span> recibe denuncias y comprobamos que se ha hecho trampa, cancelaremos su
cuenta sin derecho a reembolso y se le prohibirá como cliente de nuestra plataforma.
                        </li>
                      </ol>
                    </li>
                    <li className="font-bold mb-2">
                    Modificaciones y Terminación:
                    <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                        El sistema de rifas online se reserva el derecho de modificar, suspender o terminar los
servicios en cualquier momento y sin previo aviso.
                        </li>
                        <li className="font-normal mb-1">
                        Los clientes serán notificados de cualquier cambio en los términos y condiciones a través del
sistema de rifas online <span className="font-bold">HAYU24</span>  y medios electrónicos.
                        </li>
                      </ol>
                    </li>
                    <li className="font-bold mb-2">
                    Disposiciones Generales:
                    <ol
                        className="ms-10"
                        style={{ listStyleType: "lower-alpha" }}
                      >
                        <li className="font-normal mb-1">
                        Estos términos y condiciones constituyen el acuerdo completo entre el cliente y el sistema
de rifas online con respecto al uso del sistema.
                        </li>
                        <li className="font-normal mb-1">
                        Cualquier disputa o reclamación relacionada con el uso del sistema de rifas online se
resolverá de acuerdo con las leyes aplicables.
                        </li>
                      </ol>
                    </li>
                  </ol>
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
