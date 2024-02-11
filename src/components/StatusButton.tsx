"use client"

import React, { useState, useEffect } from 'react';

function StatusButton() {
  const [serverStatus, setServerStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchServerStatus();
  }, []);

  const fetchServerStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://numerify.pythonanywhere.com/api/status');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setServerStatus(data.status);
    } catch (error) {
      setError('Error fetching server status');
    } finally {
      setLoading(false);
    }
  };

  const indicatorColor = serverStatus === 'online' ? '#34D399' : '#EF4444';

  if (loading) {
    return (
      <div className="StatusButton rounded-full p-1 flex items-center justify-center">
        <span className="w-3 h-3 relative flex items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-slate-700"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-700"></span>
        </span>
      </div>
    );
  }

  return (
    <div className={`StatusButton rounded-full p-1 flex items-center justify-center ${serverStatus === 'online' ? 'text-green-500' : 'text-red-500'}`}>
      <span className="w-3 h-3 relative flex items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: indicatorColor }}></span>
        <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: indicatorColor }}></span>
      </span>
    </div>
  );
}

export default StatusButton;
