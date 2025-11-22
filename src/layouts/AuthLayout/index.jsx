import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    // Container bao ngoài cùng
    <div className="bg-background relative min-h-screen w-full">
      {/* ---BACKGROUND tách riêng --- */}

      <div
        className="absolute -top-15 left-0 z-0 h-[500px] w-full"
        style={{
          backgroundImage: `url(https://static.cdninstagram.com/rsrc.php/yC/r/JlaY6JCPfe-.avif)`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom center",
        }}
      />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        {/* Form login/ register */}
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
      {/* Footer  */}
      <div className="text-muted-foreground absolute bottom-5 left-[50%] mt-6 translate-x-[-50%] text-center text-xs">
        © {new Date().getFullYear()} Điều khoản của Threads.
      </div>
    </div>
  );
}

export default AuthLayout;
