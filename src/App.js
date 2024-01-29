const App = () => {


    const getMessages = async () => {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: "Hello, how are you?"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      try{
        const response =  await fetch('http://localhost:8000/completions', options)
        const data = response.json()
      }catch(error) {
        console.error(error)
      }
    }



  return (
    <div className="App">
      <section className="side-bar">
        <button>+ New Chat</button>
        <ul className="history">
          <li>First Chat</li>
        </ul>
        <nav>
          <p>Made by KK</p>
        </nav>
      </section>
      <section className="main">
        <h1>KK ChatBot</h1>
        <ul className="feed">
          
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input/>
            <div id="submit" onClick={getMessages}>↣</div>
          </div>
          <p className="info">
            This Chatbot is made using GPT-3.5 turbo Model
          </p>
        </div>
      </section>
    </div>
  )
}

export default App