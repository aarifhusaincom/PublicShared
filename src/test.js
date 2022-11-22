import axios from "axios"


const test = () =>{
axios.get("api",{
    headers:{
        Authorization: "Bear" + token
    },  
}).then((res)=>{
    res.data in Array
})
}