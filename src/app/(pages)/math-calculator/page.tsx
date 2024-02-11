"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

const MathCalculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (value: string) => {
    if (/^[\d()+\-*/.]*$/.test(value)) {
      setExpression(value);
    }
  };


  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === '=') {
      handleCalculate();
    }
  }

  const playButtonPressSound = (buttonType?: any) => {
    const audio = new Audio(
      buttonType === 'calculate' ? '/calculate.mp3' : buttonType === 'clear' ? '/clear.mp3' : '/click.mp3'
    );
    audio.play();
  };

  const handleKeyClick = (key: string) => {
    setExpression((prevExpression) => prevExpression + key);
    playButtonPressSound();
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch('https://mathematical.pythonanywhere.com/api/math', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setResult('');
      } else {
        setResult(data.result);
        setError('');
      }
      playButtonPressSound('calculate');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const clearExpression = () => {
    setExpression('');
    setResult('');
    setError('');
    playButtonPressSound('clear');
  };

  const renderNumberKeys = () => {
    const numbers = ['C', '÷', '×', '←', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '.', '(', '0', ')', '='];

    return numbers.map((number) => (
      <Button
        key={number}
        className="px-4 py-3 bg-gray-200 font-semibold text-orange-700 rounded-lg shadow-sm shadow-orange-700 hover:drop-shadow-xl hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => {
          if (number === '←') {
            setExpression((prevExpression) => prevExpression.slice(0, -1));
          } else if (number === '=') {
            handleCalculate();
          } else if (number === 'C') {
            clearExpression()
          } else {
            handleKeyClick(number);
          }
        }}
      >
        {number}
      </Button>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 via-orange-200 to-orange-400">
      <div className="p-4 rounded-md shadow-2xl shadow-orange-500/50">
        <div className="mb-8">
          <Input
            className="px-4 py-3 w-full sm:w-80 border rounded-md shadow-md text-lg"
            type="text"
            value={expression}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter expression"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="mb-8">
          <div className="w-full sm:w-80 px-4 py-3 font-bold shadow drop-shadow-2xl rounded-lg text-blue-600 text-xl">
            Result: {result}
          </div>
        </div>
        <div className="mb-8 flex flex-col sm:flex-row justify-between">
          <button
            className="px-6 py-3 mb-2 sm:mb-0 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={clearExpression}
          >
            Clear
          </button>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={handleCalculate}
          >
            Calculate
          </button>
        </div>
        {error && (
          <div className="text-red-600 font-bold mb-6">
            Error: Undefined!
          </div>
        )}
        <div className="grid grid-cols-4 gap-4">
          {renderNumberKeys()}
        </div>
      </div>
    </div>
  );
};

export default MathCalculator;