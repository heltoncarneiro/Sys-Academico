import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/ToastProvider.jsx'

function toBr(dateStr){
  if(!dateStr) return ''
  const parts = String(dateStr)
  if(/^\d{2}\/\d{2}\/\d{4}$/.test(parts)) return parts
  const d = new Date(dateStr)
  if(isNaN(d)) return ''
  const dd = String(d.getDate()).padStart(2,'0')
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

function onlyDigits(s){ return (s || '').replace(/[^0-9]/g,'') }

export default function Alunos({ onChanged }){
  const empty = { nome: '', endereco:'', dataNascimento:'', cpf:'', matricula:'', telefone:'', email:'', curso:'' }
  const [form, setForm] = useState(empty)
  const [alunos, setAlunos] = useState([])
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState({ open:false, id:null })
  const [filter, setFilter] = useState({ nome:'', curso:'' })
  const { pushToast } = useToast()

  async function load(){
    const { data } = await api.get('/alunos')
    setAlunos(data)
  }

  useEffect(()=>{ load() },[])

  function handleChange(e){ setForm({ ...form, [e.target.name]: e.target.value }) }

  function handleDateChange(e){
    const raw = e.target.value
    const digits = onlyDigits(raw).slice(0,8)
    const dd = digits.slice(0,2)
    const mm = digits.slice(2,4)
    const yyyy = digits.slice(4,8)
    const formatted = [dd,mm,yyyy].filter(Boolean).join('/')
    setForm({ ...form, dataNascimento: formatted })
  }

  function openCreate(){ setForm(empty); setEditing(null); setOpen(true) }
  function openEdit(a){ setForm({ ...a, dataNascimento: toBr(a.dataNascimento) }); setEditing(a._id); setOpen(true) }

  async function submit(){
    try{
      if(editing){
        const { _id, matricula, ...rest } = form
        await api.put(`/alunos/${_id}`, rest)
        pushToast('Aluno atualizado com sucesso', 'success')
      } else {
        const payload = { ...form }; delete payload.matricula
        await api.post('/alunos', payload)
        pushToast('Aluno criado com sucesso', 'success')
      }
      setOpen(false)
      await load()
      onChanged?.()
    }catch(err){ pushToast(err?.response?.data?.message || 'Erro ao salvar', 'error', 5000) }
  }

  async function remove(){
    try{
      await api.delete(`/alunos/${confirm.id}`)
      pushToast('Aluno excluído', 'success')
      setConfirm({ open:false, id:null })
      await load()
      onChanged?.()
    }catch(err){ pushToast('Erro ao excluir', 'error') }
  }

  const view = alunos.filter(a => {
    const okNome = filter.nome ? a.nome?.toLowerCase().includes(filter.nome.toLowerCase()) : true
    const okCurso = filter.curso ? (a.curso||'').toLowerCase().includes(filter.curso.toLowerCase()) : true
    return okNome && okCurso
  })

  return (
    <div>
      <div className="section-header">
        <h3>👤 Alunos</h3>
        <div className="actions">
          <button className="btn btn-green btn-base" onClick={openCreate}>＋ Novo Aluno</button>
        </div>
      </div>

      <div className="row" style={{ marginBottom: 8 }}>
        <input placeholder="Buscar por nome" value={filter.nome} onChange={e=>setFilter(f=>({ ...f, nome:e.target.value }))} />
        <input placeholder="Filtrar por curso" value={filter.curso} onChange={e=>setFilter(f=>({ ...f, curso:e.target.value }))} />
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Email</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
          {view.map(a => (
            <tr key={a._id}>
              <td data-label="Nome" title={a.nome}>{a.nome}</td>
              <td data-label="Matrícula">{a.matricula || '-'}</td>
              <td data-label="Email" title={a.email || ''}>{a.email || '-'}</td>
              <td data-label="Curso" title={a.curso || ''}>{a.curso || '-'}</td>
              <td className="actions">
                <Link to={`/alunos/${a._id}/disciplinas`}>
                  <button className="btn-pill btn-blue-plain btn-base btn-sm" aria-label="Disciplinas"><span>Disciplinas</span></button>
                </Link>
                <span>
                <button className="btn-pill btn-yellow btn-base btn-sm" aria-label="Editar" onClick={()=>openEdit(a)}><span>Editar</span></button>
                </span>
                <span>
                <button className="btn-pill btn-red-solid btn-base btn-sm" aria-label="Excluir" onClick={()=>setConfirm({ open:true, id:a._id })}><span>Excluir</span></button>
                </span>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} title={editing? 'Editar Aluno' : 'Novo Aluno'} onClose={()=>setOpen(false)} actions={
        <>
          <button className="btn btn-secondary btn-base" onClick={()=>setOpen(false)}>Cancelar</button>
          <button className={`btn ${editing ? 'btn-blue' : 'btn-green'} btn-base`} onClick={submit}>{editing?'Salvar':'Criar'}</button>
        </>
      }>
        <div className="form">
          <input name="nome" placeholder="Nome (obrigatório)" required value={form.nome} onChange={handleChange} />
          <div className="row">
            <input name="email" placeholder="E-mail" value={form.email||''} onChange={handleChange} />
            <input name="telefone" placeholder="Telefone" value={form.telefone||''} onChange={handleChange} />
          </div>
          <div className="row">
            <input name="curso" placeholder="Curso" value={form.curso||''} onChange={handleChange} />
            <input name="dataNascimento" placeholder="Data Nascimento (dd/mm/aaaa)" value={form.dataNascimento||''} onChange={handleDateChange} />
          </div>
          <div className="row">
            <input name="cpf" placeholder="CPF" value={form.cpf||''} onChange={handleChange} />
            <input name="endereco" placeholder="Endereço" value={form.endereco||''} onChange={handleChange} />
          </div>
        </div>
      </Modal>

      <Modal open={confirm.open} title={'Confirmar exclusão'} onClose={()=>setConfirm({ open:false, id:null })} actions={
        <>
          <button className="btn btn-secondary btn-base" onClick={()=>setConfirm({ open:false, id:null })}>Cancelar</button>
          <button className="btn btn-red-solid btn-base" onClick={remove}>Excluir</button>
        </>
      }>
        Tem certeza que deseja excluir este aluno?
      </Modal>
    </div>
  )
}