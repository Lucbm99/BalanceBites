import { cn } from "@/lib/utils";
import { BellRing, Dumbbell, Mail, MapPin, MoveUp, Phone } from "lucide-react";

type BasicInfosProps = {
  infos: PlannerInfosData;
  className?: string;
};

export const BasicInfos = ({ infos, className }: BasicInfosProps) => {
  const basicInfos = [
    {
      icon: MapPin,
      value: infos.location,
    },
    {
      icon: Phone,
      value: infos.phone,
      href: `tel:${infos.phone}`,
    },
    {
      icon: Mail,
      value: infos.email,
      href: `mailto:${infos.email}`,
    },
    {
      icon: Dumbbell,
      value: `${infos.weight} kg`,
    },
    {
      icon: MoveUp,
      value: `${infos.height} m`,
    },
    {
      icon: BellRing,
      value: `LEMBRETE: BEBA, NO MÍNIMO, 2L DE ÁGUA POR DIA.`,
    },
    // {
    //   icon: Link,
    //   value: infos.website,
    //   href: infos.website,
    // },
  ].filter((info) => !!info.value);

  if (basicInfos.length === 0) return null;

  return (
    <div className={cn(
      "flex items-center justify-center gap-4 flex-wrap text-sm",
      className,
    )}>
      {basicInfos.map((info) => {
        const Container = info.href ? "a" : "div";
        return (
          <Container
            key={info.value}
            href={info?.href}
            target="_blank"
            className={cn("flex items-center gap-2", info.href && "underline")}
          >
            <info.icon className="text-planner-primary" size={16} />
            <p>{info.value}</p>
          </Container>
        );
      })}
    </div>
  );
};
