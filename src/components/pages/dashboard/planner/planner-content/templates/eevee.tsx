import { cn, sectionIsEmpty } from "@/lib/utils";
import { BasePlannerProps } from ".";
import { sectionLabels } from "../../structure-sidebar/layout-drag-list";
import { Element } from "../planner-element";
import { BasicInfos } from "./shared/basic-infos";
import { PlannerSectionContent } from "./shared/sections-content";

export const Eevee = ({ data }: BasePlannerProps) => {
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
    levelsColor?: string,
  ) => {
    return sections.map((section, i) => {
      return (
        <div
          key={`section-item-${section.key}`}
          className={cn(i > 0 && "mt-4")}
        >
          <p className="font-bold text-sm">
            {sectionLabels[section.key][data.structure.language]}
          </p>

          <hr className="w-full mt-1 mb-2" />

          <PlannerSectionContent
            key={section.id}
            section={section}
            content={data.content}
            levelsColor={levelsColor}
            linkIconColor={levelsColor}
          />
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full grid grid-cols-[1fr,250px]">
      <section className="p-5">
        <div className="flex items-center gap-4 mb-4">
          {content.image.url && content.image.visible && (
            <img src={content.image.url} className="w-36 h-36" />
          )}

          <div>
            <Element className="text-2xl font-bold">{infos.fullName}</Element>
            <Element>{infos.headline}</Element>

            <BasicInfos
              infos={infos}
              className="justify-start gap-x-3 gap-y-1.5 pr-4 mt-2"
            />
          </div>
        </div>

        {renderSections(mainSections)}
      </section>

      <aside className="p-5 w-full h-full bg-planner-primary text-white [&_hr]:border-white">
        {renderSections(sidebarSections, "text-white")}
      </aside>
    </div>
  );
};
