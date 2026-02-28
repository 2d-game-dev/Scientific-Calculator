import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState("0")
  const [prevValue, setPrevValue] = useState(null)
  const [operation, setOperation] = useState(null)

  

  function handleClick(value) {
   const max_length = 20

   // Allow negative second number (e.g. 5 * -3)
if (value === "-" && display === "0" && operation !== null) {
  setDisplay("-")
  return
}


   // Handle negative number input
if (value === "-" && display === "0" && operation === null) {
  setDisplay("-")
  return
}

    if (value === "C"){
      setDisplay("0")
      setPrevValue(null)
      setOperation(null)
      return
    }

    if (!isNaN(value) || value === ".") {
 if (value === "." && display.includes(".")) return
  if (display.length >= max_length) return

  if (display === "0" && value !== ".") {
    setDisplay(value)
  } else {
    setDisplay(display + value)
  }
  return
}

    if (value === "Log"){
      if (display === "Error") return
      const num = Number(display)
      if (isNaN(num) || num <= 0) {
        setDisplay("Error")
      } else {
       setDisplay(Math.log10(num).toString())
      }
      return
    }

    if (value === "√"){
      if (display === "Error") return
      const num = Number(display)
      if (isNaN(num) || num < 0) {
        setDisplay("Error")
      } else {
       setDisplay(Math.sqrt(num).toString())
      }
      return
    }

    if (value === "X²"){
      if (display === "Error") return
      const num = Number(display)
      setDisplay((num * num).toString())
      return
    }

    if (value === "X³"){
     if (display === "Error") return
      const num = Number(display)
      setDisplay((num * num * num).toString())
      return
    }

    if (value === "Ln"){
      if (display === "Error") return
      const num = Number(display)
      if (isNaN(num) || num <= 0) {
        setDisplay("Error")
      } else {
       setDisplay(Math.log(num).toString())
      }
      return
    }

    if (value === "Sin"){
      if (display === "Error") return
      const num = Number(display)
      const rad = num * Math.PI / 180
      setDisplay(Math.sin(rad).toString())
      return
    }

    if (value === "Cos"){
      if (display === "Error") return
      const num = Number(display)
      const rad = num * Math.PI / 180
      setDisplay(Math.cos(rad).toString())
      return
    }
    
    if (value === "Tan") {
  if (display === "Error") return

  const num = Number(display)
  const rad = num * Math.PI / 180
  const tanValue = Math.tan(rad)

  if (!isFinite(tanValue)) {
    setDisplay("Error")
  } else {
    setDisplay(tanValue.toString())
  }
  return
}

  if (value === "Ctan") {
  if (display === "Error") return

  const num = Number(display)
  if (isNaN(num)) {
    setDisplay("Error")
    return
  }

  const rad = num * Math.PI / 180
  const tanValue = Math.tan(rad)

  // tan is 0 or extremely close to 0 = undefined cotangent
  if (Math.abs(tanValue) < 1e-10) {
    setDisplay("Error")
  } else {
    setDisplay((1 / tanValue).toString())
  }
  return
}


    if (value === "eˣ"){
      if (display === "Error") return
      const num = Number(display)
      setDisplay((Math.exp(num)).toString())
      return
    }

    if (value === "π"){
      setDisplay(Math.PI.toString())
      return
    }

    if (["+", "-", "*", "/", "mod"].includes(value)){
         setPrevValue(Number(display)) 
          setOperation(value)
          setDisplay("0")
          return
    }

    if (value === "="){
      if (operation === null || prevValue === null) return
      
      let result
      const currentValue = Number(display)

      switch (operation) {
        case "+":
          result = prevValue + currentValue
          break
        case "-":
          result = prevValue - currentValue
          break
        case "*":
          result = prevValue * currentValue
          break
        case "/":
          result = currentValue !== 0 ? prevValue / currentValue : "Error"
          break
        case "mod":
          result = prevValue % currentValue
          break
        default:
          return
      }
      setDisplay(String(result))
      setPrevValue(null)
      setOperation(null)
      
    }
  }

  return (
    <div className="calculator">

     <div className="screen">
      {prevValue !== null ? `${prevValue} ${operation ?? ""}` : ""}
      {display}
</div>

    <button onClick={() => handleClick("C")}>C</button>
    <button onClick={() => handleClick("Log")}>Log</button>
    <button onClick={() => handleClick("√")}>√</button> 
    <button onClick={() => handleClick("X²")}>X²</button>
    <button onClick={() => handleClick("X³")}>X³</button>
           
    <button onClick={() => handleClick("Ln")}>Ln</button>
    <button onClick={() => handleClick("7")}>7</button>
    <button onClick={() => handleClick("8")}>8</button>
    <button onClick={() => handleClick("9")}>9</button>
    <button onClick={() => handleClick("/")}>/</button>

    <button onClick={() => handleClick("Sin")}>Sin</button>
    <button onClick={() => handleClick("4")}>4</button>
    <button onClick={() => handleClick("5")}>5</button>
    <button onClick={() => handleClick("6")}>6</button>
    <button onClick={() => handleClick("*")}>*</button>

    <button onClick={() => handleClick("Cos")}>Cos</button>
    <button onClick={() => handleClick("1")}>1</button>
    <button onClick={() => handleClick("2")}>2</button>
    <button onClick={() => handleClick("3")}>3</button>
    <button onClick={() => handleClick("-")}>-</button>

    <button onClick={() => handleClick("Tan")}>Tan</button>
    <button onClick={() => handleClick("0")}>0</button>
    <button onClick={() => handleClick(".")}>.</button>
    <button onClick={() => handleClick("mod")}>Mod</button>
    <button onClick={() => handleClick("+")}>+</button>

    <button onClick={() => handleClick("Ctan")}>Ctan</button>
    <button onClick={() => handleClick("eˣ")}>eˣ</button>
    <button onClick={() => handleClick("π")}>π</button>
    <button onClick={() => handleClick("=")} style={{ gridColumn: "span 2" }}>=</button>
    </div>
     
  )
}

export default App
