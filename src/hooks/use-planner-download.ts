import { api } from "@/lib/axios";
import { ApiService } from "@/services/api";
import { useFormContext } from "react-hook-form";
import { useMutation } from 'react-query';

export const usePlannerDownload = (title?: string) => {
    const handleDownloadPlanner = async () => {
        const { getValues } = useFormContext<PlannerData>();

        const { mutate: handleGetPlannerUrl, isPending } = useMutation({
            mutationFn: ApiService.getPlannerURL,
        })


        const planner = document.getElementById("planner-content")

        if (!planner) return;

        const structure = getValues("structure");

        const url = await handleGetPlannerUrl({
            html: planner.outerHTML,
            structure
        })

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title ?? "planejamento-alimentar"}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    return {
        handleDownloadPlanner,
        isLoading: isPending,
    }
}