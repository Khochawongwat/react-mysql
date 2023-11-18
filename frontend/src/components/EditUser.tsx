import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";

const EditUser: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            phone: Yup.string().required("Phone is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
        }),
        onSubmit: (values) => {
            if(Object.keys(formik.errors).length > 0){
                throw Error("Submitted while an error is present.")
            }
            handleUpdateItem(values);
        },
    });

    useEffect(() => {
        if (!id) {
            navigate('/');
        }
        fetch(`http://localhost:8081/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.message) {
                        throw Error(data.message);
                    }
                    formik.setValues({
                        name: data[0].name || '',
                        phone: data[0].phone || '',
                        email: data[0].email || '',
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                throw Error(err);
            });
    }, []);

    const handleUpdateItem = (values: FormikValues) => {
        axios
            .put(`http://localhost:8081/users/${id}`, {
                name: values.name,
                phone: values.phone,
                email: values.email,
            })
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="container m-3">
            <h2>Edit User</h2>
            <form onSubmit={formik.handleSubmit}>
                <label className="form-label">Enter name: </label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name="name"
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                )}

                <label className="form-label">Enter phone: </label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    name="phone"
                />
                {formik.touched.phone && formik.errors.phone && (
                    <div className="text-danger">{formik.errors.phone}</div>
                )}

                <label className="form-label">Enter email: </label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email" 
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                )}

                <br />
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </button>
                <button disabled= {Object.keys(formik.errors).length > 0} type="submit" className="btn btn-primary">
                    <FontAwesomeIcon icon={faSave} /> Update
                </button>
            </form>
        </div>
    );
};

export default EditUser;