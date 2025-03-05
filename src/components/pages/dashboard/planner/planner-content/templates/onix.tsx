import { cn, sectionIsEmpty } from "@/lib/utils";
import { BasePlannerProps } from ".";
import { sectionLabels } from "../../structure-sidebar/layout-drag-list";
import { Element } from "../planner-element";
import { BasicInfos } from "./shared/basic-infos";
import { PlannerSectionContent } from "./shared/sections-content";

export const Onix = ({ data }: BasePlannerProps) => {
  const { content } = data;
  const { infos } = content;

  const mainSections = data.structure.layout.mainSections.filter((section) => {
    return !sectionIsEmpty(section.key, data.content);
  });

  const sidebarSections = data.structure.layout.sidebarSections.filter(
    (section) => {
      return !sectionIsEmpty(section.key, data.content);
    }
  );

  const renderSections = (
    sections: PlannerLayoutSection[],
    titleColor?: string
  ) => {
    return sections.map((section, i) => {
      return (
        <div
          key={`section-item-${section.key}`}
          className={cn(i > 0 && "mt-4")}
        >
          <div className={titleColor}>
            <p className="font-bold text-sm">
              {sectionLabels[section.key][data.structure.language]}
            </p>

            <hr className="w-full mt-1 mb-2 border-current" />
          </div>

          <PlannerSectionContent
            key={section.id}
            section={section}
            content={data.content}
            levelIndicatorVariant="bars"
          />
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full grid grid-cols-[250px,1fr]">
      <aside className="p-5 w-full h-full relative">
        <div className="absolute inset-0 w-full h-full bg-planner-primary opacity-40 z-[2]" />

        <div className="z-[3] relative">
          <div className="flex flex-col items-center text-center gap-2 z-10 mb-2">
            {content.image.url && content.image.visible && (
              <img src={content.image.url} className="w-36 h-36" />
            )}

            <Element className="text-xl font-bold">{infos.fullName}</Element>
            <Element className="text-sm -mt-2">{infos.headline}</Element>
          </div>

          <BasicInfos infos={infos} className="mb-2 flex-col gap-1.5 items-start text-xs border border-planner-primary px-2.5 py-3" />

          {renderSections(sidebarSections, "text-planner-primary")}
        </div>
      </aside>

      <section className="p-5">{renderSections(mainSections)}</section>
    </div>
  );
};
