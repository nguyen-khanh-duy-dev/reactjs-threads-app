import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/utils/baseQuery";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: axiosBaseQuery(),
  //tag "Followings" để quản lý cache danh sách theo dõi
  tagTypes: ["Posts", "Followings"],

  endpoints: (builder) => ({
    getPosts: builder.query({
      // 1. Nhận vào object chứa userId và page
      // eslint-disable-next-line no-unused-vars
      query: ({ userId, page = 1 }) => ({
        url: `/api/posts/feed`,
        method: "get",
        params: {
          type: "for_you",
          page: page, // Gửi page lên server
        },
      }),

      // 2. Transform: Trả về cấu trúc { posts, pagination } để tiện xử lý
      transformResponse: (response) => {
        return {
          posts: response.data || [],
          pagination: response.pagination, // Giữ lại thông tin phân trang
        };
      },

      // 3. Serialize: Chỉ tạo cache key dựa trên userId (hoặc 'guest').
      // Thay đổi 'page' sẽ KHÔNG tạo cache mới mà dùng chung cache này.
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}(${queryArgs.userId ?? "guest"})`;
      },

      // 4. Merge: Khi có dữ liệu mới (trang tiếp theo), nối nó vào mảng cũ
      merge: (currentCache, newItems) => {
        if (newItems.pagination.current_page === 1) {
          // Nếu là trang 1 (ví dụ reload), thay thế hoàn toàn
          currentCache.posts = newItems.posts;
          currentCache.pagination = newItems.pagination;
        } else {
          // Nếu là trang 2, 3... thì nối thêm vào
          currentCache.posts.push(...newItems.posts);
          currentCache.pagination = newItems.pagination;
        }
      },

      // 5. Force Refetch: Chỉ gọi lại API nếu page thay đổi
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },

      providesTags: (result) =>
        result?.posts
          ? [
              ...result.posts.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    // query like post
    likePost: builder.mutation({
      query: ({ postId }) => ({
        url: `/api/posts/${postId}/like`,
        method: "post",
      }),
      onQueryStarted: async (
        { postId, userId },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getPosts", userId, (draft) => {
            const post = draft.find((p) => p.id === postId);
            if (post) {
              if (post.is_liked_by_auth) {
                post.is_liked_by_auth = false;
                post.likes_count--;
              } else {
                post.is_liked_by_auth = true;
                post.likes_count++;
              }
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    //  lấy danh sách những người mình đang theo dõi
    getUserFollowings: builder.query({
      query: (userId) => ({
        url: `/api/users/${userId}/followings`,
        method: "get",
      }),
      // API thường trả về { data: [...] } hoặc [...]
      transformResponse: (response) => {
        // Đảm bảo luôn trả về mảng
        return Array.isArray(response) ? response : response.data || [];
      },
      // Gắn nhãn Followings để biết khi nào cần load lại
      providesTags: ["Followings"],
    }),

    //  Cập nhật followUser
    followUser: builder.mutation({
      query: ({ targetUserId, action }) => {
        const url = `/api/users/${targetUserId}/follow`;
        if (action === "unfollow") {
          return {
            url: url,
            method: "post",
            data: { _method: "DELETE" },
          };
        }
        return { url: url, method: "post" };
      },

      // Khi follow/unfollow thành công -> Báo tag 'Followings' đã cũ
      // RTK Query sẽ tự động gọi lại getUserFollowings để lấy danh sách mới nhất
      invalidatesTags: ["Followings"],

      //logic Optimistic Update cho Feed (getPosts) để trải nghiệm mượt mà
      onQueryStarted: async (
        { targetUserId, action, currentUserId },
        { dispatch, queryFulfilled },
      ) => {
        const isFollowing = action === "follow";
        // Cập nhật Feed (Optional: Nếu bạn muốn feed update ngay cả khi list đang load lại)
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getPosts", currentUserId, (draft) => {
            draft.forEach((post) => {
              if (post.user && post.user.id === targetUserId) {
                post.user.is_followed_by_auth = isFollowing;
              }
            });
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
  refetchOnReconnect: true,
});

export const {
  useGetPostsQuery,
  useLikePostMutation,
  useFollowUserMutation,
  useGetUserFollowingsQuery,
} = postsApi;
