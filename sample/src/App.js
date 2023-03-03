
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Landing from './pages/landing';
import MiniSearchIndex from './pages/MiniSearchIndex'

import MiniSearchClient from './component/MiniSearchClient';
import TopN from './component/TopN';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='miniSearchIndex' element={<MiniSearchIndex />} />
        <Route path="miniSearchIndex/miniSearchClient" element={<MiniSearchClient />} />
        <Route path="miniSearchIndex/topN" element={<TopN />} />
      </Routes>
    </Router>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
