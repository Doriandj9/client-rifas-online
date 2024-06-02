import { createTheme } from '@mui/material/styles';
import { colors } from './app';

const appTheme = createTheme({
    palette: {
        primary: {
            main: colors.primary
        },
        secondary:{
            main: colors.secondary
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif'
    },
    components: {
        MuiPicker: {
          styleOverrides: {
            root: {
              zIndex: 99999,  // Ajusta el zIndex según sea necesario
            },
          },
        },
      },
    components: {
        MuiPopper: {
          styleOverrides: {
            root: {
              zIndex: 1200,  // Ajusta el zIndex según sea necesario
            },
          },
        },
      },
})


export default appTheme;