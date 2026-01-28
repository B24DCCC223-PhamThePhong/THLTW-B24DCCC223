import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initValue) {
  const [state, setState] = useState(() => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : initValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}