import IUserData from "../types";

// Return all users from API
export const getAllUsers = async function (token:string,eleman:number) {
  console.log(eleman)
  const response = await fetch(
    `https://gorest.co.in/public/v2/users?per_page=${eleman}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

// Return add user from API
export const addUsers = async function (user: IUserData,token:string) {
   const body = JSON.stringify(user);
  const response = await fetch("https://gorest.co.in/public/v2/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  return response.json();
};
// Return delete user from API
export const deleteUser = async function (id:string | number,token:string ,eleman:number) {
   console.log(id)
  const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  getAllUsers(token, eleman);

};

// Return all user by id from API
export const getOneUser = async function (id: string,token:string) {
  const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Put changed user`s data to API
export const putUser = async (user: IUserData, token: string) => {
  const url = `https://gorest.co.in/public/v2/users/${user.id}`;
  const body = JSON.stringify(user);
  console.log(user)
  const settings = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  };
  try {
    const fetchResponse = await fetch(url, settings);
    if (fetchResponse.status === 401) {
      return { message: "Authantication failed.", ok: fetchResponse.ok };
    }
    if (fetchResponse.status === 422) {
      return { message: "Enter correct data.", ok: fetchResponse.ok };
    }
    if (!fetchResponse.ok) {
      return { message: "Somethings went wrong.", ok: fetchResponse.ok };
    }
    const data: IUserData = await fetchResponse.json();
    return { message: data, ok: fetchResponse.ok };
  } catch (e: any) {
    throw new Error(e);
  }
};
