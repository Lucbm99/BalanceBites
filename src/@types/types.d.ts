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


type PlannerSocialMediaData = {
    name: string;
    username: string;
    url: string;
    icon: string;
};

type PlannerExperienceData = {
    company: string;
    position: string;
    date: string;
    location: string;
    website: string;
    summary: string;
};

type PlannerEducationData = {
    institution: string;
    degree: string;
    location: string;
    date: string;
    website: string;
    summary: string;
};

type PlannerSkillData = {
    name: string;
    description: string;
    level: number;
    keywords: string;
};

type PlannerLanguageData = {
    name: string;
    description: string;
    level: number;
};

type PlannerCertificationData = {
    name: string;
    institution: string;
    date: string;
    website: string;
    summary: string;
};

type PlannerProjectData = {
    name: string;
    description: string;
    date: string;
    website: string;
    summary: string;
    keywords: string[];
};

type PlannerContentData = {
    image: PlannerImageData;
    infos: PlannerInfosData;
    summary: string;
    socialMedias: Partial<PlannerSocialMediaData>[];
    experiences: Partial<PlannerExperienceData>[];
    educations: Partial<PlannerEducationData>[];
    skills: Partial<PlannerSkillData>[];
    languages: Partial<PlannerLanguageData>[];
    certifications: Partial<PlannerCertificationData>[];
    projects: Partial<PlannerProjectData>[];
}

type PlannerData = {
    content: PlannerContentData;
    // structure: PlannerStructureData;
}
