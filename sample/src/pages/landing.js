import React from 'react';
import ReactDOM from 'react-dom/client';
import './landing.css';

import axios from 'axios';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from "react-router-dom";

import logo from '../logo.svg';
import {Link} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


// const uploadCallback = () => {
//   console.log("uploadCallback");
//   document.getElementById("circle").style.display = "block";
//   document.getElementById("upload-button").style.display = "none";
//   setTimeout(() => {
//     console.log('file upload!')
//     document.getElementById("circle").style.display = "none";
//     document.getElementById("landing-btn1-id").style.display = "none";
//     document.getElementById("completed-content").style.display = "block";
//     document.getElementById("go-to-miniSearchEngine").style.display = "block";
//   }, 4000)
  
// };

const uploadCallback = () => {
  console.log("uploadCallback");
  document.getElementById("circle").style.display = "block";
  document.getElementById("upload-button").style.display = "none";
  
  const inputFile = document.getElementById("avatar");
  const file = inputFile.files[0];
  
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    
    axios.post("http://34.106.64.114:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      console.log("File uploaded successfully");
      document.getElementById("circle").style.display = "none";
      document.getElementById("landing-btn1-id").style.display = "none";
      document.getElementById("completed-content").style.display = "block";
      document.getElementById("go-to-miniSearchEngine").style.display = "block";
    })
    .catch(error => {
      console.error("Error uploading file:", error);
      document.getElementById("circle").style.display = "none";
      document.getElementById("upload-button").style.display = "block";
    });
  } else {
    console.error("No file selected");
    document.getElementById("circle").style.display = "none";
    document.getElementById("upload-button").style.display = "block";
  }
};



const Landing = () => (
  <div>
    <div align= 'center'>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <h1 align= 'center'> Load my engine</h1>
    <div className="search-board">
      <div id = "upload-button">
        <input type="file"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg"></input>
      </div>
      <div id = 'completed-content' hidden> Completed! </div>
      <p>&nbsp;</p>
      <div id='circle' hidden> Constructing <CircularProgress /> </div>
      <button id="landing-btn1-id" onClick={uploadCallback}> Construct Inverted Indicies</button>
    </div>
    <div align= 'center' id = 'go-to-miniSearchEngine' hidden>
      <div style={{'padding': `20px`}}>
      <Link to="miniSearchIndex/" ><button id="landing-btn-try-out-id"> Try out MiniSearchEngine</button></Link>
      </div>
    </div>
  </div>
);

// class Landing extends React.Component {
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         showTopN: false,
//       }

//     }
  
//     render() {
//       return (
//       <div>
//         <p> Load my engine</p>
//         <div className="search-board">
//           <button id="landing-btn-id"> Choose Files</button>
//           <p>&nbsp;</p>
//           <button id="landing-btn-id2"> Construct Inverted Indicies</button>
//         </div>
        
//       </div>);
//     }
//   }
  
export default Landing;