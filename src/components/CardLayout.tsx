import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CardLayoutProps {
    title: string;
    content: ReactNode;
    icon?: ReactNode;
}

export default function CardLayout({ title, content, icon }: CardLayoutProps) {
    return (
        <Card className="hover:border hover:border-gray-800 h-[100%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-medium">
                    {title}
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}