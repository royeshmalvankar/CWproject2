//libraries
import React,{useContext,useEffect,useState} from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../authcontext/AuthContext";
import axios from "axios";
import "../App.css";

const Login = () => {
    const navigate = useNavigate();
    const {logemail, setlogemail,logpassword,setlogpassword,setIsAuth,IsAuth}=useContext(AuthContext);
    const [data,setdata] = useState([])
    useEffect(()=>{
        fetchlogin()
    },[])

    const fetchlogin = async()=>{
        try {
            let response = await axios.get(`http://localhost:3001/Ldata`)
            setdata(response.data)
            console.log("render")
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
    }
    async function handleSubmit(){
       let flag=false
        data.forEach((ele)=>{
            if (ele.email==logemail){
                if (ele.password==logpassword){
                console.log(logemail,logpassword);
                flag=true
                setIsAuth(true)
                alert("login success");
                navigate("/")
                }
                else{
                alert("login failed");
                }
            }
        })
        if (flag==false){
            alert("Check Email and Password or if you are new Register first");
        }
        
    }

    // console.log("auth",IsAuth);

    return (
        <>
        <div>
            
            <div className="details" style={{marginTop:"200px"}}>
            <h1>Login</h1>
                <div className="form">
                    <label htmlFor="">Email</label>
                    <br />
                    <input type="text" placeholder="Email" value={logemail} onChange={(e)=>setlogemail(e.target.value)}/>
                    <br />
                    <label htmlFor="">Password</label>
                    <br />
                    <input type="password" placeholder="Password" value={logpassword} onChange={(e)=>setlogpassword(e.target.value)}/>
                    <br />
                    <br />
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;