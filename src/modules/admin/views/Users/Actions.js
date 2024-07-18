import {  MdLockReset } from "react-icons/md";
import { FaUserLargeSlash } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
export default [{
        name: 'Restaurar contraseña',
        icon: MdLockReset,
        color: 'blue.700',
        element: null,
        onclick: () => {
            console.log('click | Editar');
        }
    }, {
     name: 'Bloquear usuario',
     icon: FaUserLargeSlash,
     color: 'red.700',
     element: null,
     onclick: () => {
         console.log('click | Editar');
     }
 }, {
    name: 'Editar Perfil',
    icon: FaUserEdit,
    color: 'green.700',
    element: null,
    onclick: () => {
        console.log('click | Editar');
    }
},
];