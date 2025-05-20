import { Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import { useFormContext } from "react-hook-form";

type LayoutDragListProps = {
    title: string;
    fields: PlannerLayoutSection[];
}

const labels: Record<PlannerSections, Record<PlannerLanguages, string>> = {
    summary: {
        portuguese: "Resumo",
        english: "Summary",
        french: "Résumé",
        german: "Zusammenfassung",
        italian: "Sommario",
        spanish: "Resumen",
    },
    meals: {
        portuguese: "Refeições",
        english: "Meals",
        french: "Repas",
        german: "Mahlzeiten",
        italian: "Pasti",
        spanish: "Comidas"
    },
    consume: {
        portuguese: "Alimentos consumidos",
        english: "Consumed foods",
        french: "Aliments consommés",
        german: "Verzehrte Lebensmittel",
        italian: "Alimenti consumati",
        spanish: "Alimentos consumidos"
    },
    notes: {
        portuguese: "Observações",
        english: "Notes",
        french: "Remarques",
        german: "Anmerkungen",
        italian: "Osservazioni",
        spanish: "Observaciones"
    },
    products: {
        portuguese: "Lista de compras",
        english: "Shopping list",
        french: "Liste de courses",
        german: "Einkaufsliste",
        italian: "Lista della spesa",
        spanish: "Lista de compras"
    },
};

export const sectionLabels = labels;

export const LayoutDragList = ({ title, fields }: LayoutDragListProps) => {
    const { watch } = useFormContext<PlannerData>();

    const language = watch("structure.language")
    
    return (
        <div className="w-full p-2 bg-muted rounded">
            <p className="font-title text-sm font-bold mb-3">{title}</p>

            <div className="flex flex-col gap-2">
                {fields.map((field, index) => (
                    <Draggable
                        key={field.key}
                        draggableId={`draggable-${field.key}`}
                        index={index}
                    >
                        {(provided) => (
                            <div
                                key={field.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex items-center gap-1 bg-foreground p-1 rounded"
                            >
                                <GripVertical className="w-4 h-4 min-w-4 text-background" />
                                <p className="text-accent text-xs font-semibold">
                                    {labels[field.key][language]}
                                </p>
                            </div>
                        )}
                    </Draggable>
                ))}
            </div>
        </div>
    )
}