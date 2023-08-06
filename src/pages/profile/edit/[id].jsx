import { createLink, getSelectedAccount, updateAccount } from "@/api/services";
import InputType from "@/components/InputType";
import SelectType from "@/components/SelectType";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const mulish = Mulish({ subsets: ["latin"] });
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit({ data, id }) {
  const navigation = useRouter();
  console.log(data )
  const [account, setAccount] = useState({
    fullname: data.attributes.fullname,
    bio: data.attributes.bio,
    slug: data.attributes.slug,
    photo: `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }${data?.attributes?.photo?.data?.attributes?.url.slice(1)}`,
    photoFile: "true",
  });

 const handleChangeAccount = (e) => {
    if ([e.target.name] == "photo") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          toast.error("Image size must less than 3 mb", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setAccount({
            ...account,
            photoFile: "",
            photo: `${account.photo}`,
          });
        } else {
          setAccount({
            ...account,
            photoFile: e.target.files[0],
            photo: URL.createObjectURL(e.target.files[0]),
          });
        }
      } else {
        toast.error("Image type must png/jpg/jpeg", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setAccount({
          ...account,
          photoFile: "",
          photo: `${account.photo}`,
        });
      }
    } else {
      setAccount({
        ...account,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAccount({
        ...account,
        id: JSON.parse(localStorage.getItem("accountId")),
        token: JSON.parse(localStorage.getItem("token")),

      });

      await navigation.push("/dashboard");
    } catch (error) {
      console.error("Error register: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <main
        className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${mulish.className}`}
      >
        <h1 className="text-2xl font-extrabold">Update Profile</h1>
        <div className="mt-12">
          {account.photoFile ? (
            <div className="rounded-full p-1 border-dashed border-2">
              <div className=" w-[100px] h-[100px] rounded-full overflow-hidden flex justify-center items-center">
                <img
                  className="w-full object-cover  h-full"
                  src={account.photo}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <p>The Image Icon will show in here</p>
          )}
        </div>

        <form
          action="post"
          className="mt-12 flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          <InputType
            label={"Fullname"}
            isRequired={true}
            name={"fullname"}
            type={"text"}
            onChange={handleChangeAccount}
            value={account.fullname}
          />
          <InputType
            label={"Bio"}
            isRequired={true}
            name={"bio"}
            type={"text"}
            onChange={handleChangeAccount}
            value={account.bio}
          />
          <InputType
            label={"Slug"}
            isRequired={true}
            name={"slug"}
            type={"text"}
            onChange={handleChangeAccount}
            value={account.slug}
          />
          <InputType
            label={"Photo"}
            isRequired={false}
            name={"photo"}
            type={"file"}
            onChange={handleChangeAccount}
          />

          <button className="rounded-2xl px-4 py-3 bg-blue-500" type="submit">
            Update account
          </button>
          <a
            href="/dashboard"
            className="text-center px-4 py-3 underline"
            type="submit"
          >
            Go Back
          </a>
        </form>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const responseData = await getSelectedAccount(id);
  return {
    props: {
      data: responseData.data.data[0],
      id: id,
    },
  };
}
