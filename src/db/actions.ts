"use server";

import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./drizzle";
import { planners } from "./schema";

const getUserIdOrThrow = async () => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("Usuário não encontrado.");

    return userId;
}

export const createPlanner = async (title: string) => {
    const userId = await getUserIdOrThrow();

    const newPlanner = await db
    .insert(planners)
    .values({ title, userId })
    .returning();

    revalidatePath("/dashboard/food-planners");

    return newPlanner[0];
}

export const updatePlannerData = async (id: string, data: PlannerData) => {
    await getUserIdOrThrow();

    const updatedPlanner = await db
    .update(planners)
    .set({ data, updatedAt: new Date() })
    .where(eq(planners.id, id))
    .returning();

    revalidatePath("/dashboard/food-planners");

    return updatedPlanner[0];
}

export const deletePlanner = async (id: string) => {
    const userId = await getUserIdOrThrow();

    const planner = await db.query.planners.findFirst({
        where: eq(planners.id, id)
    });

    if (!planner) throw new Error("Planejamento alimentar não encontrado.");
    if (planner.userId !== userId) throw new Error("Usuário não autorizado");

    await db.delete(planners).where(eq(planners.id, id)).execute();

    revalidatePath("/dashboard/food-planners");
}

export const duplicatePlanner = async (id: string, title: string) => {
    const userId = await getUserIdOrThrow();

    const planner = await db.query.planners.findFirst({
        where: eq(planners.id, id),
    });

    if (!planner) throw new Error("Planejamento alimentar não encontrado.");

    const newPlanner = await db
        .insert(planners)
        .values({
            title,
            userId,
            data: planner.data,
        })
    .returning();

    revalidatePath("/dashboard/food-planners");

    return newPlanner[0];
};