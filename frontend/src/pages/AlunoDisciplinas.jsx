import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'

export default function AlunoDisciplinas(){
  const { id } = useParams()
  const [disciplinas, setDisciplinas] = useState([])
  const [todas, setTodas] = useState([])
  const [selectId, setSelectId] = useState('')
  const [msg, setMsg] = useState('')

  async function load(){
    const [d1, d2] = await Promise.all([
      api.get(`/alunos/${id}/disciplinas`),
      api.get('/disciplinas')
    ])
    setDisciplinas(d1.data)
    setTodas(d2.data)
  }

  useEffect(()=>{ load() },[id])

  async function add(){
    try{
      if(!selectId) return
      await api.post(`/alunos/${id}/disciplinas`, { disciplinaId: selectId })
      setSelectId('')
      await load()
    }catch(err){ setMsg(err?.response?.data?.message || 'Erro ao alocar') }
  }

  async function remove(disciplinaId){
    await api.delete(`/alunos/${id}/disciplinas/${disciplinaId}`)
    await load()
  }

  const disponiveis = todas.filter(t => !disciplinas.find(d => d._id === t._id))

  return (
    <div className="card">
      <h2>Gerenciar Disciplinas do Aluno</h2>
      {msg && <p>{msg}</p>}

      <div className="form" style={{ marginBottom: 8 }}>
        <div className="row">
          <select value={selectId} onChange={e=>setSelectId(e.target.value)}>
            <option value="">Selecione uma disciplina</option>
            {disponiveis.map(d => <option value={d._id} key={d._id}>{d.nome}</option>)}
          </select>
          <button className="btn btn-green btn-base" onClick={add}>＋ Adicionar</button>
        </div>
      </div>

      <h3>Disciplinas do aluno</h3>
      {disciplinas.length === 0 ? (
        <p>Aluno sem disciplina cadastrada</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Carga Horária</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {disciplinas.map(d => (
                <tr key={d._id}>
                  <td className="trunc" title={d.nome}>{d.nome}</td>
                  <td>{d.cargaHoraria}h</td>
                  <td className="actions">
                    <button className="btn-pill btn-red-solid btn-base btn-sm" onClick={()=>remove(d._id)}>🗑️ <span>Remover</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}