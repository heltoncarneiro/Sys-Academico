import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

export default function Auth(){
  const [mode, setMode] = useState('login')
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ nome:'', email:'', senha:'' })
  const [msg, setMsg] = useState('')

  function handleChange(e){ setForm({ ...form, [e.target.name]: e.target.value }) }

  async function onSubmit(e){
    e.preventDefault()
    setMsg('')
    try{
      if(mode==='login'){
        const { data } = await api.post('/auth/login', { email: form.email, senha: form.senha })
        login(data)
        navigate('/dashboard')
      } else {
        await api.post('/auth/register', form)
        setMsg('Cadastro realizado! Faça login para continuar.')
        setMode('login')
      }
    }catch(err){
      setMsg(err?.response?.data?.message || 'Erro na operação')
    }
  }

  return (
    <div className="auth-center">
      <div className="card">
        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          <button className={mode==='login'?'btn btn-blue':'btn btn-secondary'} onClick={()=>setMode('login')}>Login</button>
          <button className={mode==='register'?'btn btn-green':'btn btn-secondary'} onClick={()=>setMode('register')}>Cadastro</button>
        </div>
        <h2>{mode==='login' ? 'Login' : 'Cadastro de Professor'}</h2>
        <form className="form" onSubmit={onSubmit}>
          {mode==='register' && (
            <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
          )}
          <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} />
          <span><button className="btn btn-purple" type="submit">{mode==='login' ? 'Entrar' : 'Cadastrar'}</button></span>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  )
}