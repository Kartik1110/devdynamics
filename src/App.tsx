import { Activity } from 'lucide-react'
import CardLayout from './components/CardLayout'
import DashboardCards from './components/DashboardCards'
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"

function App() {

  return (
    <div className='w-full pt-5 pb-10 space-y-5 px-[15%] h-auto bg-gray-50'>
      <h1 className='text-3xl font-sans font-medium'>Dashboard</h1>

      <div className="grid grid-flow-row-dense gap-10 grid-cols-3 grid-rows-4">
        <div className="col-span-2">
          <CardLayout title="Insights" content={<DashboardCards />} icon={<Activity />} />
        </div>
        <div className='col-span-1'>
          <CardLayout title="Insights" content={
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { goal: 400, label: "Jan" },
                  { goal: 300, label: "Feb" },
                  { goal: 200, label: "Mar" },
                  { goal: 300, label: "Apr" },
                  { goal: 200, label: "May" },
                  { goal: 278, label: "Jun" },
                  { goal: 189, label: "Jul" },
                  { goal: 239, label: "Aug" },
                  { goal: 300, label: "Sep" },
                  { goal: 200, label: "Oct" },
                  { goal: 278, label: "Nov" },
                  { goal: 189, label: "Dec" },
                  { goal: 349, label: "Jan" },]}>
                  <XAxis dataKey="label" />
                  <Bar dataKey="goal" fill={"#4D4DFF"} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          } />
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
