import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className='homePage-container'>
      <div className='headline-content'>
        <h2 className='headline-text'>Learn Game Development</h2>
        <div className='head-image'></div>
        <p className='blurb'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis dolor rutrum, facilisis lacus porttitor, maximus risus. Vivamus aliquam lorem in leo sodales dictum. In consequat elit at lobortis ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse nec suscipit justo, a pretium quam.
        </p>
        <button className = 'head-btn'>Click</button>
        <button className = 'head-btn'>Click</button>
      </div>
      <div className='home-box-1'>
        <h2 className='box-head'>Box 1</h2>
      </div>
      <div className='home-box-2'>
      <h2 className='box-head'>Box 2</h2>
      </div>
      <div className='home-box-3'>
      <h2 className='box-head'>Box 3</h2>
      </div>
      <div className='home-box-4'>
      <h2 className='box-head'>Box 4</h2>
      </div>
    </div>
  )
}

export default Home