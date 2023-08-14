import React from "react";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../schemas";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePassword } from "../../actions/auth";

const EditAccount = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const initialValues = {
    curr_password: "",
    new_password: "",
    confirm_new_password: "",
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: changePasswordSchema,
      onSubmit: async (values) => {
        // console.log({ id, ...values });
        dispatch(updatePassword({ id, ...values }));
      },
    });

  return (
    <div
      className="mt-[4rem] flex items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="">Change Password</div>
        <form className="flex flex-col h-screen border p-4 items-center ">
          <label htmlFor="curr-pass">Current Password</label>
          <input
            type="password"
            id="curr-pass"
            placeholder="current password"
            name="curr_password"
            value={values.curr_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.curr_password && touched.curr_password ? (
            <p>{errors.curr_password}</p>
          ) : null}
          <label htmlFor="new-pass">New Password</label>
          <input
            type="password"
            id="new-pass"
            placeholder="new password"
            name="new_password"
            value={values.new_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.new_password && touched.new_password ? (
            <p>{errors.new_password}</p>
          ) : null}
          <label htmlFor="conf-newcurr-pass">Confirm New Password</label>
          <input
            type="password"
            id="conf-new-pass"
            name="confirm_new_password"
            placeholder="confirm new password"
            value={values.confirm_new_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirm_new_password && touched.confirm_new_password ? (
            <p>{errors.confirm_new_password}</p>
          ) : null}
          <input
            type="submit"
            name="password_confirm"
            value="submit"
            className="border border-amber-500 p-2 my-1"
          />
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
