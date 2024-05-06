import axios from "axios"
import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState()

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(url)
                setData(res.data)
            } catch (error) {
                console.error("Error in fetching data:", error)
            }
        })()
    }, [url])

    return data
}