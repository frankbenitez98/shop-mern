export interface ProductResponse {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}
export type AuthStatus = "checking" | "authenticated" | "not-authenticated";

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface SmallProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}
