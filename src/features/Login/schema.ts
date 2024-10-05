import { object, string } from "yup";

export const loginSchema = object({
  username: string().required("É obrigatório inserir um e-mail!"),
  password: string()
    .required("É obrigatório inserir uma senha válida!")
    .min(8, "A senha deve conter mais de 8 caracteres."),
});
