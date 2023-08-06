import { getAllAccount, getSelectedAccount } from "@/api/services";
import Navbar from "@/components/Navbar";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const mulish = Mulish({ subsets: ["latin"] });

export default function Home() {
  const navigation = useRouter();
  const [slug, setSlug] = useState("");
  const handleChange = (e) => {
    setSlug(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigation.push(slug);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      <main
        className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${mulish.className}`}
      >
        <form
          className="flex flex-col items-center gap-8 w-full mb-12"
          onSubmit={handleSearch}
        >
          <h3 className="text-2xl font-bold">Search Your Account Now</h3>
          <input
            type="text"
            onChange={handleChange}
            value={slug}
            placeholder="Input the slug profile"
            className="bg-gray-400 rounded-[24px] px-4  py-2 w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border  border-gray-100"
          />
          <button className="rounded-2xl px-4 py-3 bg-blue-500" type="submit">
            Search Now
          </button>
        </form>
      </main>
    </>
  );
}
