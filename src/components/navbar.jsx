import React,{useContext} from "react"
import {Link,useNavigate} from "react-router-dom"
import {AuthContext} from "../authcontext/AuthContext"
import "../App.css"
const Navbar =()=>{
    const css={textDecoration:"none"}
    const {IsAuth,setIsAuth}=useContext(AuthContext)
    const Navigate=useNavigate()
    return(
        <header>
            <nav className="navbar">
                <div className="nav1">
                <Link to="/" style={css}><h1>Home</h1></Link>
                <Link to="/genre" style={css}><h1>Genre</h1></Link>
                <Link to="/higestrated" style={css}><h1>Higest Rated</h1></Link>
                {/* <Link to="/favorites" style={css}><h1>Favorites</h1></Link> */}
                <Link to="/addmovies" style={css}><h1>Add Movies</h1></Link>
                </div>
                <div className="nav2">
                {IsAuth?<h1 onClick={()=>{setIsAuth(false),Navigate("/login")}} style={css}>Logout</h1>:<Link to="/login" style={css}><h1>Login</h1></Link>}
                    <Link to="/register" style={css}><h1>Register</h1></Link>

                </div>
            </nav>
        </header>
        
    )
}

export default Navbar