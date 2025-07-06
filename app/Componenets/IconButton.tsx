import { ReactNode } from "react";



export function IconButton2({icon, onClick , activated} : {
    icon: ReactNode,
    onClick : () => void,
    activated : boolean

}){

    return <div className={` pointer rounded border p-2  bg-black hover:bg-gray ${activated ? "text-purple-500" : "text-white" } `}
      onClick={onClick}
    >
        {icon}
    </div>
}