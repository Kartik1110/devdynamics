import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { Activity, HeartPulse, Rocket } from 'lucide-react'
import CardLayout from './components/CardLayout'
import DashboardCards from './components/DashboardCards'
import { AuthorWorklog, DashboardCardData } from './interfaces';
import { calculateDeploymentFrequency, getDashboardTotalValues, getWorkLogData } from './services';

function App() {
  const [data, setData] = useState<AuthorWorklog | null>(null);

  useEffect(() => {
    const data = getWorkLogData();
    data.then((data) => {
      setData(data as AuthorWorklog);
    });
  }, []);

  const authors = data?.rows;
  
  const activityMeta = data?.activityMeta;
  // Create a map of fillColor by label
  const fillColorByLabel: { [key: string]: string } = {};
  activityMeta?.forEach(activity => {
    fillColorByLabel[activity.label] = activity.fillColor;
  });

  // Calculate deployment frequency (approximated by PR merged count)
  const deploymentFrequency = calculateDeploymentFrequency(authors || []);

  // Get total values for dashboard cards
  const dashboardCardsValues = getDashboardTotalValues(authors || []);

  const dashboardCardsData: DashboardCardData[] = [
    {
      id: 1,
      title: "PR Open",
      value: dashboardCardsValues.totalPrOpen,
      percentage: "+20.1% from last month",
      icon: <Rocket />,
      fillColor: fillColorByLabel["PR Open"]
    },
    {
      id: 2,
      title: "PR Merged",
      value: dashboardCardsValues.totalPrMerged,
      percentage: "+180.1% from last month",
      icon: <Rocket />,
      fillColor: fillColorByLabel["PR Merged"]
    },
    {
      id: 3,
      title: "Incident Alerts",
      value: dashboardCardsValues.totalIncidentAlerts,
      percentage: "+0 from last month",
      icon: <HeartPulse />,
      fillColor: fillColorByLabel["Incident Alerts"]
    },
    {
      id: 4,
      title: "Incidents Res",
      value: dashboardCardsValues.totalIncidentsResolved,
      percentage: "+0 from last month",
      icon: <HeartPulse />,
      fillColor: fillColorByLabel["Incidents Resolved"]
    },
  ];

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full pt-5 pb-10 space-y-5 px-[15%] h-auto bg-gray-50'>
      <h1 className='text-3xl font-sans font-medium'>Dashboard</h1>

      <div className="grid grid-flow-row-dense gap-10 grid-cols-3 grid-rows-3">
        <div className="col-span-2">
          <CardLayout title="Overall Insights" content={<DashboardCards data={dashboardCardsData} />} icon={<Activity />} />
        </div>
        <div className='col-span-1'>
          {deploymentFrequency.length > 0 ? (
            <CardLayout title="Deployment Frequency" icon={<Rocket />} content={
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deploymentFrequency}>
                    <Tooltip />
                    <XAxis dataKey="author" />
                    <Bar dataKey="PR" fill={"#4D4DFF"} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            } />
          ) : (
            <CardLayout title="Deployment Frequency" icon={<Rocket />} content={<div>No data found</div>} />
          )}
        </div>
        <div className="col-span-2 h-[100%]">
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
        {/* <div className='col-span-1'>
          <CardLayout title="Insights" content={<h1>Card</h1>} />
        </div>
        <div className='col-span-2'>
          <CardLayout title="Insights" content={<h1>Card</h1>} />
        </div> */}
      </div>
    </div>
  )
}

export default App
