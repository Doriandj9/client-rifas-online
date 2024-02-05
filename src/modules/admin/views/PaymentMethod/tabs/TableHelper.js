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
                    header: 'Nombre de la entidad bancaria',
                    render: (item,index) => {
                        return item.bank_name
                    }
                }, {
                    header: 'Número de cédula de la cuenta',
                    render: (item,index) => {
                        return item.taxid
                    }
                }, {
                    header: 'Nombre de la cuenta',
                    render: (item,index) => {
                        return item.name_account
                    }
                }, {
                    header: 'Número de la cuenta bancaria',
                    render: (item,index) => {
                        return item.account_number
                    }
                },  {
                    header: 'Tipo de cuenta',
                    render: (item,index) => {
                        return item.type
                    }
                }, {
                    header: 'Fecha de creación',
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