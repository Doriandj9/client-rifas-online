const urlLocal = 'http://127.0.0.1:8000';
const urlProduction = 'https://server.hayu24.ec';
const urlPreprod = 'https://test.api.hayu24.ec';
const credentials = {
    server: urlProduction,
    dominio: 'https://test.hayu24.ec/'
};

const application =  {
    paginateCount: 10,
    paginateRaffles: 8,
    environment: 'prod',
    tokenPP: 'TKcw0HrBGR5CbKwNU1ikwvqqhXZMIQRTgTydnk0HR9tPV6BVa7DrN5qbx-ocvbT4YGM2wfn9E_f8tNp0H3e6bpZ-F7kXlb7jWFtbT3wk6L2n9h_B1VS9uBC8Jv_uWwo-8_HCQ3hajDBqsLNlXS4Dw6rwW7pVs9VlKtBDSkPW-Bjv_6EVM4gOz_3-FhdwW8L0RSAGLstldLb4k4jQDSwvnbnEVyTV7fnc31x5plz0FRs6aCQISfwP2oX1iNW2iSRiHuV8YAB_3T4GfYkNjVGAy3f0fDQ9o2nnXdglGgB200Y96r_xyXJ9kWRJ6hiGv0BBeM65CG0Lyy0kl1stnA0YGNNKYjw'
}

const colors = {
    primary: '#003049',
    primaryop: {
        '50': '#eefaff',
        '100': '#dcf5ff',
        '200': '#b2edff',
        '300': '#6de1ff',
        '400': '#20d3ff',
        '500': '#00beff',
        '600': '#0099df',
        '700': '#0079b4',
        '800': '#006795',
        '900': '#00547a',
    },    
    secondary: '#D62829',
    secondaryop : {
        '50': '#fef2f2',
        '100': '#fde3e3',
        '200': '#fdcbcb',
        '300': '#faa7a7',
        '400': '#f57475',
        '500': '#eb4849',
        '700': '#b52021',
        '800': '#961e1f',
        '900': '#7c2021',
        '950': '#430c0c',
    },

}

export {credentials, colors, application};