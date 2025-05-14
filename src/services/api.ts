import { api } from "@/lib/axios";
import Stripe from "stripe";

type PlannerDownloadPayload = {
    html: string;
    structure: PlannerStructureData;
}

type AIGenerationMenuPayload = {
    goal: string;
    restrictions: string;
    dailyMeals: number;
};

type AiTranslationPayload = {
    content: PlannerContentData;
    language: string;
}

const getPlannerURL = async (payload: PlannerDownloadPayload) => {
    const { data } = await api.post("/planner/download", payload,
        { responseType: "blob"}
    );

    return window.URL.createObjectURL(data);
};

const generateContentForMenu = async (payload: AIGenerationMenuPayload) => {
    const { data } = await api.post("/generate/menu", payload);
    
    return data;
}

const fixContent = async (content: PlannerContentData) => {
    const { data } = await api.post("/generate/fix-content", { content });

    return data;
}

const translate = async (payload: AiTranslationPayload) => {
    const { data } = await api.post("/generate/translate", payload);

    return data;
}

const getCredits = async () => {
    const { data } = await api.get<{ credits: number }>("/credits");
    return data?.credits ?? 0;
}

const getPackages = async () => {
    const { data } = await api.get<Stripe.Price[]>("/credits/packages");
    return data;
}

const getCheckoutUrl = async (priceId: string, currentPathname: string) => {
    const { data } = await api.post<{ url: string }>("/credits/packages/checkout", { priceId, currentPathname });

    return data.url;
}

const getPortalUrl = async (currentPathname: string) => {
    const { data } = await api.post<{ url: string }>("/credits/transactions", { currentPathname });

    return data.url;
}

export const ApiService = {
    getPlannerURL,
    generateContentForMenu,
    fixContent,
    translate,
    getCredits,
    getPackages,
    getCheckoutUrl,
    getPortalUrl,
}