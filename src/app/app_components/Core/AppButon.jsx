import { Button } from "@chakra-ui/react";
import { colors } from "../../config/app";
const AppButton = ({className= "", type="button", leftIcon, rightIcon,colorScheme="", onClick = () => {}, children} ) => {
    return (
        <Button className={className} leftIcon={leftIcon} rightIcon={rightIcon}
        type={type}
        colorScheme={colorScheme}
        onClick={onClick}
        bgColor={colors.primary} color='white' 
        _hover={{bgColor: colors.primaryop[900]  }}
        >
            {children}
        </Button>
    );
}

export default AppButton;