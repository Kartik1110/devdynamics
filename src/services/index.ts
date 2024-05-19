import { Author, DashboardCardsValues, RootObject } from "@/interfaces";
import { getFormattedName, median } from "@/utils";

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
  return authors?.reduce((acc: { author: string; PR: number }[], author) => {
    const mergedPRCount = author.totalActivity.find((activity) => activity.name === "PR Merged")?.value;
    if (mergedPRCount) {
      acc.push({ author: getFormattedName(author.name), PR: +mergedPRCount || 0 });
    }
    return acc;
  }, []);
};

// Get total values for dashboard cards
export const getDashboardTotalValues = (authors: Author[]) => {
  return authors?.reduce(
    (acc: DashboardCardsValues, author) => {
      const mergedPRCount = author.totalActivity.find((activity) => activity.name === "PR Merged")?.value;
      const openPRCount = author.totalActivity.find((activity) => activity.name === "PR Open")?.value;
      const incidentAlertsCount = author.totalActivity.find((activity) => activity.name === "Incident Alerts")?.value;
      const incidentsResolvedCount = author.totalActivity.find(
        (activity) => activity.name === "Incidents Resolved"
      )?.value;
      acc.totalPrMerged += +mergedPRCount! || 0;
      acc.totalPrOpen += +openPRCount! || 0;
      acc.totalIncidentAlerts += +incidentAlertsCount! || 0;
      acc.totalIncidentsResolved += +incidentsResolvedCount! || 0;
      return acc;
    },
    { totalPrMerged: 0, totalPrOpen: 0, totalIncidentAlerts: 0, totalIncidentsResolved: 0 }
  );
};

// Calculate lead time for changes (approximated by time between PR open and merge)
export const calulateLeadTimeForChanges = (authors: Author[]) => {
  return authors?.map((row) => {
    const author = row.name;
    const openPRDates: Date[] = [];
    const leadTimes: number[] = [];

    row.dayWiseActivity.forEach((activity) => {
      const date = new Date(activity.date);
      const prOpenCount = activity.items.children.find((item) => item.label === "PR Open")?.count || 0;
      const prMergedCount = activity.items.children.find((item) => item.label === "PR Merged")?.count || 0;

      for (let i = 0; i < +prOpenCount; i++) {
        openPRDates.push(date);
      }

      for (let i = 0; i < +prMergedCount; i++) {
        if (openPRDates.length > 0) {
          const openDate = openPRDates.shift();
          if (openDate) {
            const leadTime = Math.round((date.getTime() - openDate.getTime()) / (1000 * 60 * 60 * 24));
            leadTimes.push(leadTime);
          }
        }
      }
    });

    if (leadTimes.length > 0) {
      const leadTimeMedian = median(leadTimes);
      return { author, leadTimeMedian };
    } else {
      return { author, leadTimeMedian: null };
    }
  });
};

// Calculate change failure rate
export const calculateChangeFailureRate = (authors: Author[]) => {
  const authorsData: {
    [key: string]: {
      mergedPRCount: number;
      incidentAlertCount: number;
    };
  } = {};

  authors?.forEach((row) => {
    const author = row.name;
    authorsData[author] = {
      mergedPRCount: 0,
      incidentAlertCount: 0,
    };

    row.totalActivity.forEach((activity) => {
      if (activity.name === "PR Merged") {
        authorsData[author].mergedPRCount = parseInt(activity.value);
      } else if (activity.name === "Incident Alerts") {
        authorsData[author].incidentAlertCount = parseInt(activity.value);
      }
    });
  });

  const res = [];
  for (const [author, authorData] of Object.entries(authorsData)) {
    const { mergedPRCount, incidentAlertCount } = authorData;
    const totalDeployments = mergedPRCount;
    const failedDeployments = incidentAlertCount;

    if (totalDeployments > 0) {
      const changeFailureRate = (failedDeployments / totalDeployments) * 100;
      res.push({
        author: getFormattedName(author),
        changeFailureRate,
      });
    } else {
      console.log(`No deployment data available for ${author}`);
    }
  }
  return res;
};

// Calculate mean time to restore (approximated by time between Incident Alerts and Incidents Resolved)
export const calculateMeanTimeToRestore = (authors: Author[]) => {
  const authorsData: {
    [key: string]: {
      incidentAlertCount: number;
      incidentsResolvedCount: number;
    };
  } = {};

  authors?.forEach((row) => {
    const author = row.name;
    authorsData[author] = {
      incidentAlertCount: 0,
      incidentsResolvedCount: 0,
    };

    row.totalActivity.forEach((activity) => {
      if (activity.name === "Incident Alerts") {
        authorsData[author].incidentAlertCount = parseInt(activity.value);
      } else if (activity.name === "Incidents Resolved") {
        authorsData[author].incidentsResolvedCount = parseInt(activity.value);
      }
    });
  });

  const res = [];
  for (const [author, authorData] of Object.entries(authorsData)) {
    const { incidentAlertCount, incidentsResolvedCount } = authorData;
    const totalIncidentAlerts = incidentAlertCount;
    const totalIncidentsResolved = incidentsResolvedCount;

    if (totalIncidentAlerts > 0) {
      const meanTimeToRestore = totalIncidentsResolved / totalIncidentAlerts;
      res.push({
        author: getFormattedName(author),
        mttr: meanTimeToRestore,
      });
    } else {
      console.log(`No incident data available for ${author}`);
    }
  }
  return res;
}
