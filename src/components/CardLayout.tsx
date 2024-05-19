import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface CardLayoutProps {
    title: string;
    content: ReactNode;
    icon?: ReactNode;
    tooltip?: {
        heading: string;
        text: string;
        bgColor: string;
    }
}

export default function CardLayout({ title, content, icon, tooltip }: CardLayoutProps) {
    return (
        <Card className="hover:border hover:border-gray-300 h-[100%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-medium flex items-center justify-center">
                    {title}
                    {tooltip && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="ml-2 text-muted-foreground h-4" />
                                </TooltipTrigger>
                                <TooltipContent style={{backgroundColor: tooltip.bgColor}}>
                                    <div>
                                        <h1 className="text-lg">{tooltip.heading}</h1>
                                        <p className="text-md">{tooltip.text}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}