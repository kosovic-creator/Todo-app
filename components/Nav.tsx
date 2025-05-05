
'use client";'
import Link from "next/link";
import {  HomeIcon } from "lucide-react";
import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const Nav: React.FC = () => {
  // const session = await getServerSession(options);
  //console.log(session);
  return (
    <>
      <header className="bg-black text-white">
        <nav className="flex justify-between items-center mt-4 p-4">
          <div className="flex gap-10 ml-0">
            <Link className="p-0 ml-1" href="/">
              <HomeIcon />
            </Link>
          </div>
          <div className="flex gap-10">
            <Link href="/todo">PODSJETNIK</Link>

            {/* {session?.user.role == "ADMIN" && ( */}
            <Link href="/CreateUser">Dodaj Korisnika</Link>
            {/* )}
            {session ? ( */}
            <>
              {/* <p>{session.user.name}</p>
              <p>{session.user.email}</p> */}
              <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            </>
            {/* ) : ( */}
            <Link href="/api/auth/signin">Login</Link>
            {/* )} */}
          </div>
        </nav>
      </header>
    </>
  );
};
export default Nav;
