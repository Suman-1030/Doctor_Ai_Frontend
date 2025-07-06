import React, { useState, useEffect, useRef } from 'react';

function Otp({ size = 6, setOtp }) {
  const [inputValues, setInputValues] = useState(() => new Array(size).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    setOtp(inputValues.join(''));
  }, [inputValues]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return; // only allow single digit

    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);

    // Move to next input
    if (value && index < size - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (inputValues[index] === '') {
        // Move back if already empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current digit
        const updatedValues = [...inputValues];
        updatedValues[index] = '';
        setInputValues(updatedValues);
      }
    } else if (e.key === 'ArrowLeft') {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className='otp password' style={{ display: 'flex', gap: '10px' }}>
      {inputValues.map((value, index) => (
        <input
          key={index}
          id={index.toString()}
          ref={(el) => (inputRefs.current[index] = el)}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            fontSize: '24px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      ))}
    </div>
  );
}

export default Otp;
