import {
  createLink,
} from "@/api/services";
import InputType from "@/components/InputType";
import SelectType from "@/components/SelectType";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
const mulish = Mulish({ subsets: ["latin"] });
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create() {
  const navigation = useRouter();
  const [link, setLink] = useState({
    icon: "",
    iconFile: "",
    title: "",
    status: "",
    url: "",
    account: "",
  });

  const handleChangeLinkForm = (e) => {
    if ([e.target.name] == "icon") {
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
          setLink({
            ...link,
            iconFile: "",
            icon: `${link.icon}`,
          });
        } else {
          setLink({
            ...link,
            iconFile: e.target.files[0],
            icon: URL.createObjectURL(e.target.files[0]),
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
        setLink({
          ...link,
          iconFile: "",
          icon: `${link.icon}`,
        });
      }
    } else {
      setLink({
        ...link,
        [e.target.name]: e.target.value,
      });
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createLink({
        ...link,
        account: JSON.parse(localStorage.getItem("accountId")),
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
        <h1 className="text-2xl font-extrabold">Create Link</h1>
        <div className="mt-12">
          {link.iconFile ? (
            <div className="rounded-full p-1 border-dashed border-2">
              <div className=" w-[100px] h-[100px] rounded-full overflow-hidden flex justify-center items-center">
                <img
                  className="w-full object-cover  h-full"
                  src={link.icon}
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
            label={"Title"}
            isRequired={true}
            name={"title"}
            type={"text"}
            onChange={handleChangeLinkForm}
            value={link.title}
          />
          <SelectType
            label={"Status"}
            isRequired={true}
            name={"status"}
            type={"text"}
            onChange={handleChangeLinkForm}
            value={link.status}
            options={["active", "deactive", "suspend"]}
          />
          <InputType
            label={"URL"}
            isRequired={true}
            name={"url"}
            type={"text"}
            onChange={handleChangeLinkForm}
            value={link.url}
          />
          <InputType
            label={"Icon"}
            isRequired={true}
            name={"icon"}
            type={"file"}
            onChange={handleChangeLinkForm}
          />

          <button className="rounded-2xl px-4 py-3 bg-blue-500" type="submit">
            Add Link
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
