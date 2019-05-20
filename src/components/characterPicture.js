import React from 'react';


export default function CharacterPicture(props){
    return (
        <div>
       <img src = {props.imageSrc} alt="rick and morty picture" />
       </div>
    )
}