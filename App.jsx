import { useState , useEffect} from 'react'

const database=[
  { pLang: "python", color: "black"},
  { pLang: "c++" ,color: "orange"},
  { pLang: "c", color: "red"},
  { pLang: "c#" ,color: "indigo"},
  { pLang: "cobol", color: "green"},
  { pLang: "java" ,color: "yellow"},
  { pLang: "r" ,color: "violet"},
  { pLang: "matLab", color: "silver"},
  { pLang: "rust" , color: "purple"},
  { pLang: "go" ,color: "pink"},
  { pLang: "php" ,color: "teal"},
  { pLang: "vue" ,color: "navy"},
  { pLang: "bash" ,color: "cyan"},
  { pLang: "ruby" ,color: "gold"},
  { pLang: "perl" ,color: "gray"},
  { pLang: "swift" ,color: "coral"},
  { pLang: "kotlin" ,color: "brown"},
  { pLang: "react" ,color: "lime"},
  { pLang: "javascrpt" ,color: "lavender"},
  { pLang: "f#" ,color: "blue"},
];

function App() {

  const [pLang, setPLang] = useState('');
  const [color, setColor] = useState('');
  const [bank, setBank] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [resultColor, setResultColor] = useState('');
  const [borderColor, setBorderColor] = useState('');

  const [displayText, setDisplayText] = useState('');

  const [showLanguages, setShowLanguages] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanguages(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(gameOver) return;

    const combination = '${pLang} ${color}';
    if (bank.find(val => val.pLang === pLang && val.color === color)) {
      setResult('You already submitted this combination!');
      setResultColor('red');
      setAttemptsLeft(attemptsLeft - 1);

     //setResult('You already submitted this combination! You have' + attemptsLeft + 'attempts left');
      return;
    } 

    setBank([...bank, { pLang, color }]);
    const found = database.find(item => item.pLang.trim().toLowerCase() ===
     pLang.trim().toLowerCase() && item.color.trim().toLowerCase() ===
      color.trim().toLowerCase());

    if (found) {
      setResult('Correct!!!!');
      setResultColor('green');
      setScore(score + 1);
      setBorderColor(database.find(item => item.pLang.toLowerCase() === pLang.toLowerCase()).color);


    } else {
      //setResult('Wrong!!!! Try again');
      setBorderColor('');
      setAttemptsLeft(attemptsLeft - 1);
      setResult('Wrong!!!! You have' + attemptsLeft +'attempts left.');
      setResultColor('red');
    }
    //   if (attemptsLeft === 0) {
    //     setResult(Wrong!!!! You have 0 attempts left. Your final score is ${score}.);
    //     setResultColor('red');
    //   } else {
    //     setResult(Wrong!!!! You have ${attemptsLeft} attempts left.);
    //     setResultColor('red');
    // }
    
    //   setResult('Wrong!!!! you have ' + attemptsLeft + ' attempts left');
    // }

    setCount(count + 1);
    setPLang('');
    setColor('');
    //setAttemptsLeft(attemptsLeft - 1);
    // setResult('');

    if ((attemptsLeft === 0 || count === 20)) {
      setResult('Game over! Your score is ' + score);
      setGameOver(true);

    }
  };

  const handleDisplay = () => {
    let text = '';
    bank.forEach((val, index) => {
      const found = database.find(item => item.pLang.toLowerCase() === val.pLang.toLowerCase() && item.color.toLowerCase() === val.color.toLowerCase());
      text += `Attempt Number: ${index + 1} - Programming Lang: ${val.pLang} - Result: ${found ? 'Correct' : 'Wrong'}\n`;

 
    });
    setDisplayText(text);
  };

  return (
    <div style={{color:'white', backgroundColor: 'gray', height: 1000}} >
      <h1 style={{color:'white', backgroundColor: 'red', textAlign: 'center',}}> PROGRAMMING LANGUAGE COLOR GAME </h1>
      {showLanguages && (
        <div>
          {database.map((lang) => (
            <div key={lang.pLang} style={{ backgroundColor: lang.color, padding: '10px', margin: '10px' }}>
              {lang.pLang}
            </div>
          ))}
        </div>
      )}
      {!showLanguages && !gameOver && (

      <form onSubmit={handleSubmit}>
        <label>
          Programming Language:
          <input type="text" value={pLang} onChange={(e) => setPLang(e.target.value)}   style={{ borderColor: borderColor, border: '5px solid' }}/>
        </label>
        <br/>
        <br />
        <label>
          Color:
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)}  style={{ borderColor: borderColor, border: '5px solid' }}/>
        </label>
        <br />
        <br />
        <button type="submit" disabled={attemptsLeft<0 ||
           count===20}>Check</button>
      </form>
 )}
 {gameOver && (
   <div>
     <h2>Game Over!</h2>
     <p>Your score is {score}.</p>
     <button onClick={handleDisplay}>Display Answers</button>

       <p style={{color: resultColor}}> {result} </p>

      {displayText && (
  <table>
    <tr>
      <th> Attempt Number</th>
      <th> Programming Lang</th>
      <th> Result</th>
    </tr>
    {displayText.split('\n').map((line, index) => (
      <tr key={index}>
        <td>{line.split(' ')[0]}</td>
        {/* <td>{line.split(' ')[1]}</td>
        <td>{line.split(' - ')[1]}</td> */}
         <td style={{ backgroundColor: database.find(item => item.pLang.toLowerCase() === line.split(':')[1].trim().split(' ')[0].toLowerCase()).color }}>
                    {line.split(':')[1].trim().split(' ')[0]} </td>
                  <td>{line.split('-')[1].trim()}</td>

      </tr>
    ))}
  </table>
)}
</div>
)}

        <button onClick={handleDisplay}>Display Answers</button> 
      <pre>{displayText}</pre> 
    </div>
  );
}

export default App;