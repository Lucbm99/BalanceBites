import { LucideIcon } from "lucide-react";

type SectionTitleProps = {
    icon: LucideIcon;
    title: string;
}

export const SectionTitle = ({ icon: Icon, title }: SectionTitleProps) => {
    return (
        <div className="flex items-center gap-2">
            <Icon size={18} className="text-muted-foreground" />
            <h3 className="sm:text-sm lg:text-2xl lg:font-title lg:font-bold">{title}</h3>
        </div>
    )
}