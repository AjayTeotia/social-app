"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark")
            }}
            size={"icon"}
            variant={"outline"}
        >
            <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

            <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

            <span className="sr-only">
                Toggle {theme === "dark" ? "light" : "dark"} mode
            </span>
        </Button>
    )
}