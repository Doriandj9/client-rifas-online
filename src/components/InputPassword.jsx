import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { LuEye } from "react-icons/lu";

const InputPassword = ({ name=null, password = null, handleInput = null}) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => setVisible(!visible)

  return (
    <div className="flex">
      <Input
        onInput={handleInput ? handleInput : () => {}}
        value={password ? password : ''}
        name={name ? name : 'password'}
        type={visible ? 'text' : 'password'}
        className="shadow"
        height={50}
        placeholder="*********"
      />
      <div className="bg-slate-100 px-4 flex items-center justify-center shadow rounded-tr-md rounded-br-md ">
        <LuEye className="w-6 h-6 text-primary cursor-pointer hover:text-green-500 duration-300" onClick={handleVisible}  />
      </div>

    </div>
  );
};


export default InputPassword;