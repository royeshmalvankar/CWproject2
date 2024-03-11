import { AuthContext } from "../authcontext/AuthContext"
import { useContext } from "react"
import "../App.css"
const Favorites = ()=>{
    const {fav}=useContext(AuthContext)
    console.log(fav);
    return(
        <div className="movie-container">
        {/* {fav==null?<h1>No Favorites</h1>:fav.map((favm) => {
                    return(
                    <div key={favm.imdbID} className="movie">
                        <img src={favm.poster} alt="" />
                        <h2>{favm.title}</h2>
                        <p>{favm.year}</p>
                    </div>
                    )
                    })} */}
        </div>
    )
}
export default Favorites