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
        MuiDialog: {
          styleOverrides: {
            root: {
              zIndex: 9999
            }
          }
        },
        MuiPopper: {
          styleOverrides: {
            root: {
              zIndex: 9999
            }
          }
        },
        MuiPopover: {
          styleOverrides:{
            root: {
              zIndex: 9999
            }
          }
        },
        MuiPaper: {
        styleOverrides: {
          root: {
            zIndex: 9999
          }
        }
        },
        MuiPickersPopper:{
          styleOverrides: {
            root: {
              zIndex: 9999
            }
          }
        }
      },
    
})


export default appTheme;