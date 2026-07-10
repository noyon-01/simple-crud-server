import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addNewUser = async (formData) => {
  "use server";

  const newUser = Object.fromEntries(formData.entries());
  const res = await fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const data = await res.json();
  console.log("client:", data);

  // Note: Revalided path - insertedId
  if (data.insertedId) {
    revalidatePath("/user");
  }
  return data;
};

export const updateUserById = async (userId, formData) => {
  "use server";

  const updateUser = Object.fromEntries(formData.entries());
  const res = await fetch(`http://localhost:8000/users/${userId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updateUser),
  });
  const data = await res.json();

  console.log("client:", data);

  //Note: Revalided path - modifiedCount
  if (data.modifiedCount > 0) {
    revalidatePath("/users");
    redirect("/users");
  }

  return data;
};

export const deleteUserById = async (userId) => {
  "use server";

  const res = await fetch(`http://localhost:8000/users/${userId}`, {
    method: "DELETE",
  });
  const data = await res.json();

  // Note: Revalided path - deletedCount
  if (data.deletedCount > 0) {
    revalidatePath("/users");
  }
  return data;
};
