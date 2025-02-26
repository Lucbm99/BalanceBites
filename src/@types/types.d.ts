type PlannerImageData = {
    url: string;
    visible: boolean;
}

type PlannerInfosData = {
    fullName: string;
    headline: string;
    email: string;
    website: string;
    phone: string;
    location: string;
}

type PlannerContentData = {
    image: PlannerImageData;
    infos: PlannerInfosData;
}

type PlannerData = {
    content: PlannerContentData;
    // structure: PlannerStructureData;
}