import LoginPrompt from "@/components/LoginPrompt";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import CreatePostTrigger from "@/components/CreatePostTrigger";
import { useCurrentUser } from "@/features/auth";
import { useGetPostsQuery } from "@/features/posts";

function Home() {
  const currentUser = useCurrentUser();

  const { data, isLoading } = useGetPostsQuery(currentUser?.id, {
    refetchOnMountOrArgChange: true,
  });

  const handleReloadPageHome = () => {
    console.log("reload");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[640px]">
        {/* Header dính */}
        <div className="bg-background/95 sticky top-0 z-10 backdrop-blur">
          <PageHeader currentPage="home" handleReload={handleReloadPageHome} />
        </div>

        <div className="bg-background mt-2 overflow-hidden rounded-t-3xl border shadow md:rounded-3xl">
          {currentUser && <CreatePostTrigger />}

          {/* Danh sách bài viết */}
          {data.map((post) => (
            <PostCard postData={post} key={post.id} />
          ))}
        </div>

        {/* Khoảng trống dưới cùng để không bị che */}
        <div className="h-10"></div>
      </div>

      <div>{currentUser ? "" : <LoginPrompt />}</div>
    </div>
  );
}

export default Home;
