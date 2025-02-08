import { AddPlannerButton } from "../add-planner-button"
import { NewPlannerDialog } from "../new-planner-dialog"
import { PlannerCard } from "../planner-card"

export const PlannersList = () => {
    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max gap-4 lg:gap-5 flex-1">
            <NewPlannerDialog>
                <AddPlannerButton /> 
            </NewPlannerDialog>
            <PlannerCard />
            <PlannerCard />
            <PlannerCard />
        </section>
    )
}