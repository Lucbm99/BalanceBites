import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { EditorField } from "@/components/ui/editor/field";
import { IconField } from "@/components/ui/icon-input/field";
import { InputField } from "@/components/ui/input/field";
import { SliderField } from "@/components/ui/slider/field";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { MultipleDragItemData, PlannerArrayKeys } from ".";

type ManageMultipleItemDialogProps = BaseDialogProps & {
    data: MultipleDragItemData;
    setOpen: (open: boolean) => void;
    initialData?: any;
}

type FormConfig<T> = {
    label: string;
    key: keyof T;
    fieldType?: "text" | "editor" | "icon" | "slider" | "keywords";
    type?: string;
    placeholder?: string;
    fullWidth?: boolean;
    required?: boolean;
    className?: string;
}

type FormConfigObject = {
    [K in PlannerArrayKeys]: FormConfig<PlannerData["content"][K][number]>[];
}

const formConfig: FormConfigObject = {
    objectives: [ //socialMedias
        {
            label: "Objetivos alimentares",
            key: "objective",
            placeholder: "Escreva seus principais objetivos para seu plano alimentar...",
            required: true,
        },
        // {
        //     label: "Usuário",
        //     key: "username",
        //     placeholder: "seu-usuario",
        //     required: true,
        // },
        // {
        //     label: "Site",
        //     key: "url",
        //     placeholder: "https://linkedin.com/in/seu-usuario",
        //     type: "url",
        //     fullWidth: true,
        // },
        // {
        //     label: "Ícone",
        //     key: "icon",
        //     placeholder: "linkedin",
        //     fieldType: "icon",
        //     fullWidth: true,
        // },
    ],
    restrictions: [ //experiences
        {
            label: "Restrições alimentares",
            key: "restriction",
            placeholder: "Intolerância a lactose, glúten...",
            required: true,
        },
        // {
        //     label: "Posição",
        //     key: "position",
        // },
        // {
        //     label: "Data ou intervalo de datas",
        //     key: "date",
        //     placeholder: "Janeiro de 2024 - Presente",
        // },
        // {
        //     label: "Localização",
        //     key: "location",
        // },
        // {
        //     label: "Site",
        //     key: "website",
        //     type: "url",
        //     fullWidth: true,
        // },
        // {
        //     label: "Descrição",
        //     key: "summary",
        //     fieldType: "editor",
        //     fullWidth: true,
        //     className: "min-h-[200px]",
        // },
    ],
    preferences: [ //education
        {
            label: "Preferências alimentares",
            key: "preference",
            placeholder: "Vegano, vegetariano, carnívoro...",
            required: true,
        },
        // {
        //     label: "Curso",
        //     key: "degree",
        // },
        // {
        //     label: "Data ou intervalo de datas",
        //     key: "date",
        //     placeholder: "Janeiro de 2024 - Presente",
        // },
        // {
        //     label: "Localização",
        //     key: "location",
        // },
        // {
        //     label: "Site",
        //     key: "website",
        //     type: "url",
        //     fullWidth: true,
        // },
        // {
        //     label: "Descrição",
        //     key: "summary",
        //     fieldType: "editor",
        //     fullWidth: true,
        //     className: "min-h-[200px]",
        // },
    ],
    // skills: [
    //     {
    //         label: "Nome",
    //         key: "name",
    //         required: true,
    //     },
    //     {
    //         label: "Descrição",
    //         key: "description",
    //     },
    //     {
    //         label: "Nível",
    //         key: "level",
    //         fieldType: "slider",
    //         fullWidth: true,
    //     },
    //     {
    //         label: "Palavras-chave",
    //         key: "keywords",
    //         placeholder: "Adicione palavras-chave separadas por vírgula",
    //         fieldType: "keywords",
    //         fullWidth: true,
    //     },
    // ],
    // languages: [
    //     {
    //         label: "Nome",
    //         key: "name",
    //         required: true,
    //     },
    //     {
    //         label: "Descrição",
    //         key: "description",
    //     },
    //     {
    //         label: "Nível",
    //         key: "level",
    //         fieldType: "slider",
    //         fullWidth: true,
    //     },
    // ],
    // certifications: [
    //     {
    //         label: "Nome",
    //         key: "name",
    //         required: true,
    //     },
    //     {
    //         label: "Instituição",
    //         key: "institution",
    //     },
    //     {
    //         label: "Data",
    //         key: "date",
    //         placeholder: "Janeiro de 2024",
    //     },
    //     {
    //         label: "Site",
    //         key: "website",
    //         type: "url",
    //     },
    //     {
    //         label: "Descrição",
    //         key: "summary",
    //         fieldType: "editor",
    //         className: "min-h-[200px]",
    //         fullWidth: true,
    //     },
    // ],
    // projects: [
    //     {
    //         label: "Nome",
    //         key: "name",
    //         required: true,
    //     },
    //     {
    //         label: "Descrição",
    //         key: "description",
    //     },
    //     {
    //         label: "Data ou intervalo de datas",
    //         key: "date",
    //         placeholder: "Janeiro de 2024 - Presente",
    //     },
    //     {
    //         label: "Site",
    //         key: "website",
    //         type: "url",
    //     },
    //     {
    //         label: "Resumo",
    //         key: "summary",
    //         fieldType: "editor",
    //         className: "min-h-[200px]",
    //         fullWidth: true,
    //     },
    //     {
    //         label: "Palavras-chave",
    //         key: "keywords",
    //         placeholder: "Adicione palavras-chave separadas por vírgula",
    //         fieldType: "keywords",
    //         fullWidth: true,
    //     },
    // ],
};

