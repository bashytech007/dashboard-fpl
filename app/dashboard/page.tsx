import { Tabs, TabsList, TabsTrigger,TabsContent } from "@/components/ui/tabs";
import ManagersStats from "../components/managers/managers-stats";

export default function DashboardPage(){
    return <div>
        <Tabs defaultValue="managers">
            <TabsList className="mb-4">
                <TabsTrigger value="managers">
                    Manager stats
                </TabsTrigger>
                <TabsTrigger value="teams">
                    Teams stats
                </TabsTrigger>
            </TabsList>
            <TabsContent value="managers">
                 <ManagersStats/>
            </TabsContent>
            <TabsContent value="teamss">
                 Manager stats view
            </TabsContent>
        </Tabs>
    </div>
}