import { useFormik } from "formik";
import *as Yup from "yup"
import styles from "./Signup.module.css";
import { SupabaseClient } from "../../Helper/Supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SignUp = () => {
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password:"",
    },
    validationSchema:Yup.object({
     name:Yup.string().min(3 ,"Name must be at least 3 character").required("Name is required"),
     email:Yup.string().email("Invalid email format (example:- test@gmail.com)").required("Email is required"),
     password:Yup.string().min(6,"Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data, error } = await SupabaseClient.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Signup successful! Check your email.");
          setTimeout(()=>{
            navigate("/login");
          },1500)
        }
      } catch (err) {
        console.error(err);
        toast.error("something went wrong");
      }
    },
  });
  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h2 className={styles.title}>SignUp</h2>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        ></input>
        {formik.touched.name && formik.errors.name && (<div className={styles.error}>{formik.errors.name}</div>)}
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        ></input>
         {formik.touched.email && formik.errors.email && (<div className={styles.error}>{formik.errors.email}</div>)}
        <label htmlFor="password"  className={styles.label}>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className={styles.input}
          onBlur={formik.handleBlur}
        ></input>
        {formik.touched.password && formik.errors.password && (<div className={styles.error}>{formik.errors.password}</div>)}

        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
