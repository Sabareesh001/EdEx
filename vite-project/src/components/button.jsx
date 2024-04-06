import React from 'react'
import './button.css'
function Button({action}){
    return(
       <button class="action">
        {action}
       </button>
    )
}

export default Button