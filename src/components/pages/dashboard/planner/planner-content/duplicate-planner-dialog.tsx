"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { duplicatePlanner } from "@/db/actions";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import { toast } from "sonner";

type FormData = {
    title: string
}

export const DuplicatePlannerDialog = (props: BaseDialogProps) => {
    const [open, setOpen] = useState(false);

    const methods = useForm<FormData>();
    
    const params = useParams();
    const router = useRouter();

    const plannerId = params.id as string;

    const { mutate: handleDuplicatePlanner, isPending } = useMutation({
        mutationFn: (title: string) => duplicatePlanner(plannerId, title),
        onSuccess: (newPlanner) => {
            toast.success("Currículo duplicado com sucesso.");
            setOpen(false);
            router.push(`/dashboard/food-plannners/${newPlanner.id}`);
        }
    })

    const onSubmit = async (data: FormData) => {
        handleDuplicatePlanner(data.title);
    }

    return (
        <Dialog 
            {...props}
            open={open}
            setOpen={setOpen}
            title="Duplicar currículo"
            description="Será criado um novo planejamento alimentar com o mesmo conteúdo do atual. Insira o novo título para o documento a ser duplicado."
            content={
                <form className="flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
                    <Controller
                        control={methods.control}
                        name="title"
                        rules={{ required: "Campo obrigatório" }}
                        render={({ field }) => (
                            <Input placeholder="Novo título" {...field} />
                        )}
                    />

                    <div className="flex mt-4 ml-auto gap-3">
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            Duplicar
                        </Button>
                    </div>
                </form>
            }
        />
    )
}