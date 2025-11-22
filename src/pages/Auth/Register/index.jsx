import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { Link } from "react-router-dom"; // Dùng để link về trang Đăng nhập
import { useTranslation } from "react-i18next";

// Schema validation mới cho Đăng ký
const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  username: yup.string().required("Vui lòng nhập tên người dùng"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không khớp") // Sửa ở đây, không cần 'null'
    .required("Vui lòng xác nhận mật khẩu"),
});

const inputClasses =
  "bg-muted/60 border-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0";

function Register() {
  const { t } = useTranslation("auth");

  const form = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values) {
    // Xử lý logic đăng ký của bạn ở đây
    console.log("Đăng ký:", values);
  }

  return (
    // Đây là component con, được Outlet render
    <div className="bg-background flex w-full flex-col items-center gap-4 rounded-lg p-8 pt-10">
      <h2 className="text-lg font-semibold">
        {" "}
        {t("register.subscribeToThreads")}
      </h2>
      <p className="text-muted-foreground text-center text-sm">
        {t("register.createAnAccountToSeeWhatPeopleAreSaying.")}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("register.email")}
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("register.userName")}
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("register.confirmPassword")}
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-5 hover:cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {t("auth.register")}
          </Button>
        </form>
      </Form>

      <div className="flex w-full items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs font-semibold uppercase">
          Hoặc
        </span>
        <Separator className="flex-1" />
      </div>

      <div className="text-center text-sm">
        {t("register.doHaveAnAccount?")}{" "}
        <Button
          variant="link"
          asChild
          className="text-primary p-0 font-semibold hover:cursor-pointer hover:no-underline active:opacity-70"
        >
          <Link to="/login">{t("auth.logIn")}</Link>
        </Button>
      </div>
    </div>
  );
}

export default Register;
