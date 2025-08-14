import { useEffect, useState } from 'react'
import Alunos from './Alunos.jsx'
import Disciplinas from './Disciplinas.jsx'
import BuscarPorMatricula from './BuscarPorMatricula.jsx'
import { api } from '../services/api'

export default function Dashboard(){
  const [tab, setTab] = useState('alunos')
  const [counts, setCounts] = useState({ alunos: 0, disciplinas: 0 })

  async function loadCounts(){
    const [a, d] = await Promise.all([ api.get('/alunos'), api.get('/disciplinas') ])
    setCounts({ alunos: a.data.length, disciplinas: d.data.length })
  }

  useEffect(()=>{ loadCounts() },[])

  return (
    <div className="card">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="badges">
          <span className="badge">Alunos: {counts.alunos}</span>
          <span className="badge">Disciplinas: {counts.disciplinas}</span>
        </div>
      </div>

      <div className="tabs">
        <button className={tab==='alunos'?'tab active':'tab'} onClick={()=>setTab('alunos')}>Alunos</button>
        <button className={tab==='disciplinas'?'tab active':'tab'} onClick={()=>setTab('disciplinas')}>Disciplinas</button>
        <button className={tab==='buscar'?'tab active':'tab'} onClick={()=>setTab('buscar')}>Buscar por Matrícula</button>
      </div>

      {tab==='alunos' && <Alunos onChanged={loadCounts} />}
      {tab==='disciplinas' && <Disciplinas onChanged={loadCounts} />}
      {tab==='buscar' && <BuscarPorMatricula />}
    </div>
  )
}