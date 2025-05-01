"use client"

import { ThemeProvider } from "@/components/shared/theme-provider";
import { useTanstackQuery } from "@/lib/tanstack-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

const CreditsToast = () => {
    const searchParams = useSearchParams();

    const successCheckoutParam = searchParams.get("success");

    useEffect(() => {
        if (successCheckoutParam === "true") {
            toast.success(
                "Compra realizada com sucesso! Seus créditos foram adicionados à sua conta."
            )
        }
    }, [successCheckoutParam]);

    return null;
}


type ClientProvidersProps = {
    children: ReactNode;
}

export const ClientProviders = ({ children }: ClientProvidersProps) => {
    const queryClient = useTanstackQuery()

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Suspense>
                    <CreditsToast />
                </Suspense>
                {children}
                <Toaster />
            </ThemeProvider>
        </QueryClientProvider>
    )
}