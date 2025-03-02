import Logo from "@/assets/logo.svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AIGenerationDropdown } from "./ai-generation-dropdown";
import { BasicInfoSection } from "./sections/basic-info";
import { SummarySection } from "./sections/summary";

export const InfosSideBar = () => {
    return (
        <aside className="w-full h-full p-6 overflow-y-auto">
            <div className="w-full flex items-center justify-between">
                <Link href="/dashboard/food-planners">
                    <Logo className="w-full max-w-[80px]" />
                </Link>

                <AIGenerationDropdown />
            </div>

            <Separator className="my-5" />
        
            <BasicInfoSection />
            <Separator className="my-5" />
            <SummarySection />
        </aside>
    )
}