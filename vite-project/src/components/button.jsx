import React from 'react'
import './button.css'
function Button({action,onclick,onSubmit,type}){
    return(
       <button type={type} onSubmit={onSubmit} onClick={onclick} class="action">
        {action}
       </button>
    )
}

export default Button