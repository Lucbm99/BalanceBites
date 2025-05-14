import { decrementUserCredits } from '@/db/actions';
import { getUserCredits } from '@/db/queries';
import { ai } from '@/lib/gemini';
import { isValidJSON, removeJSONMarkers } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
    goal: z.string(),
    restriction: z.string().optional(),
    dailyMeals: z.coerce.number(),
});

export const POST = async (request: Request) => {
    try {
      const credits = await getUserCredits();

      if (credits <= 0) {
        return Response.json({ message: "Créditos insuficientes." }, { status: 403 });
      }

      const body = await request.json();

      const { goal, restriction, dailyMeals } = schema.parse(body);
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro-exp-03-25",
        contents: `
            Crie um conteúdo JSON que será utilizado para popular um planejamemto alimentar, alinhado com o objetivo fornecido pelo usuário: ${goal}, suas restrições: ${restriction} e pelo número de refeições diárias que ele terá no novo cardápio: ${dailyMeals}
                : ""
            }. O conteúdo deve ser otimizado para fornecer todas as calorias que o indivíduo necessita, as gramas de comida que ele precisará comer em cada refeição, os nutrientes, focando no objetivo de sua saúde para esse momento.
          
            **Importante**: Não incluir palavras como "Tarefa", "Ação", "Resultado", nem palavras como "fundamental", "crucial". O conteúdo deve ser escrito de forma profissional e direta, utilizando a metodologia STAR para o campo de "sobre mim" e adotando um tom que destaque ao que o candidato precisa fazer, conforme seu objetivo.
          
            Estrutura (Gere um JSON válido e bem formatado):
            {
              summary: "Campo usado para sobre mim, usando metodologia tipo STAR, focando no objetivo pessoal que o usuário deseja alcançar. Não incluir palavras como "Tarefa", "Ação", "Resultado".",
              headline: "Headline curto em poucas palavras para ficar abaixo do nome do atleta. Normalmente é uma curta descrição do que ele necessita. Deixar somente a primeira letra do título maiúscula, tal como: "Plano alimentar estratégico para redução de massa magra".",
              // skills: [
                //   {
                //     name: "Nome da habilidade mais relevante para a vaga.",
                //     keywords: "Palavras-chave relacionadas a essa habilidade, separadas por vírgula, que ajudem a destacar a competência."
                //     level: 0-5 (0 para básico, 5 para avançado),
                //   },
                //   ...
                // ]
            }
          `,
      });
  
      const json = removeJSONMarkers(response.text ?? "");

      if (!isValidJSON(json)) throw new Error("JSON inválido.");
      
      await decrementUserCredits(1);
  
      return Response.json({ data: json });
      
    } catch (error) {
        return Response.json(
            { message: "Ocorreu um erro inesperado.", error},
            { status: 500 }
        )
    }
}