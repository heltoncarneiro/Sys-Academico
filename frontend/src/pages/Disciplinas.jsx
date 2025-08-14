import { useEffect, useState } from 'react'
import { api } from '../services/api'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/ToastProvider.jsx'

export default function Disciplinas({ onChanged }){
  const [form, setForm] = useState({ _id:null, nome:'', cargaHoraria:'' })
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState({ open:false, id:null })
  const [filter, setFilter] = useState('')
  const { pushToast } = useToast()

  async function load(){
    const { data } = await api.get('/disciplinas')
    setItems(data)
  }

  useEffect(()=>{ load() },[])

  function handleChange(e){ setForm({ ...form, [e.target.name]: e.target.value }) }
  function openCreate(){ setForm({ _id:null, nome:'', cargaHoraria:'' }); setOpen(true) }
  function openEdit(i){ setForm({ _id:i._id, nome:i.nome, cargaHoraria:i.cargaHoraria }); setOpen(true) }

  async function submit(){
    try{
      if(form._id){
        await api.put(`/disciplinas/${form._id}`, { nome: form.nome, cargaHoraria: Number(form.cargaHoraria) })
        pushToast('Disciplina atualizada', 'success')
      } else {
        await api.post('/disciplinas', { nome: form.nome, cargaHoraria: Number(form.cargaHoraria) })
        pushToast('Disciplina criada', 'success')
      }
      setOpen(false)
      await load()
      onChanged?.()
    }catch(err){ pushToast(err?.response?.data?.message || 'Erro ao salvar', 'error', 5000) }
  }

  async function remove(){
    try{
      await api.delete(`/disciplinas/${confirm.id}`)
      pushToast('Disciplina excluída', 'success')
      setConfirm({ open:false, id:null })
      await load()
      onChanged?.()
    }catch(err){ pushToast('Erro ao excluir', 'error') }
  }

  const view = items.filter(i => filter ? i.nome?.toLowerCase().includes(filter.toLowerCase()) : true)

  return (
    <div>
      <div className="section-header">
        <h3>📚 Disciplinas</h3>
        <div className="actions">
          <button className="btn btn-green btn-base" onClick={openCreate}>＋ Nova Disciplina</button>
        </div>
      </div>

      <div className="row" style={{ marginBottom: 8 }}>
        <input placeholder="Buscar por nome da disciplina" value={filter} onChange={e=>setFilter(e.target.value)} />
        <div></div>
      </div>

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
          {view.map(i => (
            <tr key={i._id}>
              <td data-label="Nome" title={i.nome}>{i.nome}</td>
              <td data-label="Carga Horária">{i.cargaHoraria}</td>
              <td className="actions">
                <span>
                  <button
                    className="btn-pill btn-yellow btn-base btn-sm"
                    aria-label="Editar"
                    onClick={() => openEdit(i)}
                  >
                    <span>Editar</span>
                  </button>
                </span>
                <span>
                  <button
                    className="btn-pill btn-red-solid btn-base btn-sm"
                    aria-label="Excluir"
                    onClick={() => setConfirm({ open: true, id: i._id })}
                  >
                    <span>Excluir</span>
                  </button>
                </span>
            </td>

            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} title={form._id? 'Editar Disciplina' : 'Nova Disciplina'} onClose={()=>setOpen(false)} actions={
        <>
          <button className="btn btn-secondary btn-base" onClick={()=>setOpen(false)}>Cancelar</button>
          <button className={`btn ${form._id ? 'btn-blue' : 'btn-green'} btn-base`} onClick={submit}>{form._id?'Salvar':'Criar'}</button>
        </>
      }>
        <div className="form">
          <input name="nome" placeholder="Digite o nome da disciplina" value={form.nome} onChange={handleChange} />
          <input name="cargaHoraria" placeholder="Carga Horária (em horas)" value={form.cargaHoraria} onChange={handleChange} />
        </div>
      </Modal>

      <Modal open={confirm.open} title={'Confirmar exclusão'} onClose={()=>setConfirm({ open:false, id:null })} actions={
        <>
          <button className="btn btn-secondary btn-base" onClick={()=>setConfirm({ open:false, id:null })}>Cancelar</button>
          <button className="btn btn-red-solid btn-base" onClick={remove}>Excluir</button>
        </>
      }>
        Tem certeza que deseja excluir esta disciplina?
      </Modal>
    </div>
  )
}