"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LogoCarousel from '@/components/LogoCarousel';
import Link from 'next/link';

const INTERVAL_DURATION = 5000;

function Server() {
  const [serverStatuses, setServerStatuses] = useState<{ [key: string]: string }>({
    age: '',
    mathematical: '',
    scientific: ''
  });

  useEffect(() => {
    const fetchServerStatus = async (serverName: string, domain: string) => {
      try {
        const response = await fetch(`https://${domain}/api/status`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${serverName} status: ${response.statusText}`);
        }
        const data = await response.json();
        setServerStatuses(prevStatuses => ({
          ...prevStatuses,
          [serverName]: data.status
        }));
      } catch (error: any) {
        console.error(`Error fetching ${serverName} status:`, error);
        setServerStatuses(prevStatuses => ({
          ...prevStatuses,
          [serverName]: 'offline'
        }));
      }
    };

    const fetchAllServerStatuses = async () => {
      await Promise.all([
        fetchServerStatus('age', 'age.pythonanywhere.com'),
        fetchServerStatus('mathematical', 'mathematical.pythonanywhere.com'),
        fetchServerStatus('scientific', 'scientific.pythonanywhere.com')
      ]);
    };

    const interval = setInterval(fetchAllServerStatuses, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans bg-gradient-to-b from-neutral-50 via-orange-200 to-orange-400">
      <div className="m-4 flex items-center justify-center">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-4 font-extrabold text-center">
          <h1 className="leading-tight bg-gradient-to-b from-neutral-50 via-orange-200 to-orange-400 bg-clip-text text-transparent">
            Server Status
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <ServerBox serverName="Age Calculator" status={serverStatuses.age} serverLink='https://age.pythonanywhere.com' />
          <ServerBox serverName="Math Calculator" status={serverStatuses.mathematical} serverLink='https://mathematical.pythonanywhere.com' />
          <ServerBox serverName="Scientific Calculator" status={serverStatuses.scientific} serverLink='https://scientific.pythonanywhere.com' />
        </div>
      </div>
      <div className="flex w-full relative mt-16 flex-col">
        <div className="p-4 text-4xl sm:text-2xl md:text-3xl lg:text-5xl space-y-4 font-extrabold text-center">
          <h1 className="leading-tight text-muted text-orange-300">
            Build with ❤️ using
          </h1>
        </div>
        <LogoCarousel />
      </div>
    </div>
  );
}

interface ServerBoxProps {
  serverName: string;
  status: string;
  serverLink: string;
}

function ServerBox({ serverName, status, serverLink }: ServerBoxProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-b from-orange-400 via-orange-200 to-orange-50">
          <h2 className="text-2xl font-bold mb-4 text-orange-500 text-center">{serverName}</h2>
          <Link href={serverLink} target='_blank'>
            <Button className={`w-full flex items-center justify-center text-lg px-4 py-2 rounded ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}>
              {status === 'online' ? 'Online' : 'Offline'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Server;