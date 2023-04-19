import React, { useState } from 'react'

export default function ImageGallery(props) {
    const [num, setNum] = useState(0)

    function handleClick(e){
        const side = e.target.id
        if(side === 'left'){
            num > 0 ? setNum(prevNum => prevNum -= 1) : setNum(0)
        } else if(side === 'right'){
            num < props.screenshots.length-1 ? setNum(prevNum => prevNum += 1) : setNum(0)
        }
    }

    return (
        <div className="imageGalleryContainer">
            <div id='left' className='imageSelect left' onClick={handleClick}> {'<'} </div>
            <img
                className="image"
                src={props.screenshots && props.screenshots[num]}
            />
            <div id='right' className='imageSelect right' onClick={handleClick}> {'>'} </div>
        </div>
  )
}
