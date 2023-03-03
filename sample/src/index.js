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
          />
          <button onClick={search}>Search</button>
        </div>;
}

const Result = ({searchResults}) => {
  return (<div>
    {/* <TextField/> */}
    <Table style={{backgroundColor:'white'}}>
      <TableHead>
          <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>userId</TableCell>
              <TableCell>title</TableCell>
              <TableCell>complete</TableCell>
              <TableCell></TableCell>
          </TableRow>
      </TableHead>
      <TableBody>
          {searchResults.map(item => (
              <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.userId}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.complete? "Yes" : "No"}</TableCell>
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

class MiniSearchClient extends React.Component {
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Mini Search Engine</p>
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

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MiniSearchClient />);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );





