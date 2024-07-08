const urlLocal = 'http://127.0.0.1:8000';
const urlProduction = 'https://server.hayu24.ec';
const urlPreprod = 'https://test.api.hayu24.ec';
const credentials = {
    server: urlPreprod,
    dominio: 'https://test.hayu24.ec/'
};

const application =  {
    paginateCount: 10,
    paginateRaffles: 8,
    environment: 'test',
    tokenPP: 'rARBcXXKXH5n4lTbimn3vogn-Dndh9YHMjTJv7Fw2ctVKSxVstw-mNO5I8b6knLT4l4xE1TWSdyKYZwSJqHIoP49vb51sR15tRDpohAl1mbpMmTCiIpZfekakMm9weo7CE-gXNowZO1qsXg1ueR1ygbZhXVGgC0f3SiRKyQ-OvM8mgBNHEuLVgIMFZdAt8Eqb4orLfYgoRvGRVU6IhCDjZDTdvnUWjA66vZvJvdGqbuuR9WBFrFkZrm-YNpCdkKW_42DwF9mssNfwn6JrgF1Nk1KCPb77EECISbCLm5enTFMaH8rkgHKk1eBR8eDn4wMMoypXEJ5HOePdLX6h5Mp4zxjdAQ'
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