import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import { usePlannerDownload } from "@/hooks/use-planner-download"
import { cn } from "@/lib/utils"
import { Copy, Download, Home, Trash } from "lucide-react"
import Link from "next/link"
import { DeletePlannerDialog } from "./delete-planner-dialog"
import { DuplicatePlannerDialog } from "./duplicate-planner-dialog"

type NavigationHeaderProps = {
    title: string;
}

export const NavigationHeader = ({ title }: NavigationHeaderProps) => {
    const { handleDownloadPlanner, isLoading } = usePlannerDownload(title);
    
    return (
        <header
            className={cn(
                "absolute w-full left-0 top-0 z-10 p-2 bg-background border-b border-muted",
                "flex items-center justify-between gap-2"
            )}
        >
            <div className="flex items-center gap-2">
                <Tooltip content="Voltar ao painel">
                    <Link href="/dashboard/food-planners" passHref>
                        <Button
                            variant="secondary"
                            className="w-8 h-8 bg-transparent"
                            size="icon"
                        
                        >
                            <Home size={18} />
                        </Button>
                    </Link>
                </Tooltip>

                <span className="text-muted-foreground">/</span>

                <p className="text-lg font-title font-bold ml-1">{title}</p>
            </div>

            <div className="flex gap-1">
                <DeletePlannerDialog>
                    <Tooltip content="Deletar currículo">
                        <Button
                            variant="secondary"
                            className="w-8 h-8 bg-transparent"
                            size="icon"
                        >
                            <Trash size={18} />
                        </Button>
                    </Tooltip>
                </DeletePlannerDialog>

                <DuplicatePlannerDialog>
                    <Tooltip content="Duplicar currículo">
                        <Button
                            variant="secondary"
                            className="w-8 h-8 bg-transparent"
                            size="icon"
                        >
                            <Copy size={18} />
                        </Button>
                    </Tooltip>
                </DuplicatePlannerDialog>
                
                <Tooltip content="Baixar PDF">
                    <Button
                        variant="secondary"
                        className="w-8 h-8 bg-transparent"
                        size="icon"
                        onClick={handleDownloadPlanner}
                        disabled={isLoading}
                    >
                        <Download size={18} />
                    </Button>
                </Tooltip>
            </div>
        </header>
    )
}