"use server";

import { auth } from "@/lib/auth";
import { db } from "./drizzle";
import { planners } from "./schema";
import { revalidadePath } from "next/cache";
import { eq } from "./drizzle-orm";

export const createPlanner = async (title: string) => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("Usuário não encontrado.");

    const newPlanner = await db
    .insert(planners)
    .values({ title, userId })
    .returning();

    revalidadePath("/dashboard/food-planners");

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

    revalidadePath("/dashboard/food-planners");

    return updatedPlanner[0];
}