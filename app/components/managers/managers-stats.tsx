import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AlertTriangleIcon, BadgeCheckIcon, LaptopIcon, PartyPopper, PartyPopperIcon, UserCheck2Icon, UserCheckIcon, UserIcon, UserRoundXIcon } from "lucide-react";
import Link from "next/link";
// import cm from "@/public/images/cm.jpg"
import cm from "@/public/images/2pac.jpeg"
import Image from "next/image";
import ManagerPositionTrends from "./manager-position-trends";
export default function ManagersStats(){
    const totalManagers=100;
    const managersActive=80;
    const managersActivePercentage=(managersActive /totalManagers) *100;
    return(
        <div className="grid lg:grid-cols-3 gap-4">
        
        <Card>
           <CardHeader className="pb-2">
            <CardTitle className="text-base">
                All Managers
            </CardTitle>
           </CardHeader>
           <CardContent className="flex justify-between items-center">
             <div className="flex gap-2">
                <UserIcon/>
                <div className="text-5xl font-bold">100</div>
             </div>
             <div>
                <Button size="xs" asChild>
                 <Link href="/dashboard/managers">
                 View All
                 </Link>
                </Button>
             </div>
           </CardContent>
        </Card>
        <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-base">
                Managers Presently Active
            </CardTitle>
           </CardHeader>
           <CardContent>
           <div className="flex gap-2">
            {managersActivePercentage > 75 ?(
                 <UserCheck2Icon/>
            ):(
                <UserRoundXIcon/>
            )
            
        }
                
                <div className="text-5xl font-bold">{managersActive}</div>
             </div>
           </CardContent>
           <CardFooter>
            {managersActivePercentage > 75 ?(
                <span className="text-xs text-green-500 flex gap-1 items-center">
                <BadgeCheckIcon/>
                80% of managers received a rise in fpl</span>
            ):(<span>
                   
                   <span className="text-xs text-red-500 flex gap-1 items-center">
                <AlertTriangleIcon/>
                only {managersActivePercentage}% of managers are active in fpl</span>
                </span>)
                }
          
           </CardFooter>
        </Card>
        <Card className="border-pink-500 flex flex-col">
        <CardHeader className="pb-2">
            <CardTitle className="text-base">
                Manager of the Month
            </CardTitle>
           </CardHeader>
           <CardContent className="flex gap-2 items-center">
            <Avatar>
                <Image src={cm} alt="employee of the moneth" className="w-14 h-14 rounded-full"/>
                <AvatarFallback>
                    
                </AvatarFallback>
            </Avatar>
            <span className="text-2xl">2Pac Shakur!</span>
           </CardContent>
           <CardFooter className="flex gap-2 items-center text-xs text-muted-foreground mt-auto">
           <PartyPopperIcon className="text-pink-500"/>
           <span>Congratulations,Bash!</span>
           </CardFooter>
        </Card>
        <Card className="my-4 lg:col-span-3 w-full">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <LaptopIcon/>
                    <span>Fpl team stat trends</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ManagerPositionTrends/>
            </CardContent>
        </Card>
        
        </div>
    )
}