import React from 'react'

function Seacrh({ busqueda, searchInput, handleSearch }) {
    return (
        <>
            <input
                className='inputSearch'
                type='text' value={busqueda}
                onChange={handleSearch}
                placeholder='Busacador'
                ref={searchInput}
            />
        </>
    )
}

export default Seacrh