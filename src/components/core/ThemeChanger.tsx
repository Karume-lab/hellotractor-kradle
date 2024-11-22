"use client";
import React from "react";

import { useTheme } from "next-themes";
import { Check, SunMoon } from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ThemeChanger = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger >
                        <SunMoon size={40} strokeWidth={1.5} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setTheme("light")} >
                        {theme === "light" && <Check size={5} />}
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        {theme === "dark" && <Check size={5} />}
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        {theme === "system" && <Check size={5} />}
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>




        </div>

    );
};

export default ThemeChanger;
