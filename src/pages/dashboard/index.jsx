import {
  deleteLink,
  getLinksByAccountId,
  getSelectedAccountByID,
} from "@/api/services";
import Pencil from "@/assets/iconsSVG/Pencil";
import Trash from "@/assets/iconsSVG/Trash";
import InputType from "@/components/InputType";
import Navbar from "@/components/Navbar";
import { Mulish } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const mulish = Mulish({ subsets: ["latin"] });
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const navigation = useRouter();
  const [data, setData] = useState();
  const [links, setLinks] = useState();
  const [imageProfile, setImageProfile] = useState("");
  const handleDeleteOne = async (id) => {
    await deleteLink({
      id: id,
      token: JSON.parse(localStorage.getItem("token")),
    });

    toast.success("Delete Link Success", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });

    setTimeout(() => {
      navigation.push("/");
    }, 2000);
  };
  const handleUpdateOne = async (id) => {
    navigation.push(`/dashboard/edit/${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }

    const initFetch = async () => {
      const idUser = JSON.parse(localStorage.getItem("accountId"));
      const selectedAccount = await getSelectedAccountByID(idUser);
      const linksAccount = await getLinksByAccountId(idUser);
      setLinks(linksAccount.data.data);
      //   setLinks()
      setData(selectedAccount?.data?.data[0]?.attributes);
      setImageProfile(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }${selectedAccount?.data?.data[0]?.attributes?.photo?.data?.attributes?.url.slice(
          1
        )}`
      );
    };
    initFetch();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />

      {data && (
        <main
          className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${mulish.className}`}
        >
          
          <h1 className="text-2xl font-extrabold">Dashboard Page</h1>
          <div className="flex my-8 w-full justify-end">
            <button onClick={() => navigation.push(`/profile/edit/${data.slug}`)} className="bg-yellow-600 px-4 py-2 rounded-2xl font-bold text-lg">Update Profile</button>
          </div>
          <div className="rounded-full relative w-[150px] h-[150px] overflow-hidden mb-4">
            <Image
              className="relative"
              src={imageProfile}
              layout="fill"
              objectFit="cover"
              alt={data.fullname}
            />
          </div>
          <div className="flex flex-col items-center gap-2 w-full mb-12">
            <h3 className="text-2xl font-bold capitalize">{data.fullname}</h3>
            <p className="text-lg capitalize">{data.bio}</p>
          </div>
          <Link
            className="mb-10 bg-green-700 px-4 py-2 rounded-2xl font-bold text-lg"
            href={"/dashboard/create"}
          >
            Add Another Link
          </Link>
          <div className="flex flex-col items-center gap-8 w-full">
            {links &&
              links.map((link, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex  items-center gap-6 text-xl font-semibold h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
                  >
                    <div className="relative  w-20 h-16 rounded-full overflow-hidden">
                      <Image
                        objectFit="cover"
                        layout="fill"
                        src={`${
                          process.env.NEXT_PUBLIC_BACKEND_URL
                        }${link.attributes.icon.data.attributes.url.slice(1)}`}
                        alt={link.attributes.title}
                      />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <Link
                        href={`${link.attributes.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>{link.attributes.title}</p>
                        <p
                          className={`${
                            link.attributes.status === "active" &&
                            "text-green-500"
                          } 
                        ${
                          link.attributes.status === "deactive" &&
                          "text-red-500"
                        }
                          ${
                            link.attributes.status === "suspend" &&
                            "text-slate-500"
                          }
                        text-light text-base `}
                        >
                          {link.attributes.status}
                        </p>
                      </Link>
                      <div c lassName=" flex justify-end items-center">
                        <div className="flex gap-3 items-center">
                          <div
                            onClick={() => {
                              handleUpdateOne(link.id);
                            }}
                            className="hover:bg-black p-1 rounded-full"
                          >
                            <Pencil className={"w-8 h-8"} />
                          </div>
                          <div
                            onClick={() => {
                              handleDeleteOne(link.id);
                            }}
                            className="hover:bg-black p-1 rounded-full"
                          >
                            <Trash className={"w-8 h-8"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      )}
    </>
  );
}
