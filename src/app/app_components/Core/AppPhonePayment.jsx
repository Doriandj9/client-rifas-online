import { useEffect } from 'react';
import './../../../styles/paymentroot.css'
import { application } from '../../config/app';

const AppPhonePayment = ({handleClick = () => {}, children, transactionId, parameters}) => {
    
    
    useEffect(() => {
        const link = document.createElement('link');
        const script = document.createElement('script');
        link.href = 'https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
    
        script.src = 'https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.js';
        script.type = 'module';
        script.async = true;
        
        document.head.prepend(link);
        document.body.appendChild(script);

        const searchButton = () => {
          const ppButton = document.getElementById('pp-button');
          let button = ppButton.querySelector('form');
          let interval = null;
            if(!button){
                interval = setInterval(() => {
                button = ppButton.querySelector('form');
                if(button){
                    clearInterval(interval);
                    button.addEventListener('submit',handleClick);
                }
                },500)
            }
        }

        setTimeout(() => {
            const ppb = new PPaymentButtonBox({
                token: application.tokenPP,
                // Amount = amountWithoutTax + AmountWithTax + AmountWithTax + Tax + service + tip
                // Todos los valores se multiplican por 100, es decir $1 = 100, $15.67 = 1567
            
                amount: parameters.amount, // monto total de venta
                amountWithoutTax: parameters.amount, //monto total que no cobra iva
                amountWithTax:0, //monto total que si cobra iva
                tax: 0,//monto del iva
                service: 0,//Si existe monto por servicio
                tip:0,//si existe monto por propina
            
                //storeId:"", Identificador de la sucursal que cobra. Puedes obtener este campo desde la consola de Payphone Developer. Si lo envias se cobra con la sucursal indicada, si no lo envias se cobra con la sucursal matriz.
            
                reference:"PAYMENT HAYU24", //Referencia de pago
                clientTransactionId: transactionId, ////id unico. debe cambiar para cada transaccion,
                extra: 'dasdad'
                }).render('pp-button');
                Promise.resolve(searchButton());
        },500)
        return () => {
            document.body.removeChild(script);
            document.head.removeChild(link);
        }

    },[])

    return (
        <>
            {children}
            <div id="pp-button"></div>
        </>
    );
}

export default AppPhonePayment;