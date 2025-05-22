import { cn } from "@/lib/utils";
import { Activity, BellRing, Dumbbell, Mail, MapPin, MoveUp, Phone } from "lucide-react";

type BasicInfosProps = {
  infos: PlannerInfosData;
  className?: string;
};

export const BasicInfos = ({ infos, className }: BasicInfosProps) => {
  
  const weightIMC = parseFloat(infos.weight.replace(',', '.'));
  const heightIMC = parseFloat(infos.height.replace(',', '.'));
  let resultadoIMC: number | null = null;
  let classificacao = "";


  if (!isNaN(weightIMC) && !isNaN(heightIMC) && heightIMC > 0) {

    const calculoIMC = ((weightIMC) / (Math.pow(heightIMC, 2)));

    resultadoIMC = calculoIMC;

    if (resultadoIMC < 18.5) {

      classificacao = "Abaixo do peso";

    } else if (resultadoIMC >= 18.5 && resultadoIMC <= 24.9) {

      classificacao = "Peso normal";

    } else if (resultadoIMC >= 25 && resultadoIMC <= 29.9) {

      classificacao = "Sobrepeso";

    } else if (resultadoIMC >= 30 && resultadoIMC <= 34.9) {

      classificacao = "Obesidade grau 1";

    } else if (resultadoIMC >= 35 && resultadoIMC <= 39.9) {

      classificacao = "Obesidade grau 2";

    } else {
      
      classificacao = "Obesidade grau 3";
    }

  } else {

    console.log("Valores inválidos para peso ou altura");

  }

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
      icon: Activity,
      value: resultadoIMC ? `Seu IMC é igual a: ${resultadoIMC?.toFixed(2)} - ${classificacao}` : "Para calcular o IMC, digite os valores de peso e altura",
    },
    {
      icon: BellRing,
      value: `LEMBRETE: BEBA, NO MÍNIMO, 2L DE ÁGUA POR DIA.`,
    },
    
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
