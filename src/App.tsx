import { Activity } from 'lucide-react'
import CardLayout from './components/CardLayout'
import DashboardCards from './components/DashboardCards'

function App() {

  return (
    <div className='w-full py-10 space-y-5 px-[15%] h-auto bg-gray-50'>
      <h1 className='text-3xl font-bricolage'>Dashboard</h1>

      <div className="grid grid-flow-row-dense gap-10 grid-cols-3 grid-rows-4">
        <div className="col-span-2">
          <CardLayout title="Insights" content={<DashboardCards />} icon={<Activity />} />
        </div>
        <div className='col-span-1'>
          <CardLayout title="Insights" content={<h1>Card</h1>} />
        </div>
        <div className="col-span-2 h-[100%]">
          <CardLayout title="Insights" content={<DashboardCards />} />
        </div>
        <div className='col-span-1'>
          <CardLayout title="Insights" content={<h1>Card</h1>} />
        </div>
        <div className='col-span-1'>
          <CardLayout title="Insights" content={<h1>Card</h1>} />
        </div>
        <div className='col-span-1'>
          <CardLayout title="Insights" content={<h1>Card</h1>} />
        </div>
        <div className='col-span-1'>
          <CardLayout title="Insights" content={<h1>Card</h1>} />
        </div>
        <div className='col-span-1'>
          <CardLayout title="Insights" content={<h1>Card</h1>} />
        </div>
        <div className='col-span-2'>
          <CardLayout title="Insights" content={<h1>Card</h1>} />
        </div>
      </div>
    </div>
  )
}

export default App
