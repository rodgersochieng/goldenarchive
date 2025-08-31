
// import React from 'react';
// import './App.css';
// import Main from './Main'; 
// import TakedownRequest from "./TakedownRequest";

// function App() {
//   return (
//     <div className="App">
//       <Main />  
//     </div>
//   );
// }

// export default App;


import React from 'react';
import './App.css';
import Main from './Main'; 
import TakedownRequest from "./TakedownRequest";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home (Main Page) */}
          <Route path="/" element={<Main />} />

          {/* Takedown Request Page */}
          <Route path="/takedown-request" element={<TakedownRequest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
