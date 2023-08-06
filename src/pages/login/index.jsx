import { getSelectedUserById, loginAuth, registerAuth } from "@/api/services";
import InputType from "@/components/InputType";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const mulish = Mulish({ subsets: ["latin"] });
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigation = useRouter();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAuth(form);
      
      toast.success("Login Success", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
      localStorage.setItem("token", JSON.stringify(await response.jwt));
      const responseUser = await getSelectedUserById(response.user.id);
      
      localStorage.setItem(
        "accountId",
        JSON.stringify(await responseUser.data.account.id)
      );

      setTimeout(() => {
        navigation.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
      console.error("Error register: ", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigation.push("/");
    } else {
      return;
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <main
        className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${mulish.className}`}
      >
        <h1 className="text-2xl font-extrabold">Login Page</h1>
        <form
          action="post"
          className="mt-12 flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
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

          <button className="rounded-2xl px-4 py-3 bg-blue-500" type="submit">
            Login
          </button>
          <a href="/" className="text-center px-4 py-3 underline" type="submit">
            Go Back
          </a>
        </form>
      </main>
    </>
  );
}
