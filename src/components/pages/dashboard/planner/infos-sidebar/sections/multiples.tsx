import { Separator } from "@/components/ui/separator";
import { Ban, Goal, Salad } from "lucide-react";
import { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultipleDragItemData, MultipleDragList } from "../multiple-drag-list";
import { ManageMultipleItemDialog } from "../multiple-drag-list/manage-multiple-item-dialog";

export const MultiplesSections = () => {
    const { getValues } = useFormContext();
    
    const [sectionToAdd, setSectionToAdd] = useState<MultipleDragItemData | null>(null);
    
    const [initialData, setInitialData] = useState<MultipleDragItemData | null>(null);

    const sectionsKeys: MultipleDragItemData[] = [
        {
            formKey: "objectives",
            title: "Objetivos",
            icon: Goal,
            titleKey: "objective",
            descriptionKey: "objective",
        },
        {
            formKey: "restrictions",
            title: "Restrições Alimentares",
            icon: Ban,
            titleKey: "restriction",
            descriptionKey: "restriction",
        },
        {
            formKey: "preferences",
            title: "Preferências alimentares",
            icon: Salad,
            titleKey: "preference",
            descriptionKey: "preference",
        },
        // {
        //     formKey: "skills",
        //     title: "Habilidades",
        //     icon: BicepsFlexed,
        //     titleKey: "name",
        //     descriptionKey: "description",
        // },
        // {
        //     formKey: "languages",
        //     title: "Idiomas",
        //     icon: Languages,
        //     titleKey: "name",
        //     descriptionKey: "description",
        // },
        // {
        //     formKey: "certifications",
        //     title: "Certificações",
        //     icon: FileBadge2,
        //     titleKey: "name",
        //     descriptionKey: "institution",
        // },
        // {
        //     formKey: "projects",
        //     title: "Projetos",
        //     icon: Globe,
        //     titleKey: "name",
        //     descriptionKey: "description",
        // },
    ];

    const onEdit = (section: MultipleDragItemData, index: number) => {
        const currentValues = getValues();
        const currentItems = currentValues.content[section.formKey];

        setSectionToAdd(section);
        setInitialData(currentItems[index])
    }

    return (
        <div>
            {sectionsKeys.map((section) => (
                <Fragment key={`multiple-section-${section.title}`}>
                    <Separator className="my-5" />
                    <MultipleDragList 
                        data={section}
                        onAdd={() => setSectionToAdd(section)}
                        onEdit={(index) => onEdit(section, index)}
                    />
                </Fragment>
            ))}

            {sectionToAdd && (
                <ManageMultipleItemDialog
                    initialData={initialData}
                    data={sectionToAdd}
                    open={!!sectionToAdd}
                    setOpen={(value) => {
                        if (!value) {
                            setSectionToAdd(null);
                            setInitialData(null);
                        };
                    }}
                />
            )}
        </div>
    )
}