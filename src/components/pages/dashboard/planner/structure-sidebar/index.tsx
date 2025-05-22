import { Separator } from "@/components/ui/separator"
import { LanguageSection } from "./sections/language"
import { LayoutSection } from "./sections/layout"
import { TemplatesListSection } from "./sections/templates-list"
import { ThemeSection } from "./sections/theme"

export const StructureSidebar = () => {

    return (
        <aside className="w-full h-full p-6 overflow-y-auto">
            <TemplatesListSection />
            <Separator className="my=5 mt-4" />
            <LayoutSection />
            <Separator className="my=5 mt-4" />
            <ThemeSection />
            <Separator className="my=5 mt-4" />
            <LanguageSection />
        </aside>
    )
}