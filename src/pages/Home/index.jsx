import PostCard from "@/components/PostCard";

function Home() {
  return (
    <div className="flex justify-center">
      {/* ĐÂY LÀ CHÌA KHÓA:
        Container này giới hạn chiều rộng của cột feed.
        'max-w-[640px]' (tương đương w-160) là một lựa chọn tốt.
      */}
      <div className="w-full max-w-[640px]">
        {/* Tất cả PostCard (w-full) sẽ lấp đầy container 640px này */}
        <PostCard />
        <PostCard />
        {/* ... */}
      </div>
    </div>
  );
}

export default Home;
