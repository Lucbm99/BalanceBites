import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { mergician } from "mergician";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { languagesOptions } from "../../../structure-sidebar/sections/language";

type FormData = {
  language: PlannerLanguages;
};

type GenerateTranslationProps = {
  onClose: () => void;
};

export const GenerateTranslation = ({ onClose }: GenerateTranslationProps) => {
  const { control, handleSubmit, getValues: getFormValue } = useForm<FormData>();
  const { setValue, getValues } = useFormContext<PlannerData>();

  const { mutateAsync: handleGenerate, isPending } = useMutation({
    mutationFn: ApiService.translate,
  });

  const onSubmit = async (formData: FormData) => {
    const content = getValues("content");

    const selectedLanguage = languagesOptions.find(
        (item) => item.value === formData.language
    );
  
    const data = await handleGenerate({
        content,
        language: selectedLanguage?.label!,
    });

    const generation = JSON.parse(data.data);

    const mergedContent = mergician(content, generation) as PlannerContentData;
    setValue("content", mergedContent);
    setValue("structure.language", formData.language);

    toast.success("Conteúdo gerado com sucesso!");

    onClose();

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>
        Esta funcionalidade traduz o conteúdo atual para a linguagem selecionada abaixo.
      </p>

      <p>Isso pode levar alguns segundos, aguarde o resultado.</p>

      <Controller
        control={control}
        name="language"
        rules={{ required: true }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecionar linguagem" />
            </SelectTrigger>
            <SelectContent>
              {languagesOptions.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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