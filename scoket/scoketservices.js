import io from 'socket.io-client'

// const SOCKET_URL = "http://192.168.1.28:3000";
const SOCKET_URL = "https://myfirstscoket-crickacto.onrender.com/";

class WSService {
    initializeSocket = async () => {
        try{
            this.socket =  io(SOCKET_URL,{
                transports:['websocket']
            })
            console.log('initilizing socket',this.socket)
           
            this.socket.on('connect',(data)=>{
               console.log("------ socket connection ----- ")
            })
            this.socket.on('disconnection',(data)=>{
                //console.log("------ socket disconnection ----- ")
            })
            this.socket.on('error',(data)=>{
                //console.log("------ socket error ----- ")
            })

        }
        catch(error)
        {
            console.log("Erorr socket connsection" + error)
        }
    }
    emit(event,data = {}){
        this.socket.emit(event,data);
    }

    on(event,cb = {}){
        this.socket.on(event,cb);
    }

    removeListener(listenerName = {}){
        this.socket.removeListener(listenerName);
    }
}


const scoketservices = new WSService();
export default scoketservices;