export const ManageMultipleItemDialog = ({ data, open, setOpen, initialData }: ManageMultipleItemDialogProps) => {
    const methods = useForm();
    const { setValue, getValues } = useFormContext<PlannerData>();

    const isEditing = !!initialData;

    useEffect(() => {
        if (initialData) methods.reset(initialData);
    }, [initialData, methods])


    const formContent = useMemo(() => {
        const config = formConfig[data.formKey];
        
        return config.map((field, index) => {
            const fieldType = field?.fieldType ?? "text";
            const isFullWidth = !!field?.fullWidth;

            const inputProps = {
                name: field.key,
                label: field.label,
                containerClassName: cn(isFullWidth && "col-span-full"),
                required: field.required,
                placeholder: field.placeholder,
                type: field.type,
                className: field.className,
            }

            return (
                <Fragment key={index}>
                    {fieldType === "text" && <InputField {...inputProps} />}
                    {fieldType === "editor" && <EditorField {...inputProps} />}
                    {fieldType === "icon" && <IconField {...inputProps} />}
                    {fieldType === "slider" && <SliderField {...inputProps} />}
                    {fieldType === "keywords" && (
                        <InputField 
                            {...inputProps}
                            extraContent={value => (
                                <div className="flex gap-2 flex-wrap mt-1">
                                    {value?.split(",").map((keyword, index) => {
                                        if (!keyword.trim()) return null;
                                        
                                        return <Badge key={`keyword-${index}`}>{keyword}</Badge>
                                    })}
                                </div>
                            )}
                        />
                    )}
                    
                </Fragment>
            )
        })
    }, [data.formKey])

    // const onDelete = () => {
    //     const currentValue = getValues();

    //     const formKey = data.formKey;
    //     const currentFieldValue = currentValue.content[formKey] ?? [];

    //     const updatedItems = currentFieldValue.filter(
    //         (item: any) => item.id !== initialData.id
    //     )

    //     setValue(`content.${formKey}`, updatedItems);
    //     setOpen(false);
    //     toast.success("Item removido com sucesso!");
    // }

    const onDelete = () => {
        const currentValue = getValues();
        const formKey = data.formKey;

        let updatedItems;

        switch (formKey) {
            case "objectives": {
                const current = currentValue.content.objectives ?? [];
                updatedItems = current.filter(
                    (item: any) => item.id !== initialData.id
                ) as Partial<PlannerObjectivesData>[];
            break;
        }
            case "restrictions": {
                const current = currentValue.content.restrictions ?? [];
                updatedItems = current.filter(
                    (item: any) => item.id !== initialData.id
                ) as Partial<PlannerRestrictionsData>[];
            break;
        }
            case "preferences": {
                const current = currentValue.content.preferences ?? [];
                updatedItems = current.filter(
                    (item: any) => item.id !== initialData.id
                ) as Partial<PlannerPreferencesData>[];
            break;
        }
        default:
            return;
        }

        setValue(`content.${formKey}`, updatedItems);
        setOpen(false);
        toast.success("Item removido com sucesso!");
    };

    const onSubmit = (formData: any) => {
        const currentValue = getValues();
        
        const formKey = data.formKey;
        const currentFieldValue = currentValue.content[formKey] ?? [];

        if (isEditing) {
            const updatedItems = currentFieldValue.map((item: any) => {
                if (item.id === initialData.id) {
                    return formData
                }

                return item;
            });
            
            setValue(`content.${formKey}`, updatedItems);
            setOpen(false);
            toast.success("Item atualizado com sucesso!");

            return;
        }

        setValue(`content.${formKey}`, [...currentFieldValue, {
            ...formData,
            id: uuid()
        }])
        setOpen(false);
        toast.success("Item adicionado com sucesso");
    };

    return (
        <Dialog
            title="Adicionar novo item"
            open={open}
            setOpen={setOpen}
            content={
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex flex-col mt-2"
                >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <FormProvider {...methods}>{formContent}</FormProvider>
                    </div>

                    <div className="flex justify-between gap-3 mt-4">
                        {isEditing && (
                            <Button variant="destructive" onClick={onDelete}>
                                Remover
                            </Button>
                        )}
                        <Button type="submit" className="w-max">
                            {isEditing ? "Salvar" : "Adicionar"}
                        </Button>
                    </div>
                </form>
            }
        />
    )
}