import { useState, useEffect} from 'react'

const App = () => {
    const [ value, setvalue] = useState(null)
    const [ message, setMessage] = useState(null)
    const [ previousChats, setPreviousChats] = useState([])
    const [ currentTitle, setCurrentTitle] = useState([null])
    
    const createNewChat = () => {
      setMessage(null)
      setvalue("")
      setCurrentTitle(null)
    }

    const handleClick = (uniqueTitle) => {
       setCurrentTitle(uniqueTitle)
       setMessage(null)
       setvalue("")
    }

    const getMessages = async () => {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      try{
        const response =  await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        setMessage(data.choices[0].message)
      }catch(error) {
        console.error(error)
      }
    }

    useEffect(() => {
      console.log(currentTitle, value, message)
      if(!currentTitle && value && message){
        setCurrentTitle(value)
      }
      if(currentTitle && value && message){
        setPreviousChats(prevChats => (
          [...prevChats,
                {
                  title: currentTitle,
                  role: "user",
                  content: value
                },
                {
                  title: currentTitle,
                  role: message.role,
                  content: message.content
                }
            ]
        ))
      }
    }, [ message, currentTitle])

    const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  
  
  return (
    <div className="App">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Made by KK</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>KK ChatBot</h1>}
        <ul className="feed">
           {currentChat?.map((chatMessage, index) => <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setvalue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>↣</div>
          </div>
          <p className="info">
            This Chatbot is made using GPT-3.5 turbo Model
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
