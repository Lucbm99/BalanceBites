import { ApiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

export const usePlannerDownload = (title?: string) => {
    const { getValues } = useFormContext<PlannerData>();

    const { mutateAsync: handleGetPlannerUrl, isPending } = useMutation({
        mutationFn: ApiService.getPlannerURL,
    })

    const handleDownloadPlanner = async () => {
        const planner = document.getElementById("planner-content");

        if (!planner) return;

        const structure = getValues("structure");

        const url = await handleGetPlannerUrl({
            html: planner.outerHTML,
            structure,
        })

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title ?? "Plano-alimentar"}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return {
        handleDownloadPlanner,
        isLoading: isPending,
    };
};