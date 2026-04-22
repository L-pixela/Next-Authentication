"use client";

import { logout } from "../lib/actions/auth";

export const SignOutButton = () => {
    return (
        <button 
        className="px-4 py-2 bg-red-200 rounded-2xl border border-red-600 text-2xl text-red-600 hover:cursor-pointer hover:bg-red-100 hover:transition-duration-300"
        onClick={() => logout()}
        >
            Sign Out
        </button>
    )
}