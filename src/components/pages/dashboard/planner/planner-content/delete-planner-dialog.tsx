"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { deletePlanner, deleteResume } from "@/db/actions";
import { useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation"

export const DeletePlannerDialog = (props: BaseDialogProps) => {
    const [open, setOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const plannerId = params.id as string;

    const onDelete = async () => {
        try {
            await deletePlanner(plannerId);
            toast.success("Currículo deletado com sucesso.");
            router.push("/dashboard/food-plannners");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao deletar currículo, tente novamente mais tarde.");
        }
    }

    return (
        <Dialog 
            {...props}
            open={open}
            setOpen={setOpen}
            title="Deletar currículo"
            description="Você tem certeza que deseja deletar este planejamento alimentar?"
            content={
                <div className="flex gap-2 ml-auto">
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onDelete}>
                        Deletar
                    </Button>
                </div>
            }
        />
    )
}