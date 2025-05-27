import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Api_Path } from './Link';

function Chat({ handlehistory }) {
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState(null);
  const [isCleared, setIsCleared] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastMsgRef = useRef(null);

  useEffect(() => {
    if (chatHistory.length === 0) {
      handlehistory(true);
    } else {
      setTimeout(() => handlehistory(false), 1000);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('prompt', prompt);
    if (file) formData.append('file', file);
    formData.append('chatHistory', isCleared ? JSON.stringify([]) : JSON.stringify(chatHistory));

    try {
      const response = await fetch(`${Api_Path}/text/text-Response`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setChatHistory(data.chatHistory);
        setPrompt('');
        setFile(null);
        setIsCleared(false);
      } else {
        console.error('Server Error:', data.msg || 'Unknown error');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
    setIsCleared(true);
  }

  return (
    <div
      className="chat"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        maxWidth: '1000px',
        backgroundColor: '#f5f7fa',
        borderRadius: '10px',
        marginTop: '100px',
        overflow: 'hidden',
      }}
    >
      {chatHistory.length === 0 ? (
        <div style={{ flexGrow: 1, position: 'relative' }}>
          <form onSubmit={submitHandler} className="form centered">
            <input
              type="text"
              placeholder="Ask anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Submit</button>
            <button
              type="button"
              className="clear"
              onClick={clearChat}
              title="Clear chat history"
            >
              Clear Chat
            </button>
          </form>
        </div>
      ) : (
        <>
          <div
            className="msg"
            style={{
              overflowY: 'auto',
              flexGrow: 1,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#eef2f5',
            }}
          >
            {chatHistory
              .filter(entry => entry.role !== 'system')
              .map((entry, index, arr) => {
                const isLast = index === arr.length - 1;
                return (
                  <div
                    key={index}
                    ref={isLast ? lastMsgRef : null}
                    className={`bubble ${entry.role}`}
                    style={{
                      alignSelf: entry.role === 'user' ? 'flex-end' : 'flex-start',
                      backgroundColor: entry.role === 'user' ? '#e1f5fe' : '#ffffff',
                      color: '#333',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                      maxWidth: '80%',
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.6',
                      wordWrap: 'break-word',
                    }}
                  >
                    <ReactMarkdown>{entry.content}</ReactMarkdown>
                  </div>
                );
              })}
            {loading && (
              <div style={{ alignSelf: 'center', color: '#555', padding: '10px' }}>⏳ Doctor.AI is thinking...</div>
            )}
          </div>

          <form onSubmit={submitHandler} className="form fixed-bottom">
            <input
              type="text"
              placeholder="Ask anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Submit</button>
            <button type="button" className="clear" onClick={clearChat}>
              Clear Chat
            </button>
          </form>
        </>
      )}

      <style>{`
        .form {
          width: 100%;
          display: flex;
          gap: 8px;
          padding: 10px 16px;
          box-sizing: border-box;
          background-color: #ffffff;
          border-radius: 6px;
          border: 1px solid #ddd;
          flex-wrap: wrap;
        }
        .form input[type="text"] {
          flex: 1;
          padding: 8px 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          min-width: 0;
        }
        .form input[type="file"] {
          font-size: 12px;
          padding: 4px 6px;
          width: 110px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .form button {
          padding: 8px 14px;
          font-size: 14px;
          cursor: pointer;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          white-space: nowrap;
        }
        .form button.clear {
          background-color: #f44336;
        }
        .form.centered {
          position: absolute;
          top: 50%;
          left: 50%;
          max-width: 600px;
          transform: translate(-50%, -50%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .form.fixed-bottom {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 40%;
          max-width: 1000px;
          box-shadow: 0 -2px 8px rgba(0,0,0,0.08);
          border-top: 1px solid #ccc;
          border-radius: 10px;
          margin-left: 400px;
          margin-bottom: 120px;
          background-color: white;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}

export default Chat;
