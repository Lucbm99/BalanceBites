import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Crie currículos de forma rápida e fácil com nossos modelos gratuitos.",
}

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col md:justify-center p-6 overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
        <div>
          <Logo className="w-full max-w-[100px] mb-8" />

          <h1 className="font-title font-bold text-5xl max-w-[500px]">
            Um planejador alimentar gratuito e simples de usar
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Monte seus planos alimentares de forma rápida e prática com nossos modelos<br/>
            personalizados.
          </p>

          <Link href="/dashboard/food-planners" passHref>
            <Button className="mt-4">Começar agora</Button>
          </Link>
        </div>

        <div className="flex-1 relative h-full">
          <Image
            src="/images/dashboard_food.webp"
            alt="Imagem do painel do BalanceBites"
            width={1200}
            height={800}
            className={cn(
              "md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:min-w-[80vw]",
              "rounded-lg overflow-hidden border-2 border-muted"
            )}
          />
        </div>
      </div>
    </main>
  );
}