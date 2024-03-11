import { useContext,useEffect, useState } from "react"
import { AuthContext } from "../authcontext/AuthContext"
import axios from "axios"
import Navbar from "./navbar"
import "../App.css"
import Loding from "../loding&error/Loding"
import Error from "../loding&error/Error"

const Home = () => {
    const {data, setData,setLoding, isLoding,setError, isError,setfav} = useContext(AuthContext)
    const [sd, setSd] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        const timer=setTimeout(() => {
            fetchData()
        },1000)
        return () => clearTimeout(timer)
    },[sd,page])

    function search(e){
        setSd(e.target.value)
    }

    const fetchData = async () => {
        setLoding(true)
        console.log(isLoding,"1nd");
       try {
         const response =  await axios.get(`http://localhost:8080/movies?q=${sd}&_page=${page}&_per_page=10`)
         setData(response.data)
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
            <h1 style={{textAlign:"center"}}>Movie Search</h1>
            <div className="search">
                <label>Search: </label>
                <input name="scr" type="text" placeholder="search" value={sd} onChange={search} />
            </div>
            <div className="page">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)} disabled={data.length < 10}>Next</button>
            </div>
            <div className="movie-container">
                {data.map((movie) => {
                    return(
                    <div key={movie.imdbID} className="movie">
                        <img src={movie.poster} alt="" />
                        <h2>{movie.title}</h2>
                        <p>{movie.year}</p>
                        {/* <button onClick={() => setfav(movie)}>Add to Favorites</button> */}
                    </div>
                    )
                    })}
            </div>
            <div className="page">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)} disabled={data.length < 10}>Next</button>
            </div>

        </>
    )
}
export default Home