import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import socket from './services/socket.js'

function App() {
  const [count, setCount] = useState(0)
  const [connected, setConnected] = useState(false)
  const [room, setRoom] = useState('room-1')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
    socket.on('recieve', (data) => {
      setMessages((prev) => [...prev, { from: data.sender || 'peer', text: data.message }])
    })
    socket.connect()
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('recieve')
      socket.disconnect()
    }
  }, [])

  const join = () => {
    socket.emit('join', room)
  }

  const send = () => {
    const payload = { roomID: room, message: `Hello at ${new Date().toLocaleTimeString()}` }
    socket.emit('send', payload)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>Socket: {connected ? 'connected' : 'disconnected'} ({import.meta.env.VITE_WS_URL})</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <div>
          <input value={room} onChange={(e) => setRoom(e.target.value)} />
          <button onClick={join}>Join Room</button>
          <button onClick={send} disabled={!connected}>Send Test</button>
        </div>
        <ul>
          {messages.map((m, i) => (
            <li key={i}><strong>{m.from}:</strong> {m.text}</li>
          ))}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
