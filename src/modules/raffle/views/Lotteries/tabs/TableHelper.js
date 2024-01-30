import { formatTimeFull } from "../../../../../app/utilities/web/times/formatTimeFull"

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
                    header: 'Nombre',
                    render: (item,index) => {
                        return item.name
                    }
                }, {
                    header: 'Descripción',
                    render: (item,index) => {
                        return item.description
                    }
                }, {
                    header: 'Numero de tickets',
                    render: (item,index) => {
                        return item.number_tickets
                    }
                }, {
                    header: 'Precio',
                    render: (item,index) => {
                        return item.price
                    }
                }, {
                    header: 'Estado',
                    render: (item,index) => {
                        return item.is_complete ? 'Completada' : 'En curso'
                    }
                },  {
                    header: 'Fecha del sorteo',
                    render: (item,index) => {
                        return formatTimeFull(item.draw_date);
                    }
                },  {
                    header: 'Fecha del creación',
                    render: (item,index) => {
                        return formatTimeFull(item.created_at);
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