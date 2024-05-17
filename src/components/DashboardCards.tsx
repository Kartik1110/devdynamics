import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DashboardCardData } from "@/interfaces";

export default function DashboardCards({data}: {data: DashboardCardData[]}) {
    return (
        <div className="flex flex-row justify-center items-center space-x-4">

            {data.map((data, index) => (
                    <Card key={data.id} x-chunk={`dashboard-01-chunk-${index}`} className={`border border-slate-400 hover:border-slate-800`} style={{backgroundColor: `${data.fillColor}`}}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm text-white font-semibold pr-2">
                                {data.title}
                            </CardTitle>
                            <div className="h-4 w-4 text-white">{data.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl text-white font-bold">{data.value}</div>
                            {data.percentage && <p className="text-xs text-white">
                                {data.percentage}
                            </p>}
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    );
}