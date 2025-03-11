"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { InputField } from "@/components/ui/input/field";
import { createPlanner } from "@/db/actions";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
    title: string;
}

export const NewPlannerDialog = (props: BaseDialogProps) => {
    const methods = useForm<FormData>();

    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            const planner = await createPlanner(data.title);

            toast.success("Plano criado com sucesso!");
            router.push(`/dashboard/food-planners/${planner.id}`)

        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar plano, tente novamente");
        }
    }

    return (
        <Dialog
            {...props}
            title="Criar novo plano alimentar"
            description="Para começar, escolha um título para seu plano alimentar"
            content={
                <FormProvider {...methods}>
                    <form className="flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
                        <InputField label="Título" name="title" required />

                        <Button
                            type="submit"
                            className="w-max mt-6 ml-auto"
                        >
                            Criar
                        </Button>
                    </form>
                </FormProvider>
            }
        />
    )
}