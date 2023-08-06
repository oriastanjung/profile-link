import api from ".";
import axios from "axios";

const ENDPOINT = {
  ACCOUNT: "/accounts",
  USER: "/users",
  LINK: "/links",
  REGISTER: "/auth/local/register",
  LOGIN: "/auth/local?populate=*",
};

const getAllAccounts = async () => {
  try {
    const accounts = await api.get(ENDPOINT.ACCOUNT);
    return accounts;
  } catch (err) {
    throw err;
  }
};

const getSelectedAccount = async (slug) => {
  try {
    const selectedAccount = await api.get(
      `${ENDPOINT.ACCOUNT}?filters[slug][$eqi]=${slug}&populate=*`
    );
    return selectedAccount;
  } catch (err) {
    throw err;
  }
};

const createProfileAccount = async (form) => {
  try {
    let dataAccount = {
      fullname: form.fullname,
      bio: form.bio,
      slug: form.slug,
    };
    let formData = new FormData();
    formData.append("data", JSON.stringify(dataAccount));
    formData.append("files.photo", form.photoFile);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.ACCOUNT}`,
      formData
    );
    // const response = await api.post(ENDPOINT.ACCOUNT, formData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateAccount = async (form) => {
  console.log("form >> ", form);

  try {
    let dataAccount = {
      fullname: form.fullname,
      bio: form.bio,
      slug: form.slug,
    };
    let formData = new FormData();
    formData.append("data", JSON.stringify(dataAccount));
    formData.append("files.photo", form.photoFile);

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.ACCOUNT}/${form.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${form.token}`,
        },
      }
    );
    // const response = await api.post(ENDPOINT.ACCOUNT, formData)
    return response.data;
  } catch (error) {
    throw error;
  }
};

const registerAuth = async (form) => {
  try {
    const formData = {
      email: form.identifier,
      password: form.password,
      username: form.username,
      account: form.account, // Pass the account data directly as an object
    };

    const response = await api.post(ENDPOINT.REGISTER, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginAuth = async (form) => {
  try {
    const response = await api.post(ENDPOINT.LOGIN, form);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSelectedUserById = async (id) => {
  try {
    const selectedUser = await api.get(`${ENDPOINT.USER}/${id}?populate=*`);
    return selectedUser;
  } catch (err) {
    throw err;
  }
};

const getSelectedAccountByID = async (id) => {
  try {
    const selectedAccount = await api.get(
      `${ENDPOINT.ACCOUNT}?filters[id][$eqi]=${id}&populate=*`
    );
    return selectedAccount;
  } catch (err) {
    throw err;
  }
};

const getLinksById = async (id) => {
  try {
    const selectedId = await api.get(`${ENDPOINT.LINK}/${id}?populate=*`);
    return selectedId;
  } catch (err) {
    throw err;
  }
};

const getLinksByAccountId = async (id) => {
  try {
    const selectedAccount = await api.get(
      `${ENDPOINT.LINK}?filters[account][id][$eq]=${id}&populate=*`
    );

    return selectedAccount;
  } catch (err) {
    throw err;
  }
};

const createLink = async (form) => {
  try {
    let dataLink = {
      title: form.title,
      status: form.status,
      url: form.url,
      account: form.account,
    };
    let formData = new FormData();
    formData.append("data", JSON.stringify(dataLink));
    formData.append("files.icon", form.iconFile);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.LINK}`,
      formData,
      {
        headers: {
          Authorization: `Berarer ${form.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const updateLink = async (form) => {
  try {
    let dataLink = {
      title: form.title,
      status: form.status,
      url: form.url,
      account: form.account,
    };
    let formData = new FormData();
    formData.append("data", JSON.stringify(dataLink));
    formData.append("files.icon", form.iconFile);

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.LINK}/${form.id}`,
      formData,
      {
        headers: {
          Authorization: `Berarer ${form.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteLink = async ({ id, token }) => {
  try {
    const deleted = await api.delete(`${ENDPOINT.LINK}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
export {
  getAllAccounts,
  getSelectedAccount,
  createProfileAccount,
  registerAuth,
  loginAuth,
  getSelectedUserById,
  getSelectedAccountByID,
  getLinksByAccountId,
  createLink,
  deleteLink,
  getLinksById,
  updateLink,
  updateAccount,
};
