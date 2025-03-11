import { auth } from "@/lib/auth";
import { cache } from "react";
import { db } from "./drizzle";
import { eq } from "./drizzle-orm";
import { planners } from "./schema";
import { PlannerDTO } from "./types";

export const getPlanners = cache(async (): Promise<PlannerDTO[]> => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) return [];

    const userPlanners = await db.query.planners.findMany({
        where: eq(planners.userId, userId),
    });

    return userPlanners;
});

export const getPlannerById = cache(async (id: string): Promise<PlannerDTO | undefined> => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) return undefined;

    const planner = await db.query.planners.findFirst({
        where: eq(planners.id, id),
    })

    return planner;
})