import {  useFormik } from "formik"

import { observer } from "mobx-react-lite"
import FormStore from "./formstore"

const ShowForm = () => {
  const formik=useFormik({
    initialValues:{
      name:FormStore.name,
    
    },
  onSubmit:()=>{ console.log("how are you")}

  })

  return (
     <form onSubmit={formik.handleSubmit}>
      <div>
        <span>Personal information   </span>
        <button type="button" onClick={()=>FormStore.handleFormCancel()}>cancel</button>
      </div>
       <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
       </div>
      {formik.touched.name && formik.errors.name &&<div>{formik.errors.name}</div>}
      </form>
  )
}

export default observer(ShowForm)