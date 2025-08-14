import { useEffect } from 'react'

export default function Modal({ open, title, children, onClose, actions }){
  useEffect(()=>{
    function onKey(e){ if(e.key==='Escape') onClose?.() }
    if(open){ window.addEventListener('keydown', onKey) }
    return ()=> window.removeEventListener('keydown', onKey)
  },[open, onClose])

  if(!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        {title && <h3 className="modal-title">{title}</h3>}
        <div className="modal-body">{children}</div>
        <div className="modal-actions">{actions}</div>
      </div>
    </div>
  )
}