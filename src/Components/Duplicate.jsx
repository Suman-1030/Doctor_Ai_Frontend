import React,{useState,useEffect} from 'react'

function Otp({size=6 }) {
const [inputValues,setinputValues]=useState(()=>{ return new Array(size).fill('')})


function Focusnext(event){
   event?.nextElementSibling?.focus()
}

function Focusnextnext(event){
  event?.nextElementSibling?.nextElementSibling?.focus()
}

function FocusBack(event){
  event?.previousElementSibling?.focus()
}

function LeftArrow(event){
  event?.previousElementSibling?.focus()
}

function RightArrow(event){
  event?.nextElementSibling?.focus()
}

function Otphandler(event){
    console.log("Keypressed",event.key)
    const inputValue=Number(event.key)
    console.log('inputValue',inputValue)
    const inputElement=event.target
   
    const inputIndex=Number(inputElement.id)
    console.log('inputIndex',inputIndex)
    if(isNaN(inputValue)) return;
    // if input is number
    if(inputValues[inputIndex]=='' && inputIndex <= size-1){
        setinputValues((prev)=>{
        const newValue = [...prev];
         newValue[inputIndex]=inputValue
         return newValue
    })
    Focusnext(event.target) 
    }
    else{
        const curserIndex=inputElement.selectionStart;
        const newInput=inputValue
       if(curserIndex==0){
          {setinputValues((prev)=>{
            const newvalues=[...prev]
            const currval=newvalues[inputIndex]
            if(inputIndex < size-1){
              newvalues[inputIndex+1]=currval
            }
            newvalues[inputIndex]=inputValue.toString()
            return newvalues
          })}
          Focusnextnext(event.target)
       }
       if(curserIndex===1){
           {setinputValues((prev)=>{
           const newvalues=[...prev];
           if(inputIndex< size-1){
           newvalues[inputIndex+1]=inputValue.toString()
          }
          return newvalues
        }
      )
    }
       Focusnextnext(event.target)
    } 
}
}



const Backspacehandler=(event)=>{
      if(event.key==='Backspace'){
        const inputIndex=Number(event.target.id)
        {setinputValues((prev)=>{
          const newValues=[...prev];
          newValues[inputIndex]=""
          return newValues
        })}
        FocusBack(event.target)
      }
}

const Arrowfunction=(event)=>{

      if(event.key==='ArrowLeft'){
        LeftArrow(event.target)
      }
      if(event.key==='ArrowRight'){
        RightArrow(event.target)
      }
      
}

const onKeyChange=(event)=>{
    Otphandler(event)
    Backspacehandler(event)
    Arrowfunction(event)
}

  return (
    <div className='otp'>
      <div className='password'>
         {inputValues.map((value,index)=>{
            return <input id={index.toString()} key={index.toString()} value={value} onChange={() => {}}  maxLength={1} onKeyUp={onKeyChange}/>
         })}
      </div>

    </div>
  )
}

export default Otp
