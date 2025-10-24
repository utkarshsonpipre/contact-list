import { useState, useEffect } from 'react';
import './ConnectionStatus.css';

const ConnectionStatus = ({ onSync }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('http://localhost:4000/health', { method: 'GET' });
        setIsOnline(res.ok);
      } catch (e) {
        setIsOnline(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
      <span className="status-indicator" />
      <span className="status-text">{isOnline ? 'Online' : 'Offline'}</span>
      {!isOnline && (
        <button className="sync-button" onClick={onSync}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ConnectionStatus;
