import React from 'react';
import ReactDOM from 'react-dom/client';
import './landing.css';

import axios from 'axios';


import logo from '../logo.svg';
import {Link} from "react-router-dom";


const MiniSearchIndex = () => (
  <div>
    <div align= 'center'>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <h1 align= 'center'> MiniSearch Engine</h1>
    
    <div align= 'center' id = 'go-to-miniSearchEngine'>
      <Link to="/" ><button> back</button></Link>
      <div style={{'padding': `20px`}}>
      <Link to="/miniSearchIndex/miniSearchClient" ><button id="landing-btn-id2"> Search For Term</button></Link>
      </div>
      <Link to="/miniSearchIndex/topN" ><button id="landing-btn-id3"> Top-N</button></Link>
    </div>
  </div>
);
  
export default MiniSearchIndex;