import { useState } from "react"


const Filterandsorting = ({fetchData}) => {
    const [data, setData] = useState({
        year: "",
        rating: "",
    })
    console.log(data);


    return (
        <>
        <label htmlFor="">Year: </label>
        <input type="text" placeholder="year" value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })}/>
        <label htmlFor="">Rating: </label>
        <select name="rating" id="" value={data.rating} onChange={(e) => setData({ ...data, rating: e.target.value })}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <button onClick={() => fetchData(data)}>Filter</button>
        </>
    )

}

export default Filterandsorting