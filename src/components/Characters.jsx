import React, 
    { useState, useReducer, useMemo, useRef, useCallback } from 'react'
import '../styles/characters.css'
import Seacrh from './Seacrh';
import useCharacters from '../hooks/useCharacters';

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

const API = 'https://rickandmortyapi.com/api/character/'

function Characters() {

    const [busqueda, setBusqueda] = useState('');
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
    const searchInput = useRef(null);

    //custom Hooks
    const characters = useCharacters(API)


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