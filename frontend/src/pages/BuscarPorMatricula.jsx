import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function BuscarPorMatricula(){
  const { matricula } = useParams()
  const navigate = useNavigate()
  const [input, setInput] = useState(matricula || '')
  const [aluno, setAluno] = useState(null)
  const [disciplinas, setDisciplinas] = useState([])
  const [msg, setMsg] = useState('')

  async function buscar(){
    setMsg('')
    setAluno(null)
    setDisciplinas([])
    if(!input) return
    try{
      const { data } = await api.get(`/alunos/matricula/${input}`)
      setAluno(data)
      const dd = await api.get(`/alunos/${data._id}/disciplinas`)
      setDisciplinas(dd.data)
    }catch(err){ setMsg(err?.response?.data?.message || 'Não encontrado') }
  }

  useEffect(()=>{ if(matricula){ setInput(matricula); buscar() } },[matricula])

  return (
    <div className="card">
      <h2>Buscar Aluno por Matrícula</h2>
      <div className="form">
        <input placeholder="Matrícula" value={input} onChange={e=>setInput(e.target.value)} />
        <button onClick={()=>{ navigate(`/alunos/matricula/${input}`); }}>Buscar</button>
      </div>
      {msg && <p>{msg}</p>}
      {aluno && (
        <div style={{ marginTop: 12 }}>
          <p><strong>Aluno:</strong> {aluno.nome} {aluno.curso?`(${aluno.curso})`:''}</p>
          <h3>Disciplinas</h3>
          {disciplinas.length === 0 ? (
            <p>Aluno sem disciplina cadastrada</p>
          ) : (
            <ul>
              {disciplinas.map(d => <li key={d._id}>{d.nome} - {d.cargaHoraria}h</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}