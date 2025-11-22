import LoginPrompt from "@/components/LoginPrompt";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { http } from "@/utils/http";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    async () => {
      const posts = await http.get("/api/posts/feed");
      console.log(posts);
    };
  }, []);

  const handleReloadPageHome = () => {
    console.log("reload");
  };

  return (
    // 1. Xóa 'border' khỏi đây. 'DefaultLayout' đã xử lý 'border-x'.
    <div className="flex">
      <div className="w-full max-w-[640px]">
        <div className="bg-background/95 sticky top-0 z-10 backdrop-blur">
          <PageHeader currentPage="home" handleReload={handleReloadPageHome} />
        </div>

        <div className="overflow-hidden rounded-3xl border shadow">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          {/* ... (Nội dung cuộn) ... */}
        </div>
      </div>
      <div>
        <LoginPrompt />
      </div>
    </div>
  );
}

export default Home;
