import img from '@app/assets/imgs/inicio_rifas.png'

const Welcome =() => {
    

    return (
        <>
        <h1 className="text-center text-primary font-bold text-3xl">¡Bienvenidos!</h1>
        <h2  className="mt-4 font-bold text-center text-2xl">
        Sistema de Rifas Online <span className="text-secondary text-3xl">HAYU24</span> 
        </h2>
        <p className="text-center text-lg">
            ¡Gracias por unirse a nosotros en este emocionante viaje de ayuda social y diversión!
        </p>
        <div className='flex justify-center mt-6'>
            <img src={img} alt="" />
        </div>
        <h3 className='text-center font-bold mt-6 text-xl'>Ayudamos mientras te diviertes.</h3>
        <h3 className='text-center font-bold text-xl'>¡Participa ahora!"</h3>
        </>
    );

}


export default Welcome;