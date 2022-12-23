import React, { useState, useEffect } from 'react'
import '../styles/characters.css'

function Characters() {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                setCharacters(data.results)
            });
    }, []);

    return (
        <>
            <div className="containerCards">
                {characters.map(character => (
                    <>
                        <div className='character'>
                            <img className='imagen' src={character.image} alt={character.name} />
                            <h2 className='nombre'>{character.name}</h2>
                            <p className='gender'>{character.gender}</p>
                            <p className='status'>{character.status}</p>
                            <button className='btnLike'></button>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Characters