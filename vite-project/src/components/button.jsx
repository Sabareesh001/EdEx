import React from 'react'
import './button.css'
function Button({action,onclick}){
    return(
       <button onClick={onclick} class="action">
        {action}
       </button>
    )
}

export default Button