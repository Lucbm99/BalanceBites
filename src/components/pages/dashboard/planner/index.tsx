"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { updatePlannerData } from "@/db/actions";
import { useDebounce } from "@/hooks/use-debounce";
import { mergician } from "mergician";
import { User } from "next-auth";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InfosSideBar } from "./infos-sidebar";
import { PlannerContent } from "./planner-content";
import { StructureSidebar } from "./structure-sidebar";

type PlannerPageProps = {
    title: string;
    initialData: Partial<PlannerData>;
    user?: User;
}

export const PlannerPage = ({ title, initialData, user}: PlannerPageProps) => {
    const params = useParams();

    const plannerId = params.id as string;

    const defaultValues: PlannerData = {
        content: {
            summary: "<p></p>",
            image: {
                url: user?.image ?? "",
                visible: true
            },
            infos: {
                email: user?.email ?? "",
                fullName: user?.name ?? "",
                headline: "",
                phone: "",
                location: "",
                weight: "",
                height: "",
            },
            meals: [],
            consume: [],
            notes: [],
            products: []
            // languages: [],
        },
        structure: {
            template: "ditto",
            colorTheme: "slate",
            language: "portuguese",
            layout: {
                mainSections: [
                    { key: "summary" },
                    { key: "meals" },
                    { key: "consume" },
                    { key: "notes" },
                    { key: "products" },
                ],
                // sidebarSections: [{ key: "languages" }, { key: "skills" }],
                sidebarSections: [],
            },
        },
    };
    
    const methods = useForm<PlannerData>({ 
        defaultValues: mergician(defaultValues, initialData)
    });

    const data = methods.watch();
    const debouncedData = useDebounce(JSON.stringify(data));

    const shouldSave = useRef(false);

    const handleSaveUpdates = useCallback(() => {
        try {
            if (!shouldSave.current) {
                shouldSave.current = true;
                return;
            }

            const updatedData = methods.getValues();

            updatePlannerData(plannerId, updatedData)
        } catch (error) {
            console.error(error);
        }
    }, [methods, plannerId])

    useEffect(() => {
        handleSaveUpdates();
    }, [debouncedData, handleSaveUpdates])

    return (
        <FormProvider {...methods}>
            <main className="w-full h-screen overflow-hidden">
                <ResizablePanelGroup direction="horizontal" className="w-full w-full">
                    <ResizablePanel minSize={20} maxSize={40} defaultSize={30}>
                        <InfosSideBar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    
                    <ResizablePanel>
                        <PlannerContent title={title} />
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