import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const mulish = Mulish({ subsets: ["latin"] });

function Navbar() {
  const navigation = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountId");
    navigation.push("/")
  }


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
       setIsLogin(true);
    } else {
      return;
    }
  }, []);
  return (
    <header className={`flex items-center justify-center md:justify-start p-8  ${mulish.className}`}>
      <nav className="flex md:flex-row flex-col items-center md:justify-between w-full">
        <h1 className="text-2xl font-extrabold md:mb-0 mb-8">Profile Link App</h1>
        <ul className="flex gap-5 items-center">
          {!isLogin ? (
            <>
              <li className="text-xl border-b-[1px] border-transparent hover:border-white">
                <button onClick={() => navigation.push("/login")} className="">
                  Login
                </button>
              </li>
              <li className="text-xl">
                <button
                  onClick={() => navigation.push("/register")}
                  className="rounded-2xl px-4 py-2 bg-blue-500"
                >
                  Register
                </button>
              </li>
            </>
          ) : (
            <>
            <li className="text-xl">
                <button
                  onClick={() => navigation.push("/dashboard")}
                  className="rounded-2xl px-4 py-2 bg-blue-500"
                >
                  Dashboard Page
                </button>
              </li>
            <li className="text-xl">
                <button
                  onClick={logout}
                  className="rounded-2xl px-4 py-2 bg-red-400"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
