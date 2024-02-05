import { formatTimeFull } from "../../../../app/utilities/web/times/formatTimeFull"

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
                        return item.raffle.name
                    }
                }, {
                    header: 'Fecha del sorteo',
                    render: (item,index) => {
                        return formatTimeFull(item.raffle.draw_date)
                    }
                }, {
                    header: 'Nº Boleto',
                    render: (item,index) => {
                        return item.order
                    }
                }, {
                    header: 'Código del boleto',
                    render: (item,index) => {
                        return item.code
                    }
                }, {
                    header: 'Fecha de compra',
                    render: (item,index) => {
                        return formatTimeFull(item.created_at)
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