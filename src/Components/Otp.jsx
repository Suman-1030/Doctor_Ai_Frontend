import React, { useState, useEffect } from 'react';

function Otp({ size = 6, setOtp }) {
  const [inputValues, setInputValues] = useState(() => new Array(size).fill(''));

  useEffect(() => {
    setOtp(inputValues.join('')); // combine digits and send to parent
  }, [inputValues]);

  const Focusnext = (el) => el?.nextElementSibling?.focus();
  const FocusBack = (el) => el?.previousElementSibling?.focus();
  const LeftArrow = (el) => el?.previousElementSibling?.focus();
  const RightArrow = (el) => el?.nextElementSibling?.focus();

  const Otphandler = (e) => {
    const key = e.key;
    const val = Number(key);
    const idx = Number(e.target.id);

    if (isNaN(val)) return;

    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[idx] = val.toString();
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
    Otphandler(e);
    Backspacehandler(e);
    Arrowfunction(e);
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
            onChange={() => {}}
            onKeyUp={onKeyChange}
          />
        ))}
      </div>
      
    </div>
  );
}

export default Otp;
