import { getPlanners } from "@/db/queries"
import { AddPlannerButton } from "../add-planner-button"
import { NewPlannerDialog } from "../new-planner-dialog"
import { PlannerCard } from "../planner-card"

export const PlannersList = async () => {

    const planners = await getPlanners();

    const sortedPlanners = planners.sort((a, b) => {
        if (a.updatedAt < b.updatedAt) return 1;
        if (a.updatedAt > b.updatedAt) return -1;
        return 0;
    })

    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max gap-4 lg:gap-5 flex-1">
            <NewPlannerDialog>
                <AddPlannerButton /> 
            </NewPlannerDialog>
            {planners.map((planner) => (
                <PlannerCard key={planner.id} planner={planner} />
            ))}
        </section>
    )
}