import Logo from "@/assets/logo.svg";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";
import { Chrome, Github } from "lucide-react";
import Image from "next/image";

type Providers = "github" | "google";

export default function LoginPage() {
    const handleLogin = async (form: FormData) => {
        "use server"

        const provider = form.get("provider") as Providers;
        
        console.log(form)

        await signIn(provider, { redirectTo: "/dashboard/food-planners" });
    }

    return (
        <div className="grid grid-cols-[1.5fr, 1fr] h-screen">
            <aside>
                <Image
                    width={100}
                    height={100}
                    src="/images/auth-bg.webp"
                    alt="Escritório com vários currículos espalhados por todas as mesas"
                    className="w-full h-full object-cover"
                    quality={100}
                />
            </aside>

            <form className="p-10 flex justify-center flex-col" action={handleLogin}>
                <div className="flex items-center justify-between mb-10">
                    <Logo className="max-w-[90px]" />
                
                    <ThemeToggle />
                </div>
                
                <h1 className="text-2xl font-title font-bold">Entre em sua conta</h1>
                <p className="text-sm text-muted-foreground">
                    Caso não tenha conta, ela será criada automaticamente.
                </p>

                <div className="flex flex-col gap-4 mt-6">
                    <Button
                        variant="outline"
                        className="w-full gap-2"
                        type="submit"
                        name="provider"
                        value="github"
                    >
                        <Github size={20} />
                        Entrar com GitHub
                    </Button>
                    <Button
                        className="w-full gap-2"
                        type="submit"
                        name="provider"
                        value="google"
                    >
                        <Chrome size={20} />
                        Entrar com Google
                    </Button>
                </div>
            </form>
        </div>
    )
}