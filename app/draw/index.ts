import { Http_BackendUrl } from "../config";
import axios from "axios"

type Shape = {
    type : "rect";
    x: number;
    y: number;
    width: number;
    height:number;

} | {
    type: "circle";
    centerX : number;
    centerY : number;
    radius: number;
} | {
    type : "pencil";
    startX : number;
    startY : number;
    endX : number;
    endY: number;
} | {
    type: "line";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
} | {
    type: "eclipse";
    centerX: number;
    centerY: number;
    radiusX: number;
    radiusY: number;
} | {
    type : "text";
    x:number;
    y: number;
    content:string;
    fontSize?: number;
    fontFamily?: string;
} 




const initDraw = async(canva:HTMLCanvasElement, roomId:string, socket : WebSocket) => {

         const ctx = canva.getContext("2d");

         const existingShape: Shape[] = await getExistingShapes(roomId)

        if(!ctx){
            return 
        }

        socket.onmessage=(event)=>{
            const message = JSON.parse(event.data);
            if(message.type=="chat"){
                const parseData = JSON.parse(message.message)
                existingShape.push(parseData.shape)
                 clearCanva(existingShape,canva,ctx)
            }
        }

        clearCanva(existingShape,canva,ctx)


        let clicked = false
        let startX = 0;
        let startY =0;
        let pencilPath: {startX: number, startY : number, endX : number, endY : number}[]
        let lastX = 0;
        let lastY = 0;

        canva.addEventListener("mousedown" ,(e)=>{
            clicked = true
            // startX = e.clientX;
            // startY = e.clientY;

              startX = e.offsetX;
             startY = e.offsetY;
             lastX = e.offsetX;
             lastY = e.offsetY;
             pencilPath = [];
         

            // @ts-expect-error react
            const selectedTool = window.selectedTool;
            console.log("selected tool", selectedTool);
          
            if(selectedTool === "text"){
                clicked = false;
              

                 
                  requestAnimationFrame(() => {
    const canvasRect = canva.getBoundingClientRect();
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type here...";
    input.style.position = "fixed";
    input.style.left = `${canvasRect.left + e.offsetX}px`;
    input.style.top = `${canvasRect.top + e.offsetY - 10}px`;
    input.style.fontSize = "20px";
    input.style.color = "white";
    input.style.background = "transparent";
    input.style.border = "none";
    input.style.outline = "none";
    input.style.zIndex = "1000";

    document.body.appendChild(input);
    input.focus();

    let isHandled = false;

    const cleanup = () => {
      if (!isHandled) {
        isHandled = true;
        if (input.parentNode) input.parentNode.removeChild(input);
      }
    };

    const handleSubmit = () => {
      if (isHandled) return;
      const content = input.value.trim();
      cleanup();
      if (!content) return;

      const shape: Shape = {
        type: "text",
        x: startX,
        y: startY,
        content,
        fontSize: 20,
        fontFamily: "Arial",
      };

      existingShape.push(shape);

      // Send clean data
      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({shape}),
          roomId,
        })
      );

      clearCanva(existingShape, canva, ctx);
    };

    input.addEventListener("keydown", (eKey) => {
      if (eKey.key === "Enter") {
        eKey.preventDefault();
        handleSubmit();
      } else if (eKey.key === "Escape") {
        eKey.preventDefault();
        cleanup();
      }
    });

    input.addEventListener("blur", () => {
      setTimeout(() => {
        if (!isHandled) handleSubmit();
      }, 100);
    });
  });

  return;
                 


}

        })

        canva.addEventListener("mouseup", (e)=>{
            clicked = false       

        //    @ts-expect-error
           const selectedTool = window.selectedTool ;
           let shape: Shape | null=null;
           if(selectedTool === "rect"){

            const width = e.offsetX - startX;
            const height = e.offsetY - startY;

            shape={
                type : "rect",
                x :startX,
                y:startY,
                height,
                width
            }
           }else if(selectedTool === "circle"){
            const width = e.offsetX - startX;
            const height = e.offsetY - startY;
            const radius = Math.abs(Math.max(width, height)) / 2;
            shape={
                type:"circle",
                radius : radius,
                centerX : startX+width/2,
                centerY: startY
            }
           }else if(selectedTool === "pencil"){

            pencilPath.forEach((line)=>{
                const pencilShape: Shape ={
                    type: "pencil",
                    ...line,
                }

                existingShape.push(pencilShape);
                socket.send(JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({ shape: pencilShape }),
                    roomId: roomId
                }))
            })
           return;
           }else if(selectedTool === "line"){

            shape = {
                type: "line",
                startX: startX,
                startY: startY,
                endX: e.offsetX,
                endY: e.offsetY
            }
           }else if(selectedTool === "eclipse"){
            const width = e.offsetX - startX;
            const height = e.offsetY - startY;
            shape = {
                type: "eclipse",
                centerX: startX + width / 2,
                centerY: startY + height / 2,
                radiusX: Math.abs(width) / 2,
                radiusY: Math.abs(height) / 2
            }
           }

           if(!shape){
            return;
           }


        //    const shape : Shape = {
        //      type: "rect",
        //     x:startX,
        //     y:startY,
        //     width:width,
        //     heigth:height
        //    }
           existingShape.push(shape)

           socket.send(JSON.stringify({
            type :"chat",
            message: JSON.stringify({shape}),
            roomId

           }))
            console.log("u:",e.clientX);
            console.log("u",e.clientY);

        })



        canva.addEventListener("mousemove",(e)=>{
            if(clicked){
        //    const   width = e.clientX-startX;
        //    const   height = e.clientY-startY;
        //    clearCanva(existingShape,canva,ctx)
         const width = e.offsetX - startX;
    const height = e.offsetY - startY;
    clearCanva(existingShape, canva, ctx);
        
            ctx.strokeStyle="rgba(255,255,255)"
          // @ts-expect-error react
 const selectedTool = window.selectedTool;
    ctx.strokeStyle = "rgba(255,255,255)";
    ctx.lineWidth = 2
            if(selectedTool === "rect"){
                ctx.strokeRect(startX,startY,width,height);
            }else if(selectedTool === "circle"){
                      const radius = Math.abs(Math.max(width, height)) / 2;
                    const centerX = startX + width / 2;
                    const centerY = startY + height / 2;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.closePath();
             
            } else if(selectedTool === "pencil"){

                const currentX = e.offsetX;
                const currentY = e.offsetY;

                pencilPath.push({
                    startX: lastX,
                    startY: lastY,
                    endX: currentX,
                    endY: currentY
                })
                 lastX = currentX;
        lastY = currentY;

         ctx.beginPath();
         ctx.moveTo(pencilPath[pencilPath.length - 1].startX, pencilPath[pencilPath.length - 1].startY);
        ctx.lineTo(pencilPath[pencilPath.length - 1].endX, pencilPath[pencilPath.length - 1].endY);
            ctx.stroke();
            ctx.closePath();

            }else if(selectedTool === "line"){
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
            }else if(selectedTool === "eclipse"){
                ctx.beginPath();
                ctx.ellipse(startX + width /2, startY + height / 2, Math.abs(width) /2 , Math.abs(height) / 2, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();
            }
        }
    })
       
    
    
function clearCanva(existingShape: Shape[], canva: HTMLCanvasElement, ctx : CanvasRenderingContext2D){
         
            ctx.clearRect(0,0,canva.width,canva.height);
            ctx.fillStyle="rgba(0,0,0)"
            ctx.fillRect(0,0,canva.width,canva.height);

            existingShape.map((shape)=>{
                if (shape.type === "rect") {
            ctx.strokeStyle = "rgba(255, 255, 255)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }else if (shape.type === "circle") {
            const radius = Math.abs(shape.radius);
    if (radius > 0) {
        ctx.beginPath();
        ctx.arc(shape.centerX, shape.centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }             
        }else if(shape.type === "pencil"){
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.endX, shape.endY);
              ctx.strokeStyle = "rgba(255, 255, 255)";
        ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

        }else if(shape.type === "line"){
             ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.endX, shape.endY);
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.lineWidth = 2;
             ctx.stroke();
              ctx.closePath();
        }else if(shape.type === "eclipse"){
              ctx.beginPath();
               ctx.ellipse(
                shape.centerX,
                 shape.centerY,
                  shape.radiusX,
                shape.radiusY,
                  0,
                  0,
                 2 * Math.PI
  );
  ctx.strokeStyle = "rgba(255, 255, 255)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
        }else if(shape.type === "text"){
            ctx.font = `${shape.fontSize || 20}px ${shape.fontFamily || "Arial"}`;
            ctx.fillStyle = "rgba(255, 255, 255)";
            ctx.fillText(shape.content, shape.x, shape.y);
        }

        })
    
}
}
export default initDraw

 async function getExistingShapes(roomId: string){
    const res = await axios.get(`${Http_BackendUrl}/chats/${roomId}`);
    const messages = res.data.messages;

   const shapes = messages.map((x:{message :string})=>{
    const messageData = JSON.parse(x.message)
    return messageData.shape
   })
   return shapes;
}