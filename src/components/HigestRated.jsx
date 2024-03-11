import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../authcontext/AuthContext"
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
        console.log(isLoding,"1nd");
       try {
         const response =  await axios.get(`http://localhost:8080/movies?_sort=rating&_order=desc&_limit=10`)
         sethdata(response.data)
         console.log(response.data)
         setLoding(false)
         console.log(isLoding,"2st");
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
                    <div key={movie.imdbID} className="movie">
                        <img src={movie.poster} alt="" />
                        <h2>{movie.title}</h2>
                        <p>{movie.year}</p>
                    </div>
                    )
                    })}
            </div>
        </>
    )
}

export default HigestRated