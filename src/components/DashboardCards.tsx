import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function DashboardCards() {
    return (
        <div className="flex flex-row justify-center items-center space-x-4">

            {
                [
                    {
                        id: 1,
                        title: "Total Revenue",
                        value: "$45,231.89",
                        percentage: "+20.1% from last month",
                        icon: DollarSign,
                    },
                    {
                        id: 2,
                        title: "Subscriptions",
                        value: "+2350",
                        percentage: "+180.1% from last month",
                        icon: Users,
                    },
                    {
                        id: 3,
                        title: "Sales",
                        value: "+12,234",
                        percentage: "+19% from last month",
                        icon: CreditCard,
                    },
                    {
                        id: 4,
                        title: "Active Now",
                        value: "+573",
                        percentage: "+201 since last hour",
                        icon: Activity,
                    },
                ].map((data, index) => (
                    <Card key={data.id} x-chunk={`dashboard-01-chunk-${index}`} className="border border-slate-400 hover:shadow-md bg-indigo-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {data.title}
                            </CardTitle>
                            <data.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {data.percentage}
                            </p>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    );
}