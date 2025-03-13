"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { InputField } from "@/components/ui/input/field";
import { createPlanner } from "@/db/actions";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from 'react-query'

type FormData = {
    title: string;
}

export const NewPlannerDialog = (props: BaseDialogProps) => {
    const methods = useForm<FormData>();

    const router = useRouter();

    const { mutate: handleCreatePlanner, isPending } = useMutation({
        mutationFn: createPlanner,
        onSuccess: (planner) => {
            toast.success("Plano criado com sucesso!");
            router.push(`/dashboard/food-planners/${planner.id}`)
        },
        onError: (error) => {
            
        }
    })

    const onSubmit = async (data: FormData) => {
        handleCreatePlanner(data.title);
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
                            disabled={isPending}
                        >
                            Criar
                        </Button>
                    </form>
                </FormProvider>
            }
        />
    )
}