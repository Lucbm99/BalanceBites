import { api } from "@/lib/axios";

type PlannerDownloadPayload = {
    html: string;
    structure: PlannerStructureData;
}

type AIGenerationPayload = {
    jobTitle: string;
    jobDescription: string;
};

const getPlannerURL = async (payload: PlannerDownloadPayload) => {
    const { data } = await api.post("/planner/download", payload,
        { responseType: "blob"}
     );

    return window.URL.createObjectURL(data);
};

const generateContentForJob = async (payload: AIGenerationPayload) => {
    const { data } = await api.post("/generate/job-title", payload);
  
    return data;
}

const fixContent = async (content: PlannerContentData) => {
    const { data } = await api.post("/generate/fix-content", { content });

  
    return data;
}

export const ApiService = {
    getPlannerURL,
    generateContentForJob,
    fixContent,
}