import { Plus } from "lucide-react"
import { PlannerCardButton } from "./planner-card"

export const AddPlannerButton = () => {
    return (
        <PlannerCardButton 
            title="Criar novo planejamento"
            description="Comece do zero"
            icon={<Plus size={50} />}
        />
    )
}