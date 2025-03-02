import { LucideIcon } from "lucide-react";
import { SectionTitle } from "../section-title";

export type PlannerArrayKeys = Exclude<keyof PlannerContentData, "image" | "infos" | "summary">;

export type MultipleDragItemData = {
    formKey: PlannerArrayKeys;
    title: string;
    icon: LucideIcon;
    titleKey: string;
    descriptionKey: string;
}

type MultipleDragListProps = {
    data: MultipleDragItemData;
    onAdd: () => void;
    onEdit: (index: number) => void;
}

export const MultipleDragList = ({
    data, 
    onAdd,
    onEdit
}: MultipleDragListProps) => {
    return (
        <div>
            <SectionTitle title={data.title} icon={data.icon} />

            <div className="mt-4 flex flex-col">

            </div>
        </div>
    )
}