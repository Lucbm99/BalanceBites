"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { deletePlanner } from "@/db/actions";
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const DeletePlannerDialog = (props: BaseDialogProps) => {
    const [open, setOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const plannerId = params.id as string;

    const { mutateAsync: handleDeletePlanner, isPending } = useMutation({
        mutationFn: deletePlanner,
        onSuccess: () => {
            toast.success("Planejamento alimentar deletado com sucesso.");
            setOpen(false);
            router.push("/dashboard/food-planners");
        }
    })

    const onDelete = async () => {
        handleDeletePlanner(plannerId);
    }

    return (
        <Dialog 
            {...props}
            open={open}
            setOpen={setOpen}
            title="Deletar planejamento alimentar"
            description="Você tem certeza que deseja deletar este planejamento alimentar?"
            content={
                <div className="flex mt-4 gap-2 justify-between">
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onDelete} disabled={isPending}>
                        Deletar
                    </Button>
                </div>
            }
        />
    )
}