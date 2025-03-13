import { api } from "@/lib/axios";

type PlannerDownloadPayload = {
    html: string;
    structure: PlannerStructureData;
}

const getPlannerURL = async (payload: PlannerDownloadPayload) => {
    const { data } = await api.post("/planner/download", payload,
        { responseType: "blob"}
     );

    return window.URL.createObjectURL(data);
};

export const ApiService = {
    getPlannerURL,
}