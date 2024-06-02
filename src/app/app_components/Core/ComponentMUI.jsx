import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import appTheme from '../../config/materialUI';


const ComponentMUI = ({children}) => {

    return(
        <>
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {children}
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
}


export default ComponentMUI;