"use client"

type ToolType = "circle" | "rect" | "pencil" | "line" | "eclipse" | "text" ;


import { useEffect, useRef, useState } from "react"
import initDraw from "../draw"
// import { IconButton } from "./Icon"
import { ArrowLeft, Circle,  CircleAlert,  CircleDashed,   Pencil, RectangleHorizontalIcon, Slash, TextCursorInput } from "lucide-react"
import Link from "next/link";
import { IconButton2 } from "./IconButton";



const CanavsPage = ({ roomId , socket } : {
    roomId :string,
    socket: WebSocket
} ) => {
      const canvasRef = useRef<HTMLCanvasElement>(null)
      const [selectedTool, setselectedTool] = useState<ToolType>("rect")
      const [openInstruct, setopenInstruct] = useState(false)

      useEffect(()=>{
 
        // @ts-ignore
        window.selectedTool = selectedTool
      }, [selectedTool])

      useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas(); // initial set

  window.addEventListener("resize", resizeCanvas);
  return () => window.removeEventListener("resize", resizeCanvas);
}, []);

     useEffect(()=>{

      if(canvasRef.current){
        const canva = canvasRef.current
       initDraw(canva, roomId, socket) 

      }

    },[canvasRef]) 
    

  return (
    <div className="h-[100vh] bg-slate-700 overflow-hidden">
      <canvas ref={canvasRef}  className='bg-white' width={window.innerWidth} height={innerHeight} ></canvas>
      <Link href="/dashboard">
      <button className="fixed top-8 left-5  bg-gradient-to-r bg-gradient-to-r from-purple-600 to-blue-600  text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 group/button shadow-lg hover:shadow-blue-500/25 hover:shadow-xl-3.5 ">
      <ArrowLeft/>
      Back</button>
      </Link>
       <TopBar selectedTool={selectedTool} setSelectedTool={setselectedTool}/>
       <button onClick={()=>setopenInstruct(!openInstruct)} className="fixed top-11 left-32  bg-gradient-to-r bg-gradient-to-r from-purple-600 to-blue-600  text-white rounded-full">
       <CircleAlert/>
       </button>
      {
  openInstruct && (
    <div className="fixed top-[5.3rem] left-2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-md border border-purple-500/30 z-50">
      <p>Open with full screen</p>
    </div>
  )
}
    </div>
  )
}

const TopBar=({selectedTool, setSelectedTool}:{
    selectedTool : ToolType,
    setSelectedTool : (s: ToolType) =>void
})=>{
    return <div className=" flex  justify-center">

    <div className="fixed top-8   border border-gray-500 p-2 px-3.5 rounded flex gap-3">
        <IconButton2 icon={<RectangleHorizontalIcon/>} onClick={()=>{setSelectedTool("rect")}} activated={selectedTool==="rect"}></IconButton2>
        <IconButton2 icon={<Circle/>} onClick={()=>{setSelectedTool("circle")}} activated={selectedTool==="circle"}></IconButton2>
        <IconButton2 icon={<Pencil/>} onClick={()=>{setSelectedTool("pencil")}} activated={selectedTool==="pencil"}></IconButton2>
         <IconButton2 icon={<Slash/> } onClick={()=>{setSelectedTool("line")}} activated={selectedTool==="line"}></IconButton2>
         {/* <IconButton icon={<CircleOff/>} onClick={()=>{setSelectedTool}} activated={selectedTool==="none"}></IconButton> */}
         <IconButton2 icon={<CircleDashed/>} onClick={()=>setSelectedTool("eclipse")} activated={selectedTool==="eclipse"}></IconButton2>
         <IconButton2 icon={<TextCursorInput/>} onClick={()=>setSelectedTool("text")} activated={selectedTool==="text"}></IconButton2>
        
    </div>
    </div>
    
}

export default CanavsPage



