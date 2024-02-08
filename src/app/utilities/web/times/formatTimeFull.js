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

const formatTimeDate = (date) => {
    moment.locale('es');
    return moment(date).format('DD MMM YYYY').toUpperCase();
}

const formatTimeDateHour = (date) => {
    moment.locale('es');
    return moment(date).format('hh:mm A').toUpperCase();
}

export {formatTimeFull, formatTimeDate, formatTimeDateHour}