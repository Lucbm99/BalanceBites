import { Skeleton } from "@/components/ui/skeleton";

export default function PlannerLoadingPage() {
    return (
        <div className="grid grid-cols-3 gap-2 h-screen w-full">
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
        </div>
    )
}   