import React from 'react';
import ReactDOM from 'react-dom/client';
import './MiniSearchClient.css';

import logo from '../logo.svg';
import Dropdown from './dropdown';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import {Link} from "react-router-dom";

const Search = (props) => {
    const {
      searchQuery,
      onChange,
      search
    } = props;
  
    return <div>
            <input
              type="text"
              value={searchQuery}
              onChange={onChange}
              hidden
            />
            <button onClick={search}>Search</button>
          </div>;
  }
  
  const Result = ({searchResults, execution_time}) => {
    return (<div>
      {/* <TextField/> */}
      <h3>Your search was executed in {execution_time} seconds</h3>
      <Table style={{backgroundColor:'white'}}>
        <TableHead>
            <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Term</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {searchResults.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.term}</TableCell>
                    <TableCell>{item.frequency}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>)
    // return searchResults.map(r => <div>userId: {r.userId} Id {r.id} title: {r.title} completed: {r.completed}</div>);
  }
  
  class Container extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        searchQuery: '',
        searchResults: [],
        isLoaded: false,
        nPerPage: 10,
        showTopN: false,
        execution_time: 0
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
  
    // onSearch() {
    //   // axios
    //   axios
    //   .get("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=" + document.getElementById("dropdown-selected-value-id").textContent)
    //   .then(response => {
    //     this.setState({
    //       isLoaded: true,
    //       searchResults: response.data
    //     });
    //   })
    //   .catch(function(error) {
    //     this.setState({
    //       isLoaded: true,
    //       error
    //     });
    //   });
      
      // setTimeout(() => {
      //   this.setState({searchResults: ["mock data "+  + Math.random(), "mock data 1", "mock data 2", "mock data 3", "mock data 4"]});
      // }, 1000)
    // }
    onSearch() {
      axios
      .get("http://34.106.238.243:5000/top_n_search", {
        params: {
          n: document.getElementById("dropdown-selected-value-id").textContent
        }
      })
      .then(response => {
        this.setState({
          isLoaded: true,
          searchResults: response.data.results[0],
          execution_time: response.data.results[1]
        });
      })
      .catch(function (error) {
        this.setState({
          isLoaded: true,
          error
        });
      });
    }
  
    render() {
      const {searchResults, searchQuery, execution_time} = this.state;
      const options = [{value: '10', label: '10'}, {value: '20', label: '20'}, {value: '50', label: '50'}, {value: '100', label: '100'}];
      return (
      <div>
        <div className="search-board">
          <Link to="/miniSearchIndex/"><button>Back to miniSearchIndex</button></Link><p>&nbsp;</p>
          <p>&nbsp;&nbsp;Choose your N value:&nbsp;</p>
          <Dropdown placeHolder={this.state.nPerPage} options = {options}/>
          <p>&nbsp;</p>
          <Search
            searchQuery={searchQuery}
            onChange={this.onSearchQueryChange}
            search={this.onSearch}
          />
        </div>
        <Result searchResults={searchResults} execution_time={execution_time} />
      </div>);
    }
  }
  
  class TopN extends React.Component {
    render() {
      
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Mini Search Engine: TOP-N Frequent Terms</p>
            <div className="search">
              <div className="search-board">
                <Container />
              </div>
            </div>
            
  
          </header>
        </div>
      );
    }
  }

  export default TopN