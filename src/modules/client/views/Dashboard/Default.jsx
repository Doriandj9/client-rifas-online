import { useAuth } from "../../../../app/store/app/userStore";
import Modal from "./Modal";

const Default = () => {
    const user = useAuth(state => state.user);
    return (
        <>
            defecto
            <Modal />
        </>
    );
}

export default Default;