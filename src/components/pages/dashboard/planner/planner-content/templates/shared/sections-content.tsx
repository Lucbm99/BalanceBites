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
    // case "objectives": //socialMedias
    //   return (
    //     <div className="flex flex-col gap-2 text-sm">
    //       {content.objectives.map((objective, i) => (
    //         <Link
    //           withIcon={false}
    //           iconColor={linkIconColor}
    //           href={socialMedia.url}
    //           key={`social-media-${i}`}
    //         >
    //           {socialMedia.icon ? (
    //             <img
    //               className="w-3 h-3 object-contain"
    //               src={`https://cdn.simpleicons.org/${socialMedia.icon}`}
    //             />
    //           ) : (
    //             <strong className="text-xs">{objective.objective}:</strong>
    //           )}
    //           {/* {socialMedia.username} */}
    //         </Link>
    //       ))}
    //     </div>
    //   );
    case "objectives":
      return (
        <div className="flex flex-col gap-4">
          {content.objectives.map((objective, i) => (
            <div
              key={`experience-${i}`}
              className="text-sm flex flex-col gap-0.5"
            >
              <div className="flex items-center justify-between font-bold">
                <Element>{objective.objective}</Element>
                {/* <Element>{experience.date}</Element> */}
              </div>
              {/* <div className="flex items-center justify-between">
                <Element>{experience.position}</Element>
                <Element>{experience.location}</Element>
              </div> */}
              {/* {experience.website && (
                <Link href={experience.website} iconColor={linkIconColor}>
                  {experience.website}
                </Link>
              )}
              {experience.summary && (
                <div
                  className="text-sm mt-0.5"
                  dangerouslySetInnerHTML={{ __html: experience.summary }}
                />
              )} */}
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
    case "restrictions":
      return (
        <div className="flex flex-col gap-4">
          {content.restrictions.map((restriction, i) => (
            <div
              key={`experience-${i}`}
              className="text-sm flex flex-col gap-0.5"
            >
              <div className="flex items-center justify-between font-bold">
                <Element>{restriction.restriction}</Element>
                {/* <Element>{experience.date}</Element> */}
              </div>
              {/* <div className="flex items-center justify-between">
                <Element>{experience.position}</Element>
                <Element>{experience.location}</Element>
              </div> */}
              {/* {experience.website && (
                <Link href={experience.website} iconColor={linkIconColor}>
                  {experience.website}
                </Link>
              )}
              {experience.summary && (
                <div
                  className="text-sm mt-0.5"
                  dangerouslySetInnerHTML={{ __html: experience.summary }}
                />
              )} */}
            </div>
          ))}
        </div>
      );
    case "preferences":
      return (
        <div className="flex flex-col gap-4">
          {content.preferences.map((preference, i) => (
            <div
              key={`preference-${i}`}
              className="text-sm flex flex-col gap-0.5"
            >
              <div className="flex items-center justify-between font-bold">
                <Element>{preference.preference}</Element>
                {/* <Element>{education.date}</Element> */}
              </div>
              {/* <div className="flex items-center justify-between">
                <Element>{education.degree}</Element>
                <Element>{education.location}</Element>
              </div>
              {education.website && (
                <Link iconColor={linkIconColor} href={education.website}>
                  {education.website}
                </Link>
              )}
              {education.summary && (
                <div
                  className="text-sm mt-0.5"
                  dangerouslySetInnerHTML={{ __html: education.summary }}
                />
              )} */}
            </div>
          ))}
        </div>
      );
    // case "skills":
    //   return (
    //     <div className="flex flex-col gap-4">
    //       {content.skills.map((skill, i) => {
    //         const level = skill.level ?? 0;

    //         return (
    //           <div key={`skill-${i}`} className="text-sm flex flex-col gap-1">
    //             <Element className="font-bold -mb-1.5">{skill.name}</Element>
    //             <Element>{skill.description}</Element>
    //             <LevelIndicator
    //               level={level}
    //               levelsColor={levelsColor}
    //               className="my-0.5"
    //               variant={levelIndicatorVariant}
    //             />
    //             <Element className="text-xs">{skill.keywords}</Element>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   );
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
    // case "certifications":
    //   return (
    //     <div className="flex flex-col gap-4">
    //       {content.certifications.map((certification, i) => (
    //         <div
    //           key={`certification-${i}`}
    //           className="text-sm flex flex-col gap-0.5"
    //         >
    //           <div className="flex items-center justify-between font-bold">
    //             <Element>{certification.name}</Element>
    //             <Element>{certification.date}</Element>
    //           </div>
    //           <Element>{certification.institution}</Element>
    //           {certification.website && (
    //             <Link href={certification.website}>
    //               {certification.website}
    //             </Link>
    //           )}
    //           {certification.summary && (
    //             <div
    //               className="text-sm mt-0.5"
    //               dangerouslySetInnerHTML={{ __html: certification.summary }}
    //             />
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   );
    // case "projects":
    //   return (
    //     <div className="flex flex-col gap-4">
    //       {content.projects.map((project, i) => (
    //         <div key={`project-${i}`} className="text-sm flex flex-col gap-0.5">
    //           <div className="flex items-center justify-between font-bold">
    //             <Element>{project.name}</Element>
    //             <Element>{project.date}</Element>
    //           </div>
    //           <Element>{project.description}</Element>
    //           {project.website && (
    //             <Link iconColor={linkIconColor} href={project.website}>
    //               {project.website}
    //             </Link>
    //           )}
    //           {project.summary && (
    //             <div
    //               className="text-sm mt-0.5"
    //               dangerouslySetInnerHTML={{ __html: project.summary }}
    //             />
    //           )}
    //           <Element className="text-xs">{project.keywords}</Element>
    //         </div>
    //       ))}
    //     </div>
    //   );
    default:
      return null;
  }
};
