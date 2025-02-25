import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { InfosSideBar } from "./infos-sidebar"
import { PlannerContent } from "./planner-content"
import { StructureSidebar } from "./structure-sidebar"

export const PlannerPage = () => {
    return (
        <main className="w-full h-screen overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="w-full w-full">
                <ResizablePanel minSize={20} maxSize={40} defaultSize={30}>
                    <InfosSideBar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                
                <ResizablePanel>
                    <PlannerContent />
                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel minSize={20} maxSize={35} defaultSize={25}>
                    <StructureSidebar />
                </ResizablePanel>
            </ResizablePanelGroup>
        </main>
    )
}