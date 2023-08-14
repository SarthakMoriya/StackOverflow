import * as Yup from "yup";

export const changePasswordSchema = Yup.object({
  curr_password: Yup.string()
    .min(4)
    .required("Please enter your current password"),
  new_password: Yup.string()
    .min(4)
    .required("Please enter your current password"),
  confirm_new_password: Yup.string()
    .min(4)
    .required("Please enter your current password"),
});
