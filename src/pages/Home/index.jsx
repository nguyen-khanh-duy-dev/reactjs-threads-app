import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook"; // Import hook
import { Loader2 } from "lucide-react";

import LoginPrompt from "@/components/LoginPrompt";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import CreatePostTrigger from "@/components/CreatePostTrigger";
import { useCurrentUser } from "@/features/auth";
import { useGetPostsQuery } from "@/features/posts";

function Home() {
  const currentUser = useCurrentUser();

  // state page tại đây
  const [page, setPage] = useState(1);

  //Gọi API với page hiện tại
  const { data, isFetching, isError } = useGetPostsQuery({
    userId: currentUser?.id,
    page: page,
  });



  //Trích xuất dữ liệu từ cấu trúc mới { posts, pagination }
  const posts = data?.posts || [];
  const pagination = data?.pagination;

  console.log(posts);
  

  // 4. Tính toán xem còn trang sau không
  const hasNextPage = pagination
    ? pagination.current_page < pagination.last_page
    : false;

  // 5. Cấu hình Infinite Scroll
  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage: hasNextPage,
    onLoadMore: () => {
      // Khi cuộn xuống đáy -> Tăng page -> RTK Query tự gọi API -> Merge vào list
      setPage((prev) => prev + 1);
    },
    disabled: isError,
    rootMargin: "0px 0px 400px 0px", // Tải trước khi chạm đáy 400px
  });

  const handleReloadPageHome = () => {
    // Khi reload thủ công, reset về trang 1
    setPage(1);
    window.location.reload();
  };

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
          <div className="flex flex-col">
            {posts.map((post) => (
              <PostCard postData={post} key={post.id} />
            ))}
          </div>

          {/* --- LOADING / SENTRY --- */}
          {(isFetching || hasNextPage) && (
            <div
              ref={sentryRef} // Gắn ref vào đây để hook theo dõi
              className="flex w-full justify-center py-6"
            >
              {isFetching && (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang tải thêm...</span>
                </div>
              )}
            </div>
          )}

          {!hasNextPage && posts.length > 0 && (
            <div className="text-muted-foreground py-8 text-center text-sm">
              Bạn đã xem hết tin!
            </div>
          )}
        </div>

        <div className="h-10"></div>
      </div>

      <div>{currentUser ? "" : <LoginPrompt />}</div>
    </div>
  );
}

export default Home;
