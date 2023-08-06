import { createProfileAccount, registerAuth } from "@/api/services";
import InputType from "@/components/InputType";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
const mulish = Mulish({ subsets: ["latin"] });
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigation = useRouter();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    username: "",
    account: "",
  });
  const [account, setAccount] = useState({
    fullname: "",
    photo: "",
    photoFile: "",
    bio: "",
    slug: "",
  });

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
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
      const response = await createProfileAccount(account);
      const responseRegister = await registerAuth({
        ...form,
        account: response.data.id,
      });

      await navigation.push("/login");
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
        <h1 className="text-2xl font-extrabold">Register Page</h1>
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
            <p>The Image Profile will show in here</p>
          )}
        </div>

        <form
          action="post"
          className="mt-12 flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          <InputType
            label={"Username"}
            isRequired={true}
            name={"username"}
            type={"text"}
            onChange={handleChangeForm}
            value={form.username}
          />
          <InputType
            label={"Email"}
            isRequired={true}
            name={"identifier"}
            type={"email"}
            onChange={handleChangeForm}
            value={form.identifier}
          />
          <InputType
            label={"Password"}
            isRequired={true}
            name={"password"}
            type={"password"}
            onChange={handleChangeForm}
            value={form.password}
          />

          <InputType
            label={"Fullname"}
            isRequired={true}
            name={"fullname"}
            type={"text"}
            onChange={handleChangeAccount}
            value={account.fullname}
          />
          <InputType
            label={"Bio or Description"}
            isRequired={true}
            name={"bio"}
            type={"text"}
            onChange={handleChangeAccount}
            value={account.bio}
          />
          <InputType
            label={"Your Slug URL"}
            isRequired={true}
            name={"slug"}
            type={"text"}
            onChange={handleChangeAccount}
            value={account.slug}
          />
          <InputType
            label={"Your Profile Photo"}
            isRequired={true}
            name={"photo"}
            type={"file"}
            onChange={handleChangeAccount}
          />

          <button className="rounded-2xl px-4 py-3 bg-blue-500" type="submit">
            submit
          </button>
        </form>
        <a href="/" className="text-center px-4 py-3 underline" type="submit">
          Go Back
        </a>
      </main>
    </>
  );
}
