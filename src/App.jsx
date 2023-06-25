import React from 'react';
import { useState } from 'react';


const App = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleGenerateLogs = () => {
    console.log(window.electron.saveContent('chat_logs.txt', 'Hello World!'))
  };

  // const handleGenerateLogs = () => {}

  return (
    <div className="container">
      <h1>Chat Log Downloader</h1>
      <div className="date-time-selector">
        <label>From:</label>
        <input type="datetime-local" value={fromDate} onChange={handleFromDateChange} />
        <label>To:</label>
        <input type="datetime-local" value={toDate} onChange={handleToDateChange} />
      </div>
      <button className="generate-button" onClick={handleGenerateLogs}>
        Generate Logs
      </button>
    </div>
  );
}

export default App;