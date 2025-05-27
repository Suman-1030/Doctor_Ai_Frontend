import React from 'react'

function Banner({childprompt}) {
  return (
    <div className='banner'>
    
         <div>
          {childprompt && <h2>Hi , How Can i Help u Today</h2>}
        </div>

    </div>
  )
}

export default Banner
