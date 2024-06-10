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
    tokenPP: '3kd71ikimtqtnB2759DH4etz_FVDzT57UIXuQ66SiG8S5EoXRVSOB1nynL_lQnUcFdcOGkQP1Qfff0NLxsTR6wTKn9D56NY2IJf-bpvOZ0m2fOs62ho6sTbM3ispCBZ5-nQbP47iV3Q5Cw2rILflMF4WLl3aD8MQ1657S6PsunPkgqqyYpdx2TNNlz9RaW6S3EhtGgHvlXFPHjn5WKDErfFAEGEmDyS3ud-tecrcajc1poJ1FOFhQEU0bQ_vStX-1IHt5kcbkCYiCjeZ1Kr_sch6GZ06wy0tGLZavqq2U6njQqO5xe0Y17GBT8f70fIEnWDp4bNPG4tQ6_d4Nj7Ptrptk9U'
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