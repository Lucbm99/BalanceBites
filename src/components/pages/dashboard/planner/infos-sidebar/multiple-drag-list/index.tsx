import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, LucideIcon, Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SectionTitle } from "../section-title";

export type PlannerArrayKeys = Exclude<keyof PlannerContentData, "image" | "infos" | "summary">;

export type MultipleDragItemData = {
    formKey: PlannerArrayKeys;
    title: string;
    icon: LucideIcon;
    titleKey: string;
    descriptionKey: string;
}

type MultipleDragListProps = {
    data: MultipleDragItemData;
    onAdd: () => void;
    onEdit: (index: number) => void;
}

export const MultipleDragList = ({
    data, 
    onAdd,
    onEdit
}: MultipleDragListProps) => {
    const { control } = useFormContext<PlannerData>();
    
    const { fields, move } = useFieldArray({
        control,
        name: `content.${data.formKey}`,
    });
    
    const handleDrag = ({source, destination}: DropResult) => {
        if (!destination) return;
        
        move(source.index, destination.index);
    }

    const isEmpty = fields.length === 0;

    return (
        <div>
            <SectionTitle title={data.title} icon={data.icon} />

            <div className="mt-4 flex flex-col">
                {isEmpty && (
                    <Button variant="outline" className="w-full gap-2 px-3 py-2 text-sm sm:text-base h-10 sm:h-11" onClick={onAdd}>
                        <Plus size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden lg:block">Adicionar item</span>
                    </Button>
                )}
                
                {!!fields.length && (
                    <DragDropContext onDragEnd={handleDrag}>
                        <Droppable droppableId={`droppable-${data.formKey}`}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="rounde overflow-hidden border border-muted"
                                >
                                    {fields.map((field, index) => {
                                        const titleKey = data.titleKey as keyof typeof field;
                                        const descriptionKey = data.descriptionKey as keyof typeof field;

                                        const isLastItem = index === fields.length - 1; 

                                        return (
                                            <Draggable
                                                key={`draggable-item-${data.formKey}-${index}`}
                                                draggableId={`draggable-item-${data.formKey}-${index}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        key={field.id}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={cn(
                                                            "sm:gap-4 lg:h-16 w-full bg-muted/50 flex",
                                                            !isLastItem && "border-b border-muted"
                                                        )}
                                                    >
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className="w-6 h-full bg-muted/50 flex items-center justify-center hover:brightness-125 transition-all"
                                                        >
                                                            <GripVertical size={14} />
                                                        </div>
                                                        <Tooltip content="Clique para editar">
                                                            <div 
                                                                className="flex-1 flex flex-col justify-center px-3 cursor-pointer hover:bg-muted/80 transition-all"
                                                                onClick={() => onEdit(index)}
                                                            >
                                                                <p className="text-sm sm:text-base font-title font-bold break-words leading-snug sm:leading-normal">
                                                                    {field[titleKey]}
                                                                </p>
                                                                {/* <p className="text-xs text-muted-foreground">
                                                                    {field[descriptionKey]}
                                                                </p> */}
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}

                {!isEmpty && (
                    <Button variant="outline" className="w-full gap-2 px-3 py-2 text-sm sm:text-base h-10 sm:h-11" onClick={onAdd}>
                        <Plus size={16} />
                        <p className="hidden lg:inline">Adicionar item</p>
                    </Button>
                )}
            </div>
        </div>
    )
}