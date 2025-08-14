import { createContext, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  function pushToast(message, type='info', timeout=3000){
    const id = Math.random().toString(36).slice(2)
    setToasts((t)=>[...t, { id, message, type }])
    setTimeout(()=>{ setToasts(t=>t.filter(x=>x.id!==id)) }, timeout)
  }

  const value = useMemo(()=>({ pushToast }),[])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts">
        {toasts.map(t=> (
          <div key={t.id} className={`toast ${t.type}`}>{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(){
  const ctx = useContext(ToastContext)
  if(!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}