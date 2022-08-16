import { baseURL, EndPoint } from "./config";
import { IUser } from "../interfaces/IUser";

export class UsersAPI {
  static async getAll(): Promise<IUser[]> {
    const response = await fetch(baseURL + EndPoint.USERS);
    return await response.json();
  }

  static async add(email: string, name: string): Promise<IUser> {
    const response = await fetch(baseURL + EndPoint.USERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });
    return await response.json();
  }

  static async update(body: IUser): Promise<void> {
    await fetch(baseURL + EndPoint.USERS + body.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static async delete(id: string): Promise<void> {
    await fetch(baseURL + EndPoint.USERS + id, {
      method: "DELETE",
    });
  }
}
