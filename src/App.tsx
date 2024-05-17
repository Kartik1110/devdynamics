import DashboardCards from './components/Dashboard'

function App() {

  return (
    <div className='w-full flex flex-col items-center pt-10 space-y-5 px-40 h-screen'>
      <h1 className='text-3xl font-bricolage'>Dashboard</h1>
      <DashboardCards />
    </div>
  )
}

export default App
