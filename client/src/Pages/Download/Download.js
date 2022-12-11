import React from 'react'
import { FaGithub, FaWindows } from 'react-icons/fa'
import { saveAs } from 'file-saver'
import './Download.css'
import axios from 'axios';
import JSZip from "jszip";

function Download() {
  
const downloadImage = (image) => {
  //saveAs(image, 'HorizonGE.zip') 
   // console.log(image)
  // saveAs(image, 'HorizonGE.zip') 
  let formData = new FormData()
  formData={};
        axios.get("/download", {  
      }).then(response => {
        var zip = new JSZip();
        var zipData = response.data //
        zip.file("HorizonGE.zip", zipData); 
        zip.generateAsync({type:"blob"})
      .then(function(content) {
          // Force down of the Zip file
          saveAs(content, "HorizonGE.zip");
        }).catch((error)=>{
          console.log(error)
});


      })
  }
  return (
    <div className='download-container'>
      <section className='download-info'>
        <h2>Download</h2>
        <em>Download the Horizon Game Engine Here!</em>
      <section className='windows-cta'>      
        <h2><FaWindows/> Download for Windows</h2>
      </section>
      </section>
      <section className='download-section'>
      <button className='download-btn' onClick={event =>  window.location.href='https://drive.google.com/u/0/uc?id=1kuAqqF0FH9wlIAmSiLKOCnnYggpxzV-k&export=download&confirm=t&uuid=17e9c003-7f68-42aa-aa90-5a4d0ba69148&at=AHV7M3e9Upq0T9Fuyn-DN3Whus6j:1670691281187'}>Download Horizon Game Engine</button>
      <button className='gm-btn' onClick={event =>  window.location.href='https://drive.google.com/u/0/uc?id=1kuAqqF0FH9wlIAmSiLKOCnnYggpxzV-k&export=download&confirm=t&uuid=17e9c003-7f68-42aa-aa90-5a4d0ba69148&at=AHV7M3e9Upq0T9Fuyn-DN3Whus6j:1670691281187'}>Download Dark Trails Game</button> 
      </section>
      <section className='git-cta'>
        <h2>Horizon GitHub</h2>
          <em>View Source Code for Horizon GE on Github</em>
          <p>The Horizon Game Engine has been made open source meaning that users can view the code which can be viewed via GitHub!</p>
      </section>
    </div>

  )
}

export default Download