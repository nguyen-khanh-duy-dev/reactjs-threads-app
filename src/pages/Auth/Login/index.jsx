import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Logic & Services
import * as authService from "@/services/auth";
import { useCurrentUser } from "@/features/auth";
import { getCurrentUser } from "@/services/auth/authServices";

// Schema validation cho Login (Giữ nguyên từ Code 2)
const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Vui lòng nhập tên người dùng, email hoặc số điện thoại"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const inputClasses =
  "bg-muted/60 py-6 border-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0";

function Login() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Lấy trạng thái user hiện tại từ Redux (Logic Code 1)
  const currentUser = useCurrentUser();

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "nguyenduyyy003@gmail.com", // Có thể giữ default value để test nhanh như Code 1 hoặc để rỗng
      password: "Duy@12345678",
    },
  });

  // Effect: Tự động chuyển trang nếu đã đăng nhập
  useEffect(() => {
    if (currentUser) {
      const continuePath = params.get("continue") || "/";
      navigate(continuePath);
    }
  }, [currentUser, navigate, params]);

  const onSubmit = async (values) => {
    try {
      const loginData = {
        login: values.username, // Giả sử API nhận field là email, ta gán username vào
        password: values.password,
      };

      const { access_token, refresh_token } =
        await authService.login(loginData);

      if (access_token) {
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);

        // Dispatch action để cập nhật state trong Redux
        await dispatch(getCurrentUser());

        // Không cần navigate ở đây vì useEffect phía trên sẽ tự bắt được sự thay đổi của currentUser
      }
    } catch (error) {
      console.log(error);
      // Bonus: Hiển thị lỗi lên form nếu đăng nhập sai
      form.setError("root", {
        type: "manual",
        message: "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
      });
    }
  };

  return (
    // Giao diện giữ nguyên từ Code 2
    <div className="bg-background flex w-full flex-col items-center gap-4 rounded-lg border-none p-8 pt-10">
      <h2 className="text-center text-lg font-semibold">
        {t(`login.loginWithYourAccount`)}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          {/* Field Username/Email */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("login.usernamePhoneNumberOrEmail")}
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("auth.password")}
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hiển thị lỗi chung nếu login thất bại */}
          {form.formState.errors.root && (
            <div className="text-center text-sm text-red-500">
              {form.formState.errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer py-5"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Loading..." : t("auth.logIn")}
          </Button>
        </form>
      </Form>

      <Button
        variant="link"
        size="sm"
        className="text-primary px-0 text-sm font-normal opacity-80 hover:cursor-pointer hover:no-underline active:opacity-60"
      >
        {t("login.forgotYourPassword?")}
      </Button>

      <div className="flex w-full items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs font-semibold uppercase">
          {t("auth.or")}
        </span>
        <Separator className="flex-1" />
      </div>

      <div className="text-center text-sm">
        {t("login.don'tHaveAnAccount?")}{" "}
        <Button
          variant="link"
          asChild
          className="text-primary p-0 font-semibold hover:cursor-pointer hover:no-underline active:opacity-70"
        >
          <Link to="/register"> {t("auth.register")}</Link>
        </Button>
      </div>
    </div>
  );
}

export default Login;
