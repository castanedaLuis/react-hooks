import React, {useState} from 'react'

function Header() {
    const [darkMode,setDarkMode] = useState(false)

    const handleClick = () =>{
        setDarkMode(!darkMode)
        cambioFondos()
    }
    function cambioFondos() {
        const back = document.querySelector('app')
        back.style='body: background:#000'
    }
  return (
    <>
    <div className='header'>
        <h1>ReactHooks</h1>
        <button type='button' onClick={() =>handleClick()}>{darkMode ?'DarkMode':'LightMode'}</button>
    </div>
    </>
  )
}

export default Header