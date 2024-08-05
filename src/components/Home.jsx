import { useContext,useEffect, useState } from "react"
import { AuthContext } from "../authcontext/AuthContext"
import axios from "axios"
import Navbar from "./navbar"
import "../App.css"
import Loding from "../loding&error/Loding"
import Error from "../loding&error/Error"
import { Link, Navigate } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import Nodata from "./Nodata"
import Filterandsorting from "./Filterandsorting"

const Home = () => {
    const {data, setData,setLoding, isLoding,setError, isError,setfav} = useContext(AuthContext)
    const [sd, setSd] = useState("")
    const [page, setPage] = useState(1)
    const [lastpage, setLastpage] = useState(0)
    const [responses, setResponses] = useState(false)
    

    useEffect(() => {
        const timer=setTimeout(() => {
            fetchData()
        },1000)
        return () => clearTimeout(timer)
    },[sd,page])

    function search(e){
        setSd(e.target.value)
        setPage(1)
    }

    const fetchData = async () => {
        setLoding(true)
       try {
         const response =  await axios.get(`http://localhost:8080/movies?q=${sd}&_page=${page}&_per_page=10`)
         const response2 =  await axios.get(`http://localhost:8080/movies`)
         if(response.data.length===0){
            setResponses(true)
         }
         else{
            setResponses(false)
         }
         setData(response.data)
         setLastpage(Math.ceil(response2.data.length/10))
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
    if(responses){
        return(
           <Navigate to={"/nodata"} />
        )
    }
    return (
        <>
            <h1 style={{textAlign:"center"}}>Movie Search</h1>
            <div className="search">
                <label>Search: </label>
                <input name="scr" type="text" placeholder="search" value={sd} onChange={search} />
                {/* <Filterandsorting fetchData={fetchData}/> */}
            </div>
            <div className="page">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                {data.length<10?<button onClick={() => setPage(1)}>First Page</button>:<button onClick={() => setPage(lastpage)}>Last Page</button>}
                <button onClick={() => setPage(page + 1)} disabled={data.length < 10}>Next</button>
            </div>
            <div className="movie-container">
                {data.map((movie) => {
                    return(
                    <Link style={{ textDecoration: "none" }} to={`/movieselect/${movie.id}`}><div key={movie.imdbID} className="movie">
                        <img src={movie.poster} alt="" />
                        <h2>{movie.title}</h2>
                        <p>{movie.year}</p>
                        {/* <button onClick={() => setfav(movie)}>Add to Favorites</button> */}
                    </div></Link>
                    )
                    })}
            </div>
            <div className="page">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                {data.length<10?<button onClick={() => setPage(1)}>First Page</button>:<button onClick={() => setPage(lastpage)}>Last Page</button>}
                <button onClick={() => setPage(page + 1)} disabled={data.length < 10}>Next</button>
            </div>

        </>
    )
}
export default Home