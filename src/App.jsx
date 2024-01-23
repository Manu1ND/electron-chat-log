import React from 'react';
import { useState, useEffect } from 'react';


const App = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const [bots, setBots] = useState([]);

  useEffect(() => {
    // Fetch bots from the SQLite database
    window.electron.getBots((rows) => setBots(rows));
  }, []);

  const [selectedBot, setSelectedBot] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedBot(event.target.value);
  };

  const handleGenerateLogs = () => {
    window.electron.generateLogs(selectedBot, `${fromDate.toString()}:00.000+05:30`, `${toDate.toString()}:00.000+05:30`);
  };

  return (
    <div className="container">
      <h1>Chat Log Downloader</h1>
      <select value={selectedBot} onChange={handleDropdownChange}>
        <option key='' value=''>Select Bot</option>
        {bots.map((option) => (
          <option key={option.botName} value={option.botName}>
            {option.botName}
          </option>
        ))}
      </select>
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