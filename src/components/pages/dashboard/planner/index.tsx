"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FormProvider, useForm } from "react-hook-form";
import { InfosSideBar } from "./infos-sidebar";
import { PlannerContent } from "./planner-content";
import { StructureSidebar } from "./structure-sidebar";

export const PlannerPage = () => {
    const defaultValues: PlannerData = {
        content: {
            image: {
                url: "",
                visible: true
            },
            infos: {
                email: "",
                fullName: "",
                headline: "",
                location: "",
                phone: "",
                website: "",
            },
            summary: "",
            certifications: [],
            educations: [],
            experiences: [],
            languages: [],
            projects: [],
            skills: [],
            socialMedias: [],
        },
    }
    const methods = useForm<PlannerData>({ defaultValues });

    return (
        <FormProvider {...methods}>
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
        </FormProvider>
    )
}