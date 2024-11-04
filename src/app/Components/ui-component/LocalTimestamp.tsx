import React, { useState, useEffect } from 'react';

const LocalTimestamp = () => {
  const [timestamp, setTimestamp] = useState('');

  const updateTimestamp = () => {
    const date = new Date();

    // Opsi untuk format tanggal
    const optionsDate = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    // Opsi untuk format waktu (24-jam)
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Format 24 jam
    };

    // Format tanggal lokal (Indonesia)
    const formattedDate = date.toLocaleDateString('id-ID', optionsDate);
    // Format waktu lokal (dalam format 24 jam)
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    // Menggabungkan tanggal dan waktu
    const formattedTimestamp = `${formattedDate} | ${formattedTime}`;

    setTimestamp(formattedTimestamp);
  };

  useEffect(() => {
    updateTimestamp();
    const timer = setInterval(updateTimestamp, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{timestamp}</div>;
};

export default LocalTimestamp;
