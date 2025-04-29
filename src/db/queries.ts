import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "./drizzle";
import { planners, users } from "./schema";
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
});

export const getUserCredits = cache(async () => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) return 0;

    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });

    return user?.credits ?? 0;
});