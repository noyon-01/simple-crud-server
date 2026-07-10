import { updateUserById } from "@/lib/actions";
import { getUserById } from "@/lib/getData";
import { Button, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";

export default async function UpdateUser({ params }) {
  const { userId } = await params;
  const user = await getUserById(userId);

  const updateUserRapper = async (formData) => {
    "use server";

    await updateUserById(userId, formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="my-5 text-3xl font-bold">
        Update User Page : {user.name}
      </h1>

      <div>
        <form action={updateUserRapper} className="flex flex-col gap-4">
          <TextField
            className="w-full"
            name="name"
            type="text"
            variant="secondary"
            defaultValue={user.name}
          >
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
          </TextField>
          <TextField
            className="w-full"
            name="email"
            type="email"
            variant="secondary"
            defaultValue={user.email}
          >
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
          </TextField>
          <TextField
            className="w-full"
            name="role"
            type="text"
            variant="secondary"
            defaultValue={user.role}
          >
            <Label>Role</Label>
            <Input placeholder="Enter your phone number" />
          </TextField>
          <div className="flex">
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button type="submit" slot="close">
              Submit
            </Button>
          </div>
        </form>
      </div>

      <Link href={"/users"}>
        <Button className={"rounded-xl mt-5"}>Back To Users Page</Button>
      </Link>
    </div>
  );
}
