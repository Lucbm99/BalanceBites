import { Tooltip } from "@/components/ui/tooltip";
import { PlannerDTO } from "@/db/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type PlannerCardButtonProps = {
    title: string;
    description: string;
    icon?: ReactNode;
}

export const PlannerCardButton = ({ title, description, icon }: PlannerCardButtonProps) => {
    return (
        <button className={cn(
            "w-full h-[300px]",
                "bg-emerald-50 dark:bg-sky-500/50",
                "rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700",
                "flex items-center justify-center relative overflow-hidden",
                "hover:shadow-lg hover:scale-[1.01] transition-all duration-200 ease-in-out"
            )}>
                {icon}

                <div className="absolute w-full left-0 bottom-0 p-3 text-left bg-gradient-to-t from-background/80">
                    <p className="text-sm font-semibold font-title">{title}</p>
                    <span className="block text-xs text-muted-foreground">{description}</span>
                </div>
            </button>
    )
}

type PlannerCardProps = {
    planner: PlannerDTO;
}

export const PlannerCard = ({ planner }: PlannerCardProps) => {
    const formattedLastUpdate = formatDistanceToNow(new Date(planner.updatedAt), { addSuffix: true });

    return (
        <Link href={`/dashboard/food-planners/${planner.id}`} className="block w-full">
            <Tooltip content="Clique para mais detalhes">
                <PlannerCardButton 
                    title={planner.title}
                    description={`Última atualização ${formattedLastUpdate}`}
                    icon={<Newspaper size={50} />}
                />
            </Tooltip>
        </Link>
    )
}