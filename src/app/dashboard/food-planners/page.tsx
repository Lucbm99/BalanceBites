import { PlannersList } from "../planners/planners-list";

export default function DashboardFoodPlannersPage() {
    return (
        <>
            <h1 className="text-4xl font-title font-bold mb-6">Planejamento alimentar</h1>
        
            <PlannersList />
        </>
    )
}