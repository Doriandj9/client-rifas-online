import { FormControl, FormLabel, FormErrorMessage,  Input, FormHelperText, List, ListItem, ListIcon} from '@chakra-ui/react'
import { MdCheckCircle } from "react-icons/md";
const FormRaffles = ({photo, handleChange}) => {
    return (
        <>
        <h3 className='text-center font-bold text-primary text-xl mt-6'>Proceso de verificación de usuarios.</h3>
        <p className='mb-8'>Para garantizar la autenticidad de todos nuestros vendedores, compradores y mantener un ambiente seguro para nuestros usuarios, requerimos un proceso de verificación adicional.</p>
        <List spacing={3}>
            <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                Adjunta una imagen clara y legible de tu documento de identificación oficial. Esto nos ayudará a verificar tu identidad una persona vigente ante la ley.
            </ListItem>
            <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                Asegúrate de que la información en el documento de identificación sea claramente visible.
            </ListItem>
            <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                La imagen de validación debe ser reciente para garantizar la autenticidad.
            </ListItem>
            </List>
        <FormControl className='mt-8' isRequired>
                <FormLabel fontWeight={'bold'}>Imagen frontal con la cédula</FormLabel>
                <Input type='file'
                onChange={handleChange} 
                name='photo'
                accept='image/*'
                className='shadow' />
            </FormControl>
        </>
    );
}


export default FormRaffles;