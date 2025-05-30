import Logo from "@/assets/logo.svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AIGenerationDropdown } from "./ai-generation-dropdown";
import { BasicInfoSection } from "./sections/basic-info";
import { MultiplesSections } from "./sections/multiples";
import { SummarySection } from "./sections/summary";

export const InfosSideBar = () => {
    return (
        <aside className="w-full h-full p-6 overflow-y-auto">
            <div className="w-full flex items-center justify-between">
                <Link href="/dashboard/food-planners">
                    <Logo className="w-full max-w-[60px] sm:max-w-[80px] md:max-w-[100px] h-auto" />
                </Link>

                <AIGenerationDropdown />
            </div>

            <Separator className="my-5" />
        
            <BasicInfoSection />
            <Separator className="my-5" />
            <SummarySection />
            <MultiplesSections />
        </aside>
    )
}