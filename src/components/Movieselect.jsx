import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Loding from "../loding&error/Loding"
import Error from "../loding&error/Error"
import "../App.css"
const Movieselect = () => {
    const [data, setData] = useState()
    const { id } = useParams()
    const [isLoding, setLoding] = useState(true)
    const [isError, setError] = useState(false)

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        setLoding(true)
        try {
            const response = await axios.get(`http://localhost:8080/movies/${id}`)
            setData(response.data)
            setLoding(false)
        } catch (error) {
            setError(true)
        }
        setError(false)
        setLoding(false)
    }
    if (isLoding) {
        return (
            <Loding />
        )

    }
    if (isError) {
        return (
            <Error />
        )

    }

    return (

        <div className="movieselect">
            <img src={data.poster} alt="" />
            <h1>{data.title}</h1>
            <p><span>Year: </span>{data.year}</p>
            <p><span>ImdbID: </span>{data.imdbID}</p>
            <p><span>Type: </span>{data.type}</p>
            <p><span>Rating: </span>{data.rating}</p>
            <p><span>Genre: </span>{data.genre}</p>
        </div>
    )
}

export default Movieselect