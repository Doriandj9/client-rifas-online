import { formatNumberTwoDigits } from "../../../../app/utilities/web/formatNumber";
import { formatTimeFull } from "../../../../app/utilities/web/times/formatTimeFull";

const setStateColor = (code) => {
    const status = {
        'DR': {message: 'Pendiente', style: 'bg-yellow-900 text-white p-2 text-sm rounded-xl'},
        'CL': {message: 'Cancelado', style: 'bg-red-600 text-white p-2 text-sm rounded-xl'},
        'AC': {message: 'Completado', style: 'bg-green-600 text-white p-2 text-sm rounded-xl'},
        'DO': {message: 'En Proceso', style: 'bg-amber-700 text-white p-2 text-sm rounded-xl'}
    };
    const inf = status[code];
    const html = `
    <span class="${inf.style}"> ${inf.message}</span> 
    `;

    return html;
}

export default {
    data(){
        return {
            columns:[
                {
                    header: 'Nº',
                    render: (item,index) => {
                        return index
                    }
                }, {
                    header: 'Nombre de la rifa',
                    render: (item,index) => {
                        return item.name
                    }
                }, {
                    header: 'Fecha del sorteo',
                    render: (item,index) => {
                        return formatTimeFull(item.draw_date)
                    }
                }, {
                    header: 'Cédula del organizador',
                    render: (item,index) => {
                        return item.user.taxid
                    }
                }, {
                    header: 'Organizador',
                    render: (item,index) => {
                        return item.user.first_name + ' ' + item.user.last_name
                    }
                }, {
                    header: 'Ultima actualización',
                    render: (item,index) => {
                        return formatTimeFull(item.updated_at)
                    }
                }
                
            ],
            actionColumns: {
                    header: 'Acciones',
                    list:[]
                }
                
        }
    } 
}