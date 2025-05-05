"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function createUserAction(
  formState: { message: string },
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    let password = formData.get("password") as string;
    const email = formData.get("email") as string;
    if (!name || !username || !password || !email) {
      return { message: "All fields are required" };
    }

    const duplicate = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (duplicate) {
      return { message: "That username already exists." };
    }

    if (password.length < 5) {
      return { message: "Password is too short." };
    }

    password = await bcrypt.hash(password, 10);

    await prisma.user.create({ data: { name, username,email, password } });
  } catch (err: unknown) {
    return {
      message: "Unknown Error Occured!",
    };
  }
  redirect("/");
}
