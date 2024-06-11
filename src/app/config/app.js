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
    tokenPP: 'NpwSvbZywEi6bVNaF4iq3O3RTr7Ls2Pkm8Q0wNR0G10dOpNBZEADluVu0EvX13mUHpPaUdX1gRbV_r4RVtO63uiD6OlhrywRSDmW5ZCanYs2gxXPt6J9AlFXL0FN3o65jlJko3gTZI53TIXk7fcqQhm8b-GXYr4XsT4-MLnjAPipLv48tkVIKnk855CtFm7qBT680A3T1nLIbDtT-foY78UJB9xyaF1aJy_4-vuHLwXsOg3FID05YwDYCXVAWq83Aw0Lp2rXyIZM6VgKZLdo04OQHa2gunRTo5pvlqiMsBzJ4JnT8I4DmNilJrnRAIEdTunETPwSQp7YvFM1P17c0EZZRzA'
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