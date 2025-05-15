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

//Sessão alimentos
type PlannerMealsData = {
    meals: string;
};

// Sessão restrições alimentares
type PlannerConsumeData = {
    consume: string;
};

// Sessão observações alimentares
type PlannerNotesData = {
    notes: string;
};

// Sessão lista mercado
type PlannerShoppingListData = {
    products: string;
};

// type PlannerLanguageData = {
//     name: string;
//     description: string;
//     level: number;
// };

type PlannerContentData = {
    image: PlannerImageData;
    infos: PlannerInfosData;
    summary: string;
    meals: Partial<PlannerMealsData>[];
    consume: Partial<PlannerConsumeData>[];
    notes: Partial<PlannerNotesData>[];
    products: Partial<PlannerShoppingListData>[];

    //ALTERAR ESSES DADOS EM OUTROS ARQUIVOS
    // languages: Partial<PlannerLanguageData>[];
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
    | "notes"
    | "products";
    // | "languages";

type PlannerTemplates = "eevee" | "onix" | "jynx" | "ditto";

type AIGenerationMode = "GENERATE_MENU" | "FIX_CONTENT" | "TRANSLATE_CONTENT";