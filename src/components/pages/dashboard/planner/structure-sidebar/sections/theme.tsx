import { Palette } from "lucide-react";
import { SectionTitle } from "../../infos-sidebar/section-title";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import colors from "tailwindcss/colors";

const keysToIgnore = [
    "current", 
    "inherit",
    "currentColor",
    "transparent",
    "black",
    "white",
    "warmGray",
    "trueGray",
    "coolGray",
    "blueGray",
]

const colorKeys = Object.keys(colors).filter(
    (key) => !keysToIgnore.includes(key)
) as (keyof typeof colors)[];

export const ThemeSection = () => {
    const { control, watch } = useFormContext<PlannerData>();

    const currentColorTheme = watch("structure.colorTheme");

    const handleSetCssVariable = useCallback(() => {
        if (!currentColorTheme) return;

        const colorKey = currentColorTheme as keyof typeof colors;

        document.documentElement.style.setProperty(
            "--planner-primary",
            colors[colorKey][500]
        );
    }, [currentColorTheme])

    useEffect(() => {
        handleSetCssVariable();
    }, [handleSetCssVariable])

    return (
        <div>
            <SectionTitle title="Tema" icon={Palette} />

            <Controller
                control={control}
                name="structure.colorTheme"
                render={({ field }) => (
                    <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid grid-cols-7 gap-3 mt-2">
                        {colorKeys.map(colorKey => {
                            const isSelected = field.value === colorKey;
                            
                            return (
                                <Button
                                    key={colorKey}
                                    variant="ghost"
                                    className={cn(
                                        "w-7 h-7 p-1 rounded-full transition-all",
                                        isSelected && "ring-2 ring-foreground"
                                    )}
                                    onClick={() => field.onChange(colorKey)}
                                >
                                    <div
                                        className="w-full h-full rounded-full"
                                        style={{ backgroundColor: colors[colorKey][500]}}
                                    />


                                </Button>
                            )
                        })}
                    </div>
                )}
            >

            </Controller>
        </div>
    )
}