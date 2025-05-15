import { Separator } from "@/components/ui/separator";
import { Carrot, ListChecks, SearchCheck, Utensils } from "lucide-react";
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
            formKey: "meals",
            title: "Minhas refeições diárias",
            icon: Utensils,
            titleKey: "meals",
            descriptionKey: "meals",
        },
        {
            formKey: "consume",
            title: "Alimentos que consumo",
            icon: Carrot,
            titleKey: "consume",
            descriptionKey: "consume",
        },
        {
            formKey: "notes",
            title: "Observações",
            icon: SearchCheck,
            titleKey: "notes",
            descriptionKey: "notes",
        },
        {
            formKey: "products",
            title: "Lista de compras",
            icon: ListChecks,
            titleKey: "products",
            descriptionKey: "products",
        },
        // {
        //     formKey: "languages",
        //     title: "Idiomas",
        //     icon: Languages,
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