import { InputField } from "@/components/ui/input/field"
import { SwitchField } from "@/components/ui/switch/field"
import { UserRound } from "lucide-react"
import { SectionTitle } from "../section-title"

export const BasicInfoSection = () => {
    return (
        <div>
            <SectionTitle title="Informações básicas" icon={UserRound} />
        
            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                <div className="col-span-full w-full flex gap-3 items-end">
                    <InputField
                        label="Foto"
                        placeholder="https://..."
                        name="content.image.url"
                        containerClassName="flex-1"
                    />

                    <SwitchField name="content.image.visible" className="mb-2" />
                </div>
                <div className="col-span-full w-full">
                    <InputField label="Nome completo" name="content.infos.fullName" />
                </div>
                <InputField label="Cabeçalho" name="content.infos.headline" />
                <InputField label="E-mail" name="content.infos.email" />
                {/* <InputField label="Site" name="content.infos.website" /> */}
                <InputField label="Telefone" name="content.infos.phone" />
                <InputField label="Cidade" name="content.infos.location" />
                <InputField label="Peso" name="content.infos.weight" />
                <InputField label="Altura" name="content.infos.height" />
            </div>
        </div>
    )
}