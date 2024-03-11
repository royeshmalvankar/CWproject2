import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authcontext/AuthContext";
import axios from "axios";
import "../App.css";
const Register = () => {
    const {email, setemail,password,setpassword} =useContext(AuthContext);
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault();
        try {
            let response =  await axios.post(`http://localhost:3001/Ldata`,{email,password})
            console.log("rp",response.data)
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <div className="details" style={{marginTop:"200px"}}>
            <h1>Register</h1>
                <div className="form">
                    <label htmlFor="">Email</label>
                    <br />
                    <input type="text" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                    <br />
                    <label htmlFor="">Password</label>
                    <br />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                    <br />
                    <br />
                    <button onClick={handleSubmit}>Register</button>
                </div>
        </div>
        </>
    );
}

export default Register