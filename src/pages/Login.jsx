import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (result.payload?.token) {
      localStorage.setItem("token", result.payload.token); // ذخیره توکن
      navigate("/books"); // انتقال به صفحه کتاب‌ها
    } else {
      alert("Login failed! Check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" required />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
