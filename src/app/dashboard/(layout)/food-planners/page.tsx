import { PlannersListSkeleton } from "@/components/pages/dashboard/planners/planners-list/skeleton";
import { PlannersList } from "../../../../components/pages/dashboard/planners/planners-list";
import { Suspense } from "react";

export default function DashboardFoodPlannersPage() {
    return (
        <>
            <h1 className="text-4xl font-title font-bold mb-6">Planejamento alimentar</h1>
        
            <Suspense fallback={<PlannersListSkeleton />}>
                <PlannersList />
            </Suspense>
        </>
    )
}