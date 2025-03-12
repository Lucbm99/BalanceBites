"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { deletePlanner, deleteResume, duplicatePlanner } from "@/db/actions";
import { useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

type FormData = {
    title: string
}

export const DuplicatePlannerDialog = (props: BaseDialogProps) => {
    const [open, setOpen] = useState(false);

    const methods = useForm<FormData>();
    const params = useParams();
    const router = useRouter();

    const plannerId = params.id as string;

    const onSubmit = async (data: FormData) => {
        try {
            const newPlanner = await duplicatePlanner(plannerId, data.title);
            toast.success("Currículo duplicado com sucesso.");
            router.push(`/dashboard/food-plannners/${newPlanner.id}`);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao duplicar currículo, tente novamente mais tarde.");
        }
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

                    <div className="flex mt-4 ml-auto gap-4">
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Duplicar
                        </Button>
                    </div>
                </form>
            }
        />
    )
}