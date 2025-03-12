"use server";

import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./drizzle";
import { planners } from "./schema";

export const createPlanner = async (title: string) => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("Usuário não encontrado.");

    const newPlanner = await db
    .insert(planners)
    .values({ title, userId })
    .returning();

    revalidatePath("/dashboard/food-planners");

    return newPlanner[0];
}

export const updatePlannerData = async (id: string, data: PlannerData) => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("Usuário não encontrado.");

    const updatedPlanner = await db
    .update(planners)
    .set({ data, updatedAt: new Date() })
    .where(eq(planners.id, id))
    .returning();

    revalidatePath("/dashboard/food-planners");

    return updatedPlanner[0];
}