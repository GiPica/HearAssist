import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import HearAssistLogo from '../components/HearAssistLogo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUserName } = useApp()
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    const name = email.split('@')[0] || 'User'
    setUserName(name.charAt(0).toUpperCase() + name.slice(1))
    navigate('/home')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <div className="flex flex-col items-center mb-8">
        <HearAssistLogo size={80} />
        <h1 className="mt-3 text-3xl font-extrabold tracking-widest">
          <span className="text-[#1B2A6B]">HEAR</span>
          <span className="text-[#7B5EA7]">ASSIST</span>
        </h1>
      </div>

      <form onSubmit={handleLogin} className="glass p-6 w-full flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-white/60 rounded-full px-5 py-3 text-[#1B2A6B] placeholder-[#8899bb] outline-none text-sm font-medium focus:bg-white/80 transition-colors"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-white/60 rounded-full px-5 py-3 text-[#1B2A6B] placeholder-[#8899bb] outline-none text-sm font-medium focus:bg-white/80 transition-colors"
        />
        <button
          type="submit"
          className="w-full bg-[#2D3A8C] text-white font-bold text-lg rounded-xl py-4 mt-2 active:scale-95 transition-transform shadow-md"
        >
          LOGIN
        </button>

        <div className="flex flex-col items-center gap-2 mt-1">
          <button type="button" className="text-[#1B2A6B]/70 text-sm font-medium hover:text-[#1B2A6B]">
            Forgot Password?
          </button>
          <button type="button" className="text-[#1B2A6B]/70 text-sm font-medium hover:text-[#1B2A6B]">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}
