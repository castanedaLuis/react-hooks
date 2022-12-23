import React, 
    { useState, useEffect, useReducer, useMemo, useRef, useCallback } from 'react'
import '../styles/characters.css'
import Seacrh from './Seacrh';

const initialState = {
    favorites: []
}

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        default:
            return state;
    }
}

function Characters() {

    const [characters, setCharacters] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
    const searchInput = useRef(null);

    const handleClickFavorito = (favorite) => {
        dispatch({ type: 'ADD_FAVORITE', payload: favorite });
    }
    // const handleSearch = () => {
    //     setBusqueda(searchInput.current.value)
    // }
    const handleSearchCallback = useCallback(() => {
        setBusqueda(searchInput.current.value)
    },[])

    //Función sin useMemo
    // const filterUsers = characters.filter((user) => {
    //     return user.name.toLowerCase().includes(busqueda.toLowerCase());
    // })
    
    //Función con useMemo
    const filterUseMemo = useMemo(() =>
        characters.filter((user) => {
            return user.name.toLowerCase().includes(busqueda.toLowerCase());
        }),
        [characters,busqueda]
    )


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
            <div className="containerCardsFavorites">
                <h3>Tus Favoritos</h3>
                <div className='containersFavorites'>
                    {
                        favorites.favorites.map(fav => (
                            <>
                                <div className='characterFav' key={fav.id}>
                                    <img className='imagen' src={fav.image} alt={fav.name} />
                                    <h2 className='nombre'>{fav.name}</h2>
                                    <p className='gender'>{fav.gender}</p>
                                    <p className='status'>{fav.status}</p>
                                    <button className='btnLike' onClick={() => handleClickFavorito(fav)}></button>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>

            <div className='searchContainer'>
                <Seacrh 
                    busqueda={busqueda}
                    searchInput={searchInput}
                    handleSearch={handleSearchCallback}
                />
                <div className='containerSearchCards'>
                    {busqueda!== '' && filterUseMemo.map(character => (
                        <>
                            <div className='character' key={character.id}>
                                <img className='imagen' src={character.image} alt={character.name} />
                                <h2 className='nombre'>{character.name}</h2>
                                <p className='gender'>{character.gender}</p>
                                <p className='status'>{character.status}</p>
                                <button className='btnLike' onClick={() => handleClickFavorito(character)}></button>
                            </div>
                        </>
                    ))}
                </div>
            </div>

            <div className="containerCards">
                {characters.map(character => (
                    <>
                        <div className='character' key={character.id}>
                            <img className='imagen' src={character.image} alt={character.name} />
                            <h2 className='nombre'>{character.name}</h2>
                            <p className='gender'>{character.gender}</p>
                            <p className='status'>{character.status}</p>
                            <button className='btnLike' onClick={() => handleClickFavorito(character)}></button>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Characters