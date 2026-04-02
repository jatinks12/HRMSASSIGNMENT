import { useFormik } from "formik";

import { observer } from "mobx-react-lite";
import FormStore from "./formstore";
import styles from "./ShowForm.module.css";
import * as Yup from "yup";
import { SupabaseClient } from "../../Helper/Supabase";
import toast from "react-hot-toast";
import { useState } from "react";

const ShowForm = ({ showAdminPage }: any) => {
  const [showDetail, setShowDetail] = useState(false);
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      Email: "",
      role: "",
      department: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      Email: Yup.string().email("Invalid format(example = test@gmail.com)"),
      role: Yup.string().required("role is required"),
      department: Yup.string().required("department is required"),
      startDate: Yup.string().required("Start Date is required"),
      endDate: Yup.string().required("End Date is required"),
      reason: Yup.string().required("Reason is requried"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const { data, error } = await SupabaseClient.from("Employee").select("*");
      let file = [];
      if (data) {
        file = data.filter(
          (item) =>
            values.name.toUpperCase() === item.Name &&
            values.Email.toUpperCase() === item.Email &&
            values.department === item.department &&
            values.role === item.role,
        );
      }
      if (file.length > 0) {
        const { error } = await SupabaseClient.from("Employee")
          .update({
            Reason: values.reason,
            startDate: values.startDate,
            EndDate: values.endDate,
            Pending: true,
          })
          .eq("id", file[0].id);
        if (!error) {
          toast.success("leave is applied");
        }
        const { data } = await SupabaseClient.from("Employee")
          .select("*")
          .eq("id", file[0].id);
        if (data) {
          setEmployeeData(data);
          setShowDetail(true);
        }
      } else if(data) {
        toast.error("Invalid Employee credentials ");
        (data.filter(
          (item) =>console.log(values.name.toUpperCase() === item.Name ,
            values.Email.toUpperCase() === item.Email ,
            values.department === item.department ,
            values.role === item.role, )
            
        ))
      }
      formik.resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.header}>
          <span>Personal information </span>
          {showAdminPage && (
            <button
              type="button"
              onClick={() => FormStore.handleFormCancel()}
              className={styles.cancelBtn}
            >
              cancel
            </button>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter the name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          {formik.touched.name && formik.errors.name && (
            <div className={styles.error}>{formik.errors.name}</div>
          )}

          <label htmlFor="Email">Email</label>
          <input
            id="Email"
            name="Email"
            type="Email"
            placeholder="Enter the Email"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          {formik.touched.Email && formik.errors.Email && (
            <div className={styles.error}>{formik.errors.Email}</div>
          )}

          <label htmlFor="department">Enter Your Department</label>

          <select
            id="department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select department</option>
            <option value="techOps">techOps</option>
            <option value="NetInfa">NetInfa</option>
            <option value="AppDev">AppDev</option>
            <option value="DevOps">DevOps</option>
            <option value="CloudSVc">CloudSVc</option>
            <option value="ITStrac">ITStrac</option>
            <option value="DigSol">DigSol</option>
            <option value="CSE">CSE</option>
            <option value="DataLab">DataLab</option>
          </select>

          {formik.touched.department && formik.errors.department && (
            <div className={styles.error}>{formik.errors.department}</div>
          )}

          <label htmlFor="role">Enter your Role</label>

          <select
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select role</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Full Stack">Full Stack</option>
            <option value="DevOps">DevOps</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Technical supporter">Technical suppoter</option>
            <option value="Business analyst">Business analyst</option>
            <option value="Frontend developer">Frontend developer</option>
            <option value="UI designer">UI designer</option>
          </select>

          {formik.touched.role && formik.errors.role && (
            <div className={styles.error}>{formik.errors.role}</div>
          )}

          <label htmlFor="startDate">startDate</label>
          <input
            id="startDate"
            name="startDate"
            type="datetime-local"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          {formik.touched.startDate && formik.errors.startDate && (
            <div className={styles.error}>{formik.errors.startDate}</div>
          )}
          <label htmlFor="endDate">endDate</label>
          <input
            id="endDate"
            name="endDate"
            type="datetime-local"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          {formik.touched.endDate && formik.errors.endDate && (
            <div className={styles.error}>{formik.errors.endDate}</div>
          )}
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
          {formik.touched.reason && formik.errors.reason && (
            <div className={styles.error}>{formik.errors.reason}</div>
          )}
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </div>
      </form>
      {showDetail && employeeData.length > 0 && (
        <div className={styles.resultBox}>
          <h3>Employee Details</h3>

          {employeeData.map((emp) => (
            <div key={emp.id} className={styles.card}>
              <p>
                <strong>Name:</strong> {emp.Name}
              </p>
              <p>
                <strong>Email:</strong> {emp.Email}
              </p>
              <p>
                <strong>Department:</strong> {emp.department}
              </p>
              <p>
                <strong>Role:</strong> {emp.role}
              </p>
              <p>
                <strong>Reason:</strong> {emp.Reason}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(emp.startDate).toLocaleDateString()}{" "}
                {new Date(emp.startDate).toLocaleTimeString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(emp.EndDate).toLocaleDateString()}{" "}
                {new Date(emp.EndDate).toLocaleTimeString()}
              </p>
              <p>
                <strong>Status:</strong> {emp.Pending ? "Pending" : "Approved"}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default observer(ShowForm);
