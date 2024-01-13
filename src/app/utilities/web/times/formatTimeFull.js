import moment from "moment"
/**
 * 
 * @param {string} date 
 */
const formatTimeFull = (date)=> {
    moment.locale('es_ES');
   const dateFormat = moment(date);
   return dateFormat.format('YYYY-MM-DD hh:mm');
}

export {formatTimeFull}