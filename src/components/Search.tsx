"use client";

import { getSearchUser } from "@/action/user.action";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<{ name: string | null; id: string; username: string; image: string | null }[]>([]);
    const searchBoxRef = useRef<HTMLDivElement>(null);  
    const router = useRouter();

    useEffect(() => {
        if (query.length > 0) {
            fetchSearchResults(query);
        } else {
            setResults([]);
        }
    }, [query]);

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setQuery('');
                setResults([]);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
                setQuery('');
                setResults([]);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchSearchResults = async (query: string) => {
        const userResults = await getSearchUser(query);
        setResults(userResults);
    };

    const handleUserClick = (userName: string) => {
        router.push(`/u/${userName}`);
        setQuery(''); 
        setResults([]); 
    };

    return (
        <div className="relative w-full md:max-w-[400px]" ref={searchBoxRef}>
            <div className="flex h-[48px] flex-1 items-center gap-3 rounded-full px-4 shadow-md">
                <SearchIcon className="size-6" />

                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for users..."
                    className="body-2 placeholder:body-1 w-full border-none p-0 shadow-none placeholder:text-light-200 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
            </div>

            {query && results.length > 0 && (
                <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] border-2 bg-secondary p-4">
                    {results.map((user) => (
                        <li
                            key={user.id}
                            className="cursor-pointer flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md"
                            onClick={() => handleUserClick(user.username)}
                        >
                            <Avatar>
                                <AvatarImage src={user.image || "/avatar.png"} alt={user.name || ""} />
                            </Avatar>

                            <div className="space-y-1">
                                <h3 className="font-semibold">
                                    {user.name}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    {user.username}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {query && results.length === 0 && (
                <div className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-muted p-4">
                    <p className="text-muted-foreground text-sm">No users found</p>
                </div>
            )}
        </div>
    );
}
