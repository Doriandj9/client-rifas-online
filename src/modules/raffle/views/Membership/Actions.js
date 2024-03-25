
import { FaThumbsDown } from "react-icons/fa6";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa6";
import { FaCommentDollar } from "react-icons/fa6";


export default [
    {
        name: 'Validación de afiliación',
        icon: FaUserCheck,
        color: 'green.600',
        element: null,
        validation: (item) => {
            return item.status === 'DR' ? 'animate animate-bounce' : '';
        },
        onclick: () => {
            console.log('click | Editar');
        }
    },
    {
     name: 'Cancelar afiliación.',
     icon: FaThumbsDown,
     color: 'red.700',
     element: null,
     onclick: () => {
         console.log('click | Editar');
     }
 },
 {
    name: 'Realizar pago de comisión.',
    icon: FaCommentDollar,
    color: 'green.900',
    element: null,
    validation: (item) => {
        return item.raffle.is_complete ? 'animate animate-bounce' : ''
    },
    onclick: () => {
        console.log('click | Editar');
    }
}
];