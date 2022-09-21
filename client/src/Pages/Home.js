import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className='container'>
      {/* <div className='headline-content'>Headline</div> */}
      <div className='card'>
        <div className='card-image'></div>
          <h2>Title</h2>
          <p>Text</p>
          <button>Click</button>
      </div>
      <div className='card'>
      <div className='card-image'></div>
          <h2>Title</h2>
          <p>Text</p>
          <button>Click</button>
      </div>
      <div className='card'>
        <div className='card-image'></div>
          <h2>Title</h2>
          <p>Text</p>
          <button>Click</button>
      </div>
      <div className='card'>
        <div className='card-image'></div>
            <h2>Title</h2>
            <p>Text</p>
            <button>Click</button>
      </div>
      {/* <div className='footer'>footer</div> */}
    </div>
  )
}

export default Home