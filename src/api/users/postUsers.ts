import api from "../axios";
import type { CreateUserInterface } from "@/interface/users/createUsersInterface";

export const postUsers = async (data: CreateUserInterface ) => {
  try {
    const response = await api.post("/user", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
