type PlannerImageData = {
    url: string;
    visible: boolean;
}

type PlannerInfosData = {
    fullName: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    weight: string;
    height: string;
}

// type PlannerSocialMediaData = {
//     name: string;
//     username: string;
//     url: string;
//     icon: string;
// };

//Sessão alimentos
type PlannerMealsData = {
    meals: string;
};

//type PlannerExperienceData = {
    //company: string;
    //position: string;
    //date: string;
    //location: string;
    //website: string;
    //summary: string;
//};

// Sessão restrições alimentares
type PlannerConsumeData = {
    consume: string;
};

// type PlannerEducationData = {
//     institution: string;
//     degree: string;
//     location: string;
//     date: string;
//     website: string;
//     summary: string;
// };

// Sessão preferências alimentares
type PlannerNotesData = {
    notes: string;
};

// type PlannerSkillData = {
//     name: string;
//     description: string;
//     level: number;
//     keywords: string;
// };

// type PlannerLanguageData = {
//     name: string;
//     description: string;
//     level: number;
// };

// type PlannerCertificationData = {
//     name: string;
//     institution: string;
//     date: string;
//     website: string;
//     summary: string;
// };

// type PlannerProjectData = {
//     name: string;
//     description: string;
//     date: string;
//     website: string;
//     summary: string;
//     keywords: string[];
// };

type PlannerContentData = {
    image: PlannerImageData;
    infos: PlannerInfosData;
    summary: string;
    meals: Partial<PlannerMealsData>[]; //socialMedia
    consume: Partial<PlannerConsumeData>[]; //experiences
    notes: Partial<PlannerNotesData>[]; //education

    //ALTERAR ESSES DADOS EM OUTROS ARQUIVOS
    // skills: Partial<PlannerSkillData>[];
    // languages: Partial<PlannerLanguageData>[];
    // certifications: Partial<PlannerCertificationData>[];
    // projects: Partial<PlannerProjectData>[];
}

type PlannerLayoutSection = {
    id?: string;
    key: PlannerSections;
}

type PlannerLanguages = "english" | "spanish" | "french" | "german" | "italian" | "portuguese";

type PlannerStructureData = {
    template: PlannerTemplates;
    colorTheme: string;
    layout: {
        mainSections: PlannerLayoutSection[];
        sidebarSections: PlannerLayoutSection[];
    }; 
    language: PlannerLanguages;
}

type PlannerData = {
    content: PlannerContentData;
    structure: PlannerStructureData;
}

type PlannerSections =
    | "summary"
    | "meals"
    | "consume"
    | "notes";
    // | "skills"
    // | "languages"
    // | "certifications"
    // | "projects";

type PlannerTemplates = "eevee" | "onix" | "jynx" | "ditto";

type AIGenerationMode = "GENERATE_MENU" | "FIX_CONTENT" | "TRANSLATE_CONTENT";