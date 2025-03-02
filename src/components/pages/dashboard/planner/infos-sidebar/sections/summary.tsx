import { Editor } from "@/components/ui/editor";
import { ScrollText } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { SectionTitle } from "../section-title";

export const SummarySection = () => {
    const { control } = useFormContext(); 
    return (
        <div>
            <SectionTitle title="Sobre você" icon={ScrollText} />

            <Controller
                control={control}
                name="content.summart"
                render={({ field }) => (
                    <Editor {...field} className="min-h-[200px] max-h-[300px] mt-4"/>
                )}
            />
        </div>
    )
}