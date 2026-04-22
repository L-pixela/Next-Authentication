"use client";

import { login } from "../lib/actions/auth";

export const SignInButton = () => {
    return (
        <button 
        className="px-4 py-2 bg-green-200 rounded-2xl border border-green-600 text-2xl text-green-600 hover:cursor-pointer hover:bg-green-100 hover:transition-duration-300"
        onClick={() => login()}
        >
            Sign In with Github
        </button>
    )
}