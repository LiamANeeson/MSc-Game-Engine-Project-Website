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
        zip.file("HorizonGameEngine-1.0.0-win64.msi", zipData); 
        zip.generateAsync({type:"blob"})
      .then(function(content) {
          // Force down of the Zip file
          saveAs(content, "HorizonGameEngine-1.0.0-win64.msi");
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
      <button className='gm-btn' onClick={event =>  window.location.href='https://drive.google.com/u/0/uc?id=1p1-9uScLcJ7xXTmLiM29M2JlYCuq59BY&export=download&confirm=t&uuid=e25a727d-a475-4a91-a7e8-a8e4cc212caa&at=ACjLJWl4Du63KxDO0oXWldYTt-Zd:1671188661691'}>Download Horizon Game Engine Installer</button> 
      <button className='gm-btn' onClick={event =>  window.open('https://drive.google.com/u/0/uc?id=1l4nXoKq0pLAlSlgAxq2kAqcuApe8o4kI&export=download')}>Download Dark Trails Game</button>
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