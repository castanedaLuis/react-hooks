import React, {useState} from 'react'
import '../styles/header.css'

function Header() {
    const [darkMode,setDarkMode] = useState(false)

    const handleClick = () =>{
        setDarkMode(!darkMode)
        cambioFondos(darkMode)
    }
    function cambioFondos(status) {
        const back = document.querySelector('.App')
        back.style.backgroundColor=status?'#000':'#fff';
        const header = document.querySelector('.header');
        header.style.backgroundColor=status?'#fff':'rgb(0, 128, 255)';
    }
  return (
    <>
    <div className='header'>
        <h1 className='headerTitulo'>ReactHooks</h1>
        <button className='headerButton' type='button' onClick={() =>handleClick()}>{darkMode ?'DarkMode':'LightMode'}</button>
    </div>
    </>
  )
}

export default Header