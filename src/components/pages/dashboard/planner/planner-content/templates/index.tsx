import { useMemo } from "react";
import { Ditto } from "./ditto";
import { Eevee } from "./eevee";
import { Jynx } from "./jynx";
import { Onix } from "./onix";

export type BasePlannerProps = {
    data: PlannerData;
}

type PlannerTemplateProps = {
    data: PlannerData;
}

const templatesMap: Record<PlannerTemplates, React.FC<BasePlannerProps>> = {
    ditto: Ditto,
    eevee: Eevee,
    jynx: Jynx,
    onix: Onix,
}

export const PlannerTemplate = ({ data }: PlannerTemplateProps) => {
    const template = data.structure.template;

    const Planner = useMemo(() => {
        return templatesMap[template];
    }, [template])

    return (
        <div
            id="planner-content"
            className="w-[210mm] min-h-[297mm] bg-white text-black font-arial [&_hr]:border-black"
        >
            <Planner data={data} />
        </div>
    )
}