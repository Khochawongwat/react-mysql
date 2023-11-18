import axios from "axios"
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom"
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

const AddUser = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
        },
        validationSchema,
        onSubmit: (values) => {
            handleAddItem(values);
        },
    });

    const handleAddItem = (values: FormikValues) => {
        axios.post("http://localhost:8081/add_user", values)
            .then((response) => {
                formik.resetForm(); // Reset form values after successful submission
                console.log("Response: " + response.data);
            })
            .catch((err) => {
                console.error(err);
                throw Error(err);
            });
    };

    return (
        <div className="container m-3">
            <h2>Add User</h2>
            <Link
                className="btn btn-warning btn-sm"
                to={"/"}
            >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Go to Users
            </Link>
            <form onSubmit={formik.handleSubmit}>
                <label className="form-label">Enter name:</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                )}

                <label className="form-label">Enter phone:</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Phone"
                    {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                    <div className="text-danger">{formik.errors.phone}</div>
                )}

                <label className="form-label">Enter email:</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                )}

                <br />
                <button className="btn btn-primary" type="submit">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUser;