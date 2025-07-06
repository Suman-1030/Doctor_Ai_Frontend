import React, { useState, useEffect, useRef } from 'react';

function Otp({ size = 6, setOtp }) {
  const [inputValues, setInputValues] = useState(() => new Array(size).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    setOtp(inputValues.join('')); // combine digits and send to parent
  }, [inputValues]);

  const Focusnext = (el) => el?.nextElementSibling?.focus();
  const FocusBack = (el) => el?.previousElementSibling?.focus();
  const LeftArrow = (el) => el?.previousElementSibling?.focus();
  const RightArrow = (el) => el?.nextElementSibling?.focus();

  const Otphandler = (e) => {
    const key = e.nativeEvent.data; // <-- FIX: capture typed value instead of e.key
    const idx = Number(e.target.id);

    if (!/^\d$/.test(key)) return;

    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[idx] = key;
      return newValues;
    });

    Focusnext(e.target);
  };

  const Backspacehandler = (e) => {
    if (e.key === 'Backspace') {
      const idx = Number(e.target.id);
      setInputValues((prev) => {
        const newValues = [...prev];
        newValues[idx] = '';
        return newValues;
      });
      FocusBack(e.target);
    }
  };

  const Arrowfunction = (e) => {
    if (e.key === 'ArrowLeft') LeftArrow(e.target);
    if (e.key === 'ArrowRight') RightArrow(e.target);
  };

  const onKeyChange = (e) => {
    Backspacehandler(e);
    Arrowfunction(e);
  };

  const onInputChange = (e) => {
    Otphandler(e);
  };

  return (
    <div className='otp'>
      <div className='password'>
        {inputValues.map((value, index) => (
          <input
            id={index.toString()}
            key={index}
            value={value}
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={onInputChange}
            onKeyDown={onKeyChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Otp;
