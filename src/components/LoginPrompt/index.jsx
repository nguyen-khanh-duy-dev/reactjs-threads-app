import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

function LoginPrompt() {
  const { t } = useTranslation("home");

  return (
    <Card className="bg-muted/50 sticky top-15 mx-3 mt-15 w-full max-w-sm gap-1 rounded-3xl border p-4 py-5 shadow">
      {/* Tiêu đề chính */}
      <CardHeader className="text-center">
        <CardTitle className="py-3 text-xl font-bold">
          {t("loginPrompt.loginOrSignUp")}
        </CardTitle>
      </CardHeader>

      {/* Nội dung */}
      <CardContent className="flex flex-col items-center gap-5 text-center text-sm">
        {/* Mô tả */}
        <p className="text-muted-foreground">
          {t("loginPrompt.seeWhatPeopleAreTalkingAboutAndJoinTheConversation.")}
        </p>

        <Button
          asChild
          className="bg-primary text-primary-foreground w-full cursor-pointer rounded-lg py-6 text-base font-semibold"
        >
          <NavLink to={"login"}>{t("loginPrompt.loginToSeeMore")}</NavLink>
        </Button>

        {/* Link đăng nhập khác */}
        <div className="text-muted-foreground text-sm font-medium text-nowrap">
          {t("loginPrompt.don'tHaveAnAccount?")}
          <NavLink to={"register"} className="px-1 active:opacity-80">
            {t("loginPrompt.SignUpNow")}
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginPrompt;
