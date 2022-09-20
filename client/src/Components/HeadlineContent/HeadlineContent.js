import React from 'react'
import "./HeadlineContent.css"
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

function HeadlineContent() {
  return (
    <div>
        <header className='card'>
            <h1>Learn Game Development!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt metus ante, non maximus velit vehicula quis. Vestibulum iaculis velit eu risus vulputate, quis consequat odio consequat. Quisque semper eros nisi, at euismod ex convallis id. Donec porta nisi nec massa ultrices hendrerit. Donec lacinia, ante eget porta cursus, dolor arcu aliquet enim, vel aliquet neque massa vitae purus. Aliquam erat volutpat. Phasellus faucibus urna et nisl auctor mattis. Cras dapibus nibh in eros pulvinar, et venenatis velit cursus. Curabitur eget nunc egestas, placerat tortor nec, mollis sem. Nunc ultricies orci lectus. Cras aliquam quis elit id pretium. </p>
            <Button>Download</Button>
            <button>Learn More</button>
        </header>
    </div>
  )
}

export default HeadlineContent