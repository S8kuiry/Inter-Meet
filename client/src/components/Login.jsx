import React, { useContext } from "react";
import { SignIn } from "@clerk/clerk-react";
import { X } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const {setLogin} = useContext(AppContext)

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-40 flex items-center justify-center p-4">

{/*-------------- cross ------------- */}
<div className="absolute top-10 cursor-pointer active:scale-96 hover:scale-105 transition-all duration-300 right-10 ">
  <X onClick={()=>setLogin(false)} className="text-white size-6 font-semibold" />
</div>

      <div className="bg-gray-900/60 rounded-xl p-6 shadow-xl border border-gray-700/50">
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
