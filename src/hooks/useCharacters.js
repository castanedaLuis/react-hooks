import { useState, useEffect } from 'react'

const  useCharacters = url =>{
    const[character, setCharacters] = useState([])

    useEffect(()=>{
        fetch(url)
            .then(response => response.json())
            .then(data =>{
                setCharacters(data.results)
            })
    },[url])

    return character;
}


export default useCharacters;