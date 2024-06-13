import { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

var socket = io("https://minichat-oby5.onrender.com");

export default function Chat() {
  
  var [chats, setChats] = useState([])

  var lastMessage = useRef()
  
  useEffect(() => {
    socket.on("message", (message) => {
      setChats(chats => ([...chats, {message: message, from: "other"}]))
      // console.log("Se recibió un mensaje",message)

    })


    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ /* behavior: "smooth" */ });
    }
  }, [chats]);



  function handleSubmit(e) {
    e.preventDefault()

    socket.emit("message", e.target[0].value)
    setChats([...chats,{message: e.target[0].value, from: "me"}])

    e.target[0].value = ""
  }
    return (
      <div className="flex flex-col h-[80dvh] relative border border-black rounded-lg pb-[70px]">
        <div className="flex flex-col gap-4 w-full h-full overflow-y-auto  p-4">
          {
            chats.map((e,i) => {
              if(i + 1 !== chats.length){
                return (
                  <div key={i}>
                    <div className={`p-3 rounded-md w-2/3 break-all ${e.from === "other" ? "bg-gray-300" : "bg-green-300 ml-auto"}`}>{e.message}</div>
                  </div>
                )
              }else{
                return (
                  <div key={i} ref={lastMessage}>
                    <div className={`p-3 rounded-md w-2/3 break-all ${e.from === "other" ? "bg-gray-300" : "bg-green-300 ml-auto"}`}>{e.message}</div>
                  </div>
                )
              }
            })
          }
        </div>
        <form onSubmit={handleSubmit} className="absolute bottom-0 w-full flex gap-4 p-3 ">
          <input type="text" className="border border-black rounded-lg flex-1 p-3" placeholder="Escribe aquí..."/>
          <button className="border border-black rounded-full p-3">Enviar</button>
        </form>
      </div>
    )
}