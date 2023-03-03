import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import logo from './logo.svg';
import Dropdown from './component/dropdown';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';



class Landing extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        searchQuery: '',
        searchResults: [],
        isLoaded: false,
        nPerPage: 10,
        showTopN: false,
      }
  
      this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
      this.onSearch = this.onSearch.bind(this);
    }
  
    setnPerPage = (val) => {
      this.setState({
        nPerPage: val
      })
    }
  
    onSearchQueryChange(e) {
      this.setState({searchQuery: e.target.value});
    }
  
    onSearch() {
      // axios
      axios
      .get("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=" + document.getElementById("dropdown-selected-value-id").textContent)
      .then(response => {
        this.setState({
          isLoaded: true,
          searchResults: response.data
        });
      })
      .catch(function(error) {
        this.setState({
          isLoaded: true,
          error
        });
      });
      
      // setTimeout(() => {
      //   this.setState({searchResults: ["mock data "+  + Math.random(), "mock data 1", "mock data 2", "mock data 3", "mock data 4"]});
      // }, 1000)
    }
  
    render() {
      const {searchResults, searchQuery} = this.state;
      const options = [{value: '10', label: '10'}, {value: '20', label: '20'}, {value: '50', label: '50'}];
      return (
      <div>
        <div className="search-board">
          <Search
            searchQuery={searchQuery}
            onChange={this.onSearchQueryChange}
            search={this.onSearch}
          />
          <p>&nbsp;&nbsp;show&nbsp;</p>
          <Dropdown placeHolder={this.state.nPerPage} options = {options}/>
          <p>&nbsp;per page</p>
        </div>
        <Result searchResults={searchResults} />
      </div>);
    }
  }
  
export default Landing;