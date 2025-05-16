import { decrementUserCredits } from '@/db/actions';
import { getUserCredits } from '@/db/queries';
import { ai } from '@/lib/gemini';
import { isValidJSON, removeJSONMarkers } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
  content: z.object({}).passthrough(),
});

export const POST = async (request: Request) => {
  try {
    const credits = await getUserCredits();

    if (credits <= 0) {
      return Response.json({ message: "Créditos insuficientes." }, { status: 403 });
    }

    const body = await request.json();

    const { content } = schema.parse(body);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: `
          Baseado no JSON abaixo, avalie todos os campos alterando o conteúdo de todos eles, aprimorando o texto para parecer mais claro e profissional, pois será usado em planejamentos alimentares.
          Também corrija erros gramaticais e de concordância, se necessário.
          Mantenha dados pessoais, links, emails, etc. como estão, apenas altere o texto dos campos.

          **Lembre-se de retornar um JSON válido e bem formatado.**

          **JSON:**

          ${JSON.stringify(content, null, 2)}
        `,
    });

    const json = removeJSONMarkers(response.text ?? "");

    if (!isValidJSON(json)) throw new Error("JSON inválido.");
    
    await decrementUserCredits(1);

    return Response.json({ data: json });

  } catch (error) {
      console.log(error);
      return Response.json(
        { message: "Ocorreu um erro inesperado.", error },
        { status: 500 }
      );
  }
};