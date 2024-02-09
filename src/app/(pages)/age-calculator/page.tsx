"use client"

import { Input } from '@/components/ui/input';
import { useState } from 'react';

const AgeCalculator = () => {
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState({ years: '', months: '', days: '' });
  const [error, setError] = useState('');

  const handleInputChange = (value: string) => {
    let formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 4) {
      formattedValue = formattedValue.slice(0, 4) + '-' + formattedValue.slice(4);
    }
    if (formattedValue.length > 7) {
      formattedValue = formattedValue.slice(0, 7) + '-' + formattedValue.slice(7);
    }
    setBirthdate(formattedValue);
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = e.key;
    if (/\d|-/.test(keyPressed)) {
      handleInputChange(birthdate + keyPressed);
    } else if (keyPressed === 'Backspace') {
      handleInputChange(birthdate.slice(0, -1));
    } else if (keyPressed === 'Enter') {
      handleCalculate();
    }
  };

  const handleKeyClick = (key: string) => {
    setBirthdate((prevExpression) => prevExpression + key);
    playButtonPressSound();
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch('https://age.pythonanywhere.com/api/age', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ birthdate }),
      });
      const data = await response.json();
      if (response.ok) {
        setAge(data.age);
        setError('');
      } else {
        setError(data.error || 'An unknown error occurred');
        setAge({ years: '', months: '', days: '' });
      }
      playButtonPressSound('calculate');
    } catch (error) {
      setError('Network error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  const clearFields = () => {
    setBirthdate('');
    setAge({ years: '', months: '', days: '' });
    setError('');
    playButtonPressSound('clear');
  };

  const renderNumberKeys = () => {
    const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '-'];
    return numbers.map((number) => (
      <button
        key={number}
        className="px-4 py-3 bg-gray-200 font-semibold text-orange-700 rounded-lg shadow-sm shadow-orange-700 hover:drop-shadow-xl hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => {
          if (number === '←') {
            setBirthdate((prevExpression) => prevExpression.slice(0, -1));
          } else {
            handleKeyClick(number);
          }
        }}
        aria-label={number === '←' ? 'Backspace' : number}
      >
        {number}
      </button>
    ));
  };

  const playButtonPressSound = (buttonType?: any) => {
    const audio = new Audio(
      buttonType === 'calculate' ? '/calculate.mp3' : buttonType === 'clear' ? '/clear.mp3' : '/click.mp3'
    );
    audio.play();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 via-orange-200 to-orange-400">
      <div className="p-4 rounded-md shadow-2xl shadow-orange-500/50">
        <div className="mb-8">
          <Input
            className="px-4 py-3 w-full sm:w-80 border rounded-md shadow-md text-lg"
            type="text"
            value={birthdate}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter (YYYY-MM-DD)"
            aria-label="Enter your birthdate in YYYY-MM-DD format"
          />
        </div>
        <div className="mb-8">
          <div className="w-full sm:w-80 px-4 py-3 shadow drop-shadow-2xl rounded-lg text-xl">
            {error && <div className="text-red-600 font-bold mb-4">{error}</div>}
            {age.years !== '' && (
              <div className="text-green-600 font-bold">
                You are {age.years} years, {age.months} months, {age.days} days old. ❤️
              </div>
            )}
          </div>
        </div>
        <div className="mb-8 flex flex-col sm:flex-row justify-between">
          <button
            className="px-6 py-3 mb-2 sm:mb-0 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={clearFields}
            aria-label="Clear input fields"
          >
            Clear
          </button>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={handleCalculate}
            aria-label="Calculate age"
          >
            Calculate
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {renderNumberKeys()}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;