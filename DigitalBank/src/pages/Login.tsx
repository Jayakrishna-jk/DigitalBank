import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
// import { loginSuccess } from "../../features/authSlice";


const LoginForm = () => {
//   const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string().required("Password Required")
    .min(8, 'Password must be at least 8 characters')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password must contain at least one special character')
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/users?email=${values.email}`
      );
      const user = res.data[0];

      if (!user || user.password !== values.password) {
        // setErrors({ email: "Invalid credentials" });
        toast.error("Invalid credentials");

        return;
      }

      // if (user.role === "user" && user.isFrozen) {
      //   setErrors({ email: "Account is frozen. Contact admin." });
      //   return;
      // }

      const username = user.email.split("@");
    //   dispatch(loginSuccess({ role: user.role, user, username: username[0] }));
      toast.success("Login successful!");
      // dispatch(setAccountData({ balance: user.balance, transactions: user.transactions }));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);
      navigate(user.role === "admin" ? "/home" : "/dashboard");
    } catch (error) {
      console.error(error);
      setErrors({ email: "Login failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 font-sans">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
         Login DigitalBank
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-center">
              <Button type="submit" label="LogIn" disabled={isSubmitting} />
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
