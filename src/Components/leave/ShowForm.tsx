import { useFormik } from "formik";

import { observer } from "mobx-react-lite";
import FormStore from "./formstore";
import styles from "./ShowForm.module.css";
import *as Yup from "yup"
import { SupabaseClient } from "../../Helper/Supabase";

const ShowForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
    validationSchema:Yup.object({
      name:Yup.string().required("Name is required"),
      startDate:Yup.string().required("Start Date is required"),
      endDate:Yup.string().required("End Date is required"),
      reason:Yup.string().required("Reason is requried"),
    }),
    onSubmit: async(values) => {
      console.log(values);
     
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <span>Personal information </span>
        <button type="button" onClick={() => FormStore.handleFormCancel()} className={styles.cancelBtn}>
          cancel
        </button>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter the name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></input>
        {formik.touched.name && formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}
        <label htmlFor="startDate">startDate</label>
        <input
          id="startDate"
          name="startDate"
          type="datetime-local"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></input>
         {formik.touched.startDate && formik.errors.startDate && <div  className={styles.error}>{formik.errors.startDate}</div>}
        <label htmlFor="endDate">endDate</label>
        <input
          id="endDate"
          name="endDate"
          type="datetime-local"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></input>
         {formik.touched.endDate && formik.errors.endDate && <div  className={styles.error}>{formik.errors.endDate}</div>}
        <label htmlFor="reason">reason</label>
        <input
          id="reason"
          name="reason"
          type="text"
          placeholder="Enter your reason"
          value={formik.values.reason}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></input>
          {formik.touched.reason && formik.errors.reason && <div  className={styles.error}>{formik.errors.reason}</div>}
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </div>
    </form>
  );
};

export default observer(ShowForm);
