import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import ComponentMUI from './ComponentMUI';
import moment from 'moment';



const AppDateTimePicker = ({name,defaultValue = null,value,handleChange}) => {
  const datetime = moment();
  
  
    return (<>
        <ComponentMUI>
        <DemoItem>
          <DateTimePicker
            defaultValue={defaultValue ? defaultValue : dayjs(datetime.format('YYYY-MM-DD H:mm'))} 
            onChange={(value) => handleChange(value,true)}
            name={name}
            value={value}
          />
        </DemoItem>
        </ComponentMUI>
    </>);
}

export default AppDateTimePicker;