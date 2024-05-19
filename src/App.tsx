import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Activity, Ban, Bell, HeartPulse, Rocket, SquareActivity, Timer } from 'lucide-react'
import { Progress } from './components/ui/progress';
import CardLayout from './components/CardLayout'
import DashboardCards from './components/DashboardCards'
import { AuthorWorklog, DashboardCardData } from '@/interfaces';
import { calculateChangeFailureRate, calculateDeploymentFrequency, calculateMeanTimeToRestore, calulateLeadTimeForChanges, getDashboardTotalValues, getWorkLogData } from '@/services';

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

  /**
   * Generates a random fill color based on the activity metadata.
   * @returns The randomly generated fill color.
   */
  function getRandomFillColor() {
    if (activityMeta === undefined) return "#ff0000";
    const randomIndex = Math.floor(Math.random() * activityMeta.length);
    return activityMeta[randomIndex].fillColor;
  }

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
      icon: <Bell />,
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

  // Calculate lead time for changes (approximated by time between PR open and merge)
  const leadTimesData = calulateLeadTimeForChanges(authors || [])

  // Categorize lead times into buckets to display in a bar chart
  const leadTimesChartData = leadTimesData?.reduce((acc: { label: string, count: number }[], curr) => {
    const leadTime = curr.leadTimeMedian;
    if (leadTime !== null) {
      if (leadTime < 2) {
        acc[0].count += 1;
      } else if (leadTime >= 2 && leadTime <= 7) {
        acc[1].count += 1;
      } else if (leadTime > 7) {
        acc[2].count += 1;
      }
    }
    return acc;
  }, [{ label: "< 2 days", count: 0 }, { label: "2-7 days", count: 0 }, { label: "> 7 days", count: 0 }]);

  // Calculate change failure rate
  const changeFailureRate = calculateChangeFailureRate(authors || []);

  // Calculate mean time to restore
  const meanTimeToRestore = calculateMeanTimeToRestore(authors || []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full pt-5 pb-10 space-y-5 px-[15%]  h-auto bg-gray-50'>
      <h1 className='text-2xl font-sans font-medium'>Dashboard</h1>
      <div className="grid grid-flow-row-dense gap-10 grid-cols-3 grid-rows-3">
        <div className="col-span-2">
          <CardLayout title="Overall Insights"
            tooltip={{ heading: 'Overall Insights', text: 'Provides overall developer activity overview', bgColor: getRandomFillColor() }}
            content={<DashboardCards data={dashboardCardsData} />} icon={<Activity />} />
        </div>
        <div className='col-span-1'>
          {deploymentFrequency.length > 0 ? (
            <CardLayout title="Deployment Frequency (DF)"
              tooltip={{ heading: 'Deployment Frequency (DF)', text: 'Number of merged PRs per day or week for each developer', bgColor: getRandomFillColor() }}
              icon={<Rocket />}
              content={
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deploymentFrequency}>
                      <Tooltip contentStyle={{ borderRadius: 10 }} />
                      <XAxis dataKey="author" className='text-sm' />
                      <Bar dataKey="PR" fill={"#4D4DFF"} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              } />
          ) : (
            <CardLayout title="Deployment Frequency (DF)" icon={<Rocket />} content={<div>No data found</div>} />
          )}
        </div>

        <div className='col-span-1'>
          {leadTimesChartData!.length > 0 ? (
            <CardLayout title="Lead Time (LT)"
              tooltip={{ heading: 'Lead Time (LT)', text: 'Calculate lead time for changes - approximated by time between PR open and PR merge', bgColor: getRandomFillColor() }}
              icon={<Timer />} content={
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadTimesChartData}>
                      <Tooltip contentStyle={{ borderRadius: 10 }} />
                      <XAxis dataKey="label" className='text-sm' />
                      <Bar dataKey="count" fill={getRandomFillColor()} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              } />
          ) : (
            <CardLayout title="Lead Time (LT)" icon={<Timer />} content={<div>No data found</div>} />
          )}
        </div>
        <div className="col-span-1 h-[100%]">
          <CardLayout title="Change Failure Rate (CFR)"
            tooltip={{ heading: 'Change Failure Rate (CFR)', text: 'Change Failure Rate is caluculated by average time between an Incident Alert and Merged PRs for each author', bgColor: getRandomFillColor() }}
            icon={<Ban />} content={
              <div className='pt-2 h-32 flex flex-col justify-evenly items-center'>
                {changeFailureRate.map((data) => {
                  let color;
                  let value
                  if (data.changeFailureRate >= 0 && data.changeFailureRate <= 33) {
                    color = 'bg-green-500';
                    value = 33
                  } else if (data.changeFailureRate >= 34 && data.changeFailureRate <= 66) {
                    color = 'bg-yellow-500';
                    value = 66
                  } else if (data.changeFailureRate >= 67) {
                    color = 'bg-red-500';
                    value = 90
                  }

                  return (
                    <div className='w-full flex flex-row items-center justify-between space-x-5' key={data.author}>
                      <p className={`text-center text-sm text-white p-1 m-1 rounded-full ${color}`}></p>
                      <Progress value={value} />
                      <p className='min-w-14 text-sm font-light'>{data.author}</p>
                    </div>
                  );
                })}
              </div>
            } />
        </div>
        <div className="col-span-1 h-[100%]">
          {meanTimeToRestore.length > 0 ? (
            <CardLayout title="Mean Time to Restore (MTTR)"
            tooltip={{ heading: 'Mean Time to Restore (MTTR)', text: 'Mean Time to Restore is caluculated by average time between an Incident Alert and its resolution for each author', bgColor: getRandomFillColor() }}
             icon={<SquareActivity />} content={
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={meanTimeToRestore}
                    margin={{
                      top: 5,
                      right: 30,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="author" className='text-sm' />
                    <YAxis className='text-sm' />
                    <Tooltip contentStyle={{ borderRadius: 10 }} />
                    <Line type="monotone" dataKey="mttr" stroke="#5F50A9" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            } />
          ) : (
            <CardLayout title="Mean Time to Restore (MTTR)" icon={<SquareActivity />} content={<h1>Not enough data</h1>} />
          )}
        </div>
        <div className='col-span-3'>
          <CardLayout title="Developer Productivity" content={
            <div className="h-[150px]">
              <h1>Dev</h1>
            </div>
          } />
        </div>
      </div>
    </div>
  )
}

export default App
