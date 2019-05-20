import React from 'react';
import './character.css';





export default function CharacterDespription(props){
    return(
        <div className="heroName">{props.name}  </div>
    )
}