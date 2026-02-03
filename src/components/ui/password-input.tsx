import { useState } from "react";
import { Input } from "./input";
import { TbEye, TbEyeOff } from "react-icons/tb";

// type PasswordInputProps = {
//   password?: string;
//   setPassword?: (password: string) => void;
//   disabled?: boolean;
// };
export default function PasswordInput({ ...props }: any) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2 relative">
      <Input
        type={show ? "text" : "password"}
        // value={password}
        // onChange={(e: any) => setPassword!(e.target.value)}
        {...props}
      />
      {/* <div
        className="absolute   top-3 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {show ? <TbEyeOff size={18} /> : <TbEye size={18} />}
      </div> */}
    </div>
  );
}
