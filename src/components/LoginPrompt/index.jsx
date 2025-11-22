import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

function LoginPrompt() {
  return (
    <Card className="bg-muted/50 sticky top-15 w-full max-w-sm gap-1 mt-15 mx-3 rounded-3xl border p-4 py-5 shadow">
      {/* Tiêu đề chính */}
      <CardHeader className="text-center">
        <CardTitle className="py-3 text-xl font-bold">
          Đăng nhập hoặc đăng ký Threads
        </CardTitle>
      </CardHeader>

      {/* Nội dung */}
      <CardContent className="flex flex-col items-center gap-5 text-center text-sm">
        {/* Mô tả */}
        <p className="text-muted-foreground">
          Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
        </p>

        <Button className="bg-primary text-primary-foreground w-full cursor-pointer rounded-lg py-6 text-base font-semibold">
          <NavLink to={"login"}>Đăng nhập để xem thêm</NavLink>
        </Button>

        {/* Link đăng nhập khác */}
        <div className="text-muted-foreground text-sm font-medium text-nowrap">
          Bạn chưa có tài khoản?
          <NavLink to={"register"} className="px-1 active:opacity-80">
            Đăng ký ngay
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginPrompt;
