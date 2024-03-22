import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../authcontext/AuthContext"
import { Link } from "react-router-dom"
import axios from "axios"
import Loding from "../loding&error/Loding"
import Error from "../loding&error/Error"
const HigestRated = ()=>{
    const [hdata,sethdata] = useState([])
    const {setLoding, isLoding,setError, isError} = useContext(AuthContext)
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async () => {
        setLoding(true)
       try {
         const response =  await axios.get(`http://localhost:8080/movies?_sort=rating&_order=desc&_limit=10`)
         sethdata(response.data)
         setLoding(false)
       } catch (error) {
        setError(true)
       }
       setError(false)
       setLoding(false)
    }
    if (isLoding) {
        return(
            <Loding/>
        )
        
    }
    if (isError) {
        return(
            <Error/>
        )
        
    }
    return (
        <>
            <h1 style={{textAlign:"center",marginTop:"50px"}}>Top 10 Higest Rated</h1>

            <div className="movie-container">
                {hdata.map((movie) => {
                    return(
                        <Link style={{ textDecoration: "none" }} to={`/movieselect/${movie.id}`}><div key={movie.imdbID} className="movie">
                        <img src={movie.poster} alt="" />
                        <h2>{movie.title}</h2>
                        <p>{movie.year}</p>
                    </div></Link>
                    )
                    })}
            </div>
        </>
    )
}

export default HigestRated