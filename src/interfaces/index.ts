interface ActivityMeta {
  label: string;
  fillColor: string;
}

interface DayWiseActivity {
  date: string;
  items: {
    children: {
      count: string;
      label: string;
      fillColor: string;
    }[];
  };
}

export interface TotalActivity {
  name: string;
  value: string;
}

interface ActiveDays {
  days: number;
  isBurnOut: boolean;
  insight: string[];
}

export interface Author {
  name: string;
  totalActivity: TotalActivity[];
  dayWiseActivity: DayWiseActivity[];
  activeDays: ActiveDays;
}

export interface AuthorWorklog {
  activityMeta: ActivityMeta[];
  rows: Author[];
}

interface Data {
  AuthorWorklog: AuthorWorklog;
}

export interface RootObject {
  data: Data;
}

export interface DashboardCardsValues {
  totalPrMerged: number;
  totalPrOpen: number;
  totalIncidentAlerts: number;
  totalIncidentsResolved: number;
}

export interface DashboardCardData {
  id: number;
  title: string;
  value: number;
  percentage?: string;
  icon: React.ReactNode;
  fillColor: string;
}

export interface TableData {
  author: string;
  prOpen: number;
  prMerged: number;
  commits: number;
  prReviewed: number;
  prComments: number;
  incidentAlerts: number;
  incidentsResolved: number;
}
