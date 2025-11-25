import LoginPrompt from "@/components/LoginPrompt";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { useCurrentUser } from "@/features/auth";
import { useGetPostsQuery } from "@/features/posts";

function Home() {
  const currentUser = useCurrentUser();
  const { data, isLoading } = useGetPostsQuery();
  const handleReloadPageHome = () => {
    console.log("reload");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[640px]">
        <div className="bg-background/95 sticky top-0 z-10 backdrop-blur">
          <PageHeader currentPage="home" handleReload={handleReloadPageHome} />
        </div>

        <div className="overflow-hidden rounded-3xl border shadow">
          {data.map((post) => (
            <PostCard postData={post} key={post.id} />
          ))}
        </div>
      </div>
      <div>{currentUser ? "" : <LoginPrompt />}</div>
    </div>
  );
}

export default Home;
