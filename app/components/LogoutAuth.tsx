"use client"
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react"
import { Hanko } from "@teamhanko/hanko-elements"

const hankoAPI = process.env.NEXT_PUBLIC_HANKO_API_URL || "";

const LogoutButton = () => {
    const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoAPI))
    );
  }, []);

  const handleLogout = async () => {
    try {
      if (hanko) {
        await hanko.user.logout(); 
        router.replace("/user-page"); // Redirect to login page after logout
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
  onClick={handleLogout}>Logout</button>;
};
export default LogoutButton;
