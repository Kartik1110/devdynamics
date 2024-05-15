import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full flex items-center justify-center mt-20 space-x-10'>
      <h1 className='text-3xl'>{count}</h1>
      <Button onClick={() => setCount((count) => count + 1)}>Increment</Button>
    </div>
  )
}

export default App
