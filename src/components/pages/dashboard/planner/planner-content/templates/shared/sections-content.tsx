import { cn } from "@/lib/utils";
import { Element } from "../../planner-element";

type LevelIndicatorVariant = "dots" | "bars";

type LevelIndicatorProps = {
  level: number;
  levelsColor?: string;
  className?: string;
  variant?: LevelIndicatorVariant;
};

type PlannerSectionContentProps = {
  section: PlannerLayoutSection;
  content: PlannerContentData;
  levelsColor?: string;
  linkIconColor?: string;
  levelIndicatorVariant?: LevelIndicatorVariant;
};

const LevelIndicator = ({
  level,
  levelsColor,
  className,
  variant = "dots",
}: LevelIndicatorProps) => {
  if (!level) return null;

  return (
    <div className={cn("flex items-center gap-1", className, levelsColor)}>
      {variant === "dots" && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`indicator-item-${i}`}
              className={cn(
                "w-2 h-2 rounded-full border border-current",
                i < level && "bg-current"
              )}
            />
          ))}
        </>
      )}
      {variant === "bars" && (
        <div className="w-full flex h-1.5 rounded-full overflow-hidden my-1 max-w-[200px]">
          <div
            className="h-full bg-current"
            style={{ width: `${(level / 5) * 100}%` }}
          />
          <div className="h-full flex-1 bg-planner-primary opacity-30" />
        </div>
      )}
    </div>
  );
};

export const PlannerSectionContent = ({
  section,
  content,
  levelsColor = "text-planner-primary",
  linkIconColor,
  levelIndicatorVariant,
}: PlannerSectionContentProps) => {
  switch (section.key) {
    case "meals":
      return (
        <div className="flex flex-col gap-4">
          {content.meals.map((meal, i) => (
            <div
              key={`experience-${i}`}
              className="text-sm flex flex-col gap-0.5"
            >
              <div className="flex items-center justify-between font-bold">
                <Element>{meal.meals}</Element>
              </div>
            </div>
          ))}
        </div>
      );
    case "summary":
      return (
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: content.summary }}
        />
      );
    case "consume":
      return (
        <div className="flex flex-col gap-4">
          {content.consume.map((consume_list, i) => (
            <div
              key={`experience-${i}`}
              className="text-sm flex flex-col gap-0.5"
            >
              <div className="flex items-center justify-between font-bold">
                <Element>{consume_list.consume}</Element>
              </div>
            </div>
          ))}
        </div>
      );
    case "notes":
      return (
        <div className="flex flex-col gap-4">
          {content.notes.map((note, i) => (
            <div
              key={`note-${i}`}
              className="text-sm flex flex-col gap-0.5"
            >
              <div className="flex items-center justify-between font-bold">
                <Element>{note.notes}</Element>
              </div>
            </div>
          ))}
        </div>
      );
    case "products":
      return (
        <div className="flex flex-col gap-4">
          {content.products.map((product, i) => (
            <div
              key={`product-${i}`}
              className="text-sm flex flex-col gap-0.5"
            >
              <div className="flex items-center justify-between font-bold">
                <Element>{product.products}</Element>
              </div>
            </div>
          ))}
        </div>
      );
    // case "languages":
    //   return (
    //     <div className="flex flex-col gap-4">
    //       {content.languages.map((language, i) => {
    //         const level = language.level ?? 0;

    //         return (
    //           <div
    //             key={`language-${i}`}
    //             className="text-sm flex flex-col gap-1"
    //           >
    //             <Element className="font-bold -mb-1.5">{language.name}</Element>
    //             <Element>{language.description}</Element>
    //             <LevelIndicator level={level} levelsColor={levelsColor} variant={levelIndicatorVariant} />
    //           </div>
    //         );
    //       })}
    //     </div>
    //   );
    default:
      return null;
  }
};
