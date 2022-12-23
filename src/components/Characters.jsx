import React, { useState, useEffect } from 'react'

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
            <div className="Characters">
                {characters.map(character => (
                    <>
                        <img src={character.image} alt={character.name} />
                        <h2>{character.name}</h2>
                        <p>{character.gender}</p>
                        <p>{character.status}</p>
                    </>
                ))}
            </div>
        </>
    )
}

export default Characters