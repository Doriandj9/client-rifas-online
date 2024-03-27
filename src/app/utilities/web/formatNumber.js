
const formatNumberTwoDigits = Intl.NumberFormat('es',{
    minimumFractionDigits: 2,
    minimumIntegerDigits:1,
    maximumFractionDigits:2
}).format;

export {formatNumberTwoDigits}