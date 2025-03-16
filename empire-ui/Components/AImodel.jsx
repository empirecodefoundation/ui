// components/AIChatBubble.jsx
import React, { useState } from 'react';

const AIChatBubble = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleQueryChange} />
        <button type="submit">Send</button>
      </form>
      <p>AI Response: {response}</p>
    </div>
  );
};

export default AIChatBubble;
