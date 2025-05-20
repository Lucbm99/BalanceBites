import { decrementUserCredits } from '@/db/actions';
import { getUserCredits } from '@/db/queries';
import { ai } from '@/lib/gemini';
import { generateIdRandom, isValidJSON, removeJSONMarkers } from "@/lib/utils";
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
        model: "gemini-2.0-flash-lite",
        contents: `
            Crie um conteúdo JSON que será utilizado para popular um planejamemto alimentar, alinhado com o objetivo fornecido pelo usuário: ${goal}, suas restrições: ${restriction} e pelo número de refeições diárias que ele terá no novo cardápio: ${dailyMeals}
                : ""
            }. O conteúdo deve ser otimizado para fornecer todas as calorias que o indivíduo necessita, as gramas de comida que ele precisará comer em cada refeição, os nutrientes, focando no objetivo de sua saúde para esse momento.
          
            **Importante**: Não incluir palavras como "Tarefa", "Ação", "Resultado", nem palavras como "fundamental", "crucial". O conteúdo deve ser escrito de forma profissional e direta, utilizando a metodologia STAR para o campo de "sobre mim" e adotando um tom que destaque ao que o candidato precisa fazer, conforme seu objetivo.
          
            Estrutura (Gere um JSON válido e bem formatado):
            {
              summary: "Campo usado para sobre mim, usando metodologia tipo STAR, focando no objetivo pessoal que o usuário deseja alcançar. Não incluir palavras como "Tarefa", "Ação", "Resultado"., "Situação".",
              headline: "Headline curto em poucas palavras para ficar abaixo do nome do atleta. Normalmente é uma curta descrição do que ele necessita. Deixar somente a primeira letra do título maiúscula, tal como: "Plano alimentar estratégico para redução de massa magra".",
              meal: "Um array de objetos com as refeições diárias que a pessoa fará, com base no número fornecido em ${dailyMeals}. Cada objeto deve conter um id único gerado pela função ${generateIdRandom} e a chave 'meals' com uma refeição. Exemplo de formato: [{ id: 'fkkjsdffjsdo', meals: 'Café da manhã' }, { id: 'd5fdssdswq2', meals: 'Lanche da tarde' }].",
              consume: "Um array de objetos com a quantidade de alimentos que a pessoa deverá consumir, em cada refeição, com a quantidade em gramas, fornecendo todos os nutrientes necessários. Cada objeto deve conter um id único gerado pela função ${generateIdRandom}, uma chave 'consume' com uma descrição clara e objetiva. Exemplo de formato: [{ id: 'vkjcvnzwe522', consume: 'Almoço - 100g de arroz, 100g de feijão, 120g de proteína e 100g de legumes variados' }, { id: 'df2e1d21sd', consume: 'Jantar - 100g de arroz, 100g de proteína e 100g de legumes' }].",
              notes: "Um array de objetos com dicas relacionadas à dieta. Cada objeto deve conter um id único gerado pela função ${generateIdRandom}, a chave 'notes' com uma frase clara e objetiva. Exemplo de formato: [{ id: '3j4n6n2l2', notes: 'Evite frituras' }, { id: '5e2ref1er', notes: 'Inclua vegetais verdes escuros' }]. Pode ser gerado também, além disso, três sugestões de receitas saudáveis para a dieta do usuário.",
              products: "Um array de objetos com uma lista com os ingredientes de mercado necessários para a compra da semana, na dieta. Cada objeto deve conter um id único gerado pela função ${generateIdRandom}, a chave 'products' com um produto que auxilie no emagrecimento do plano alimentar da pessoa. Exemplo de formato: [{ id: 'efdf4s35r4', products: 'peito de frango' }, { id: '2e1sd2e1ws', products: 'peixe branco' }].",
            }
          `,
      });
  
      const json = removeJSONMarkers(response.text ?? "");

      if (!isValidJSON(json)) throw new Error("JSON inválido.");
      
      await decrementUserCredits(1);
  
      return Response.json({ data: json });
      
    } catch (error) {
        console.log(error);
        return Response.json(
            { message: "Ocorreu um erro inesperado.", error},
            { status: 500 }
        )
    }
}