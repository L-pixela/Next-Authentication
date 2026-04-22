import { auth } from "@/src/auth";
import Image from "next/image";

export default async function UserInfo(){
    const session = await auth();
    return (
        <div className="flex flex-col items-center p-4 justify-center h-full gap-4">
            {" "}
            <h1>You are Logged in!!!</h1>
            <p>Welcome to the application!!!</p>
                {session?.user?.image && 
                <Image 
                alt={session?.user.name ?? "Avatar Photo"}
                src={session?.user.image}
                height={48}
                width={48}
                style={{ borderRadius: "50%" }}
                />
            }
            <p>User Name: {session?.user?.name}</p>
            <p>User Email: {session?.user?.email}</p>
        </div>
    )
};