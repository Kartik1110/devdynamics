import { Author, DashboardCardsValues, RootObject } from "@/interfaces";

// Fetch worklog data
export const getWorkLogData = async () => {
  try {
    const response = await fetch("/mockData/data.json");
    const data: RootObject = await response.json();
    return data.data.AuthorWorklog;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Calculate deployment frequency (approximated by PR merged count)
export const calculateDeploymentFrequency = (authors: Author[]) => {
  return authors?.reduce((acc: { author: string, PR: number }[], author) => {
    const mergedPRCount = author.totalActivity.find((activity) => activity.name === "PR Merged")?.value;
    if (mergedPRCount) {
      acc.push({ author: author.name.split("@devdynamics.ai")[0], PR: +mergedPRCount || 0 });
    }
    return acc;
  }, []);
};

// Get total values for dashboard cards
export const getDashboardTotalValues = (authors: Author[]) => {
  return authors?.reduce((acc: DashboardCardsValues, author) => {
    const mergedPRCount = author.totalActivity.find((activity) => activity.name === "PR Merged")?.value;
    const openPRCount = author.totalActivity.find((activity) => activity.name === "PR Open")?.value;
    const incidentAlertsCount = author.totalActivity.find((activity) => activity.name === "Incident Alerts")?.value;
    const incidentsResolvedCount = author.totalActivity.find((activity) => activity.name === "Incidents Resolved")?.value;
    acc.totalPrMerged += +mergedPRCount! || 0;
    acc.totalPrOpen += +openPRCount! || 0;
    acc.totalIncidentAlerts += +incidentAlertsCount! || 0;
    acc.totalIncidentsResolved += +incidentsResolvedCount! || 0;
    return acc;
  }, { totalPrMerged: 0, totalPrOpen: 0, totalIncidentAlerts: 0, totalIncidentsResolved: 0 });
}