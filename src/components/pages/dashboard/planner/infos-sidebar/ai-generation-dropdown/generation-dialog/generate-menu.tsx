import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input/field";
import { queryKeys } from "@/constants/query-keys";
import { ApiService } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  goal: string;
  dailyMeals: number;
};

type GenerationData = {
  headline: string;
  summary: string;
  // meal: [];
  // consume: [];
};

type GenerateFromMenuProps = {
  onClose: () => void;
};

export const GenerateFromMenu = ({
  onClose,
}: GenerateFromMenuProps) => {
  const { control, handleSubmit } = useForm<FormData>();
  const { setValue } = useFormContext<PlannerData>();

  const queryClient = useQueryClient();

  const { mutate: handleGenerate, isPending } = useMutation({
    mutationFn: ApiService.generateContentForMenu,
    onSuccess: (data) => {
      const generation = JSON.parse(data.data) as GenerationData;

      setValue("content.infos.headline", generation.headline);
      setValue("content.summary", generation.summary);
      // setValue("content.meals", generation.meal);
      // setValue("content.consume", generation.consume);

      toast.success("Conteúdo gerado com sucesso!");

      queryClient.invalidateQueries({ queryKey: queryKeys.credits });

      onClose();
    },
  });

  const onSubmit = async (formData: FormData) => {
    handleGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputField
        control={control}
        name="goal"
        label="Objetivo"
        placeholder="Perda de gordura, ganho de massa"
        required
      />
      <InputField
        control={control}
        name="restrictions"
        label="Restrições alimentares"
        placeholder="Intolerância à lactose, a glúten."
      />
      <InputField
        control={control}
        name="dailyMeals"
        label="Quantidade de refeições diárias, no novo plano"
        type="number"
        required
      />
      
      <Button
        className="w-max ml-auto"
        type="submit"
        disabled={isPending}
      >
        Gerar conteúdo
      </Button>
    </form>
  );
};