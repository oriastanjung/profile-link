import {
  getAllAccounts,
  getLinksByAccountId,
  getSelectedAccount,
} from "@/api/services";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function SlugPage({ data }) {
  console.log("data >> ", data.id);
  const [links, setLinks] = useState();

  useEffect(() => {
    const initFetch = async () => {
      const idUser = data.id;
      const linksAccount = await getLinksByAccountId(idUser);
      console.log("linksAccount >> ", linksAccount.data.data);
      setLinks(linksAccount.data.data);
    };
    initFetch();
    // console.log("links >> ", links)
  }, []);
  return (
    <>
      <main
        className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}
      >
        <div className="rounded-full relative w-[150px] h-[150px] overflow-hidden mb-4">
          <Image
            className="relative"
            src={`${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }${data.attributes.photo.data.attributes.url.slice(1)}`}
            layout="fill"
            objectFit="cover"
            alt={data.attributes.fullname}
          />
        </div>
        <div className="flex flex-col items-center gap-2 w-full mb-12">
          <h3 className="text-2xl font-bold capitalize">
            {data.attributes.fullname}
          </h3>
          <p className="text-lg capitalize">{data.attributes.bio}</p>
        </div>
        <div className="flex flex-col items-center gap-8 w-full">
          {console.log("data >> ", data)}
          {links &&
            links.map((link, idx) => {
              return link.attributes.status === "suspend" ? (
                <button
                  key={idx}
                  className="flex  items-center gap-6 text-xl font-semibold h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4  transition-all cursor-pointer"
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
                    <p>
                      <p>{link.attributes.title}</p>
                      <p
                        className={`${
                          link.attributes.status === "active" &&
                          "text-green-500"
                        } 
                    ${link.attributes.status === "deactive" && "text-red-500"}
                      ${
                        link.attributes.status === "suspend" && "text-slate-500"
                      }
                    text-light text-base `}
                      >
                        {link.attributes.status}
                      </p>
                    </p>
                  </div>
                </button>
              ) : (
                <button
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
                  ${link.attributes.status === "deactive" && "text-red-500"}
                    ${link.attributes.status === "suspend" && "text-slate-500"}
                  text-light text-base `}
                      >
                        {link.attributes.status}
                      </p>
                    </Link>
                  </div>
                </button>
              );
            })}
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const accounts = await getAllAccounts();
  const dataAccounts = await accounts.data.data;

  const paths = dataAccounts.map((value) => {
    return {
      params: { slug: value.attributes.slug },
    };
  });

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const selectedAccount = await getSelectedAccount(params.slug);

  return {
    props: {
      data: selectedAccount.data.data[0],
    },
    revalidate: 10,
  };
}
