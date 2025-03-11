import { PlannerPage } from "@/components/pages/dashboard/planner";
import { getPlannerById } from "@/db/queries";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

type DashboardPlannersPageProps = {
    params: { id: string }
}

export default async function DashboardPlannerPage({ params }: DashboardPlannersPageProps) {
    const plannerId = params.id;
    
    const planner = await getPlannerById(plannerId);

    if (!planner) return notFound();

    const initialData = planner.data as PlannerData;

    const session = await auth();

    return (
        <PlannerPage 
            title={planner.title} 
            initialData={initialData}
            user={session?.user}
        />
    )
}