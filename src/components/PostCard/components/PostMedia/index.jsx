import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// --- COMPONENT CON SỐ 1: Hiển thị 1 ảnh ---
function SingleImage({ mediaItem }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      {/* TỶ LỆ LỚN: 1 ảnh/video sẽ dùng tỷ lệ 16/9 (widescreen)
       */}
      <AspectRatio ratio={16 / 9}>
        <img
          src={mediaItem.url}
          alt="Nội dung bài đăng"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}

// --- COMPONENT CON SỐ 2: Hiển thị 1 video ---
function VideoPlayer({ mediaItem }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      {/* TỶ LỆ LỚN: 1 ảnh/video sẽ dùng tỷ lệ 16/9 */}
      <AspectRatio ratio={16 / 9}>
        <video
          controls
          src={mediaItem.url}
          poster={mediaItem.thumbnailUrl}
          className="bg-muted h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}

// --- COMPONENT CON SỐ 3: Hiển thị Audio (Tỷ lệ tự do) ---
function AudioPreview({ mediaItem }) {
  // ... (Không thay đổi, giữ nguyên)
  return (
    <div className="bg-card text-card-foreground hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 shadow-sm transition-colors">
      <img
        src={mediaItem.thumbnailUrl}
        alt={mediaItem.title}
        className="h-14 w-14 rounded-md object-cover"
      />
      <div className="flex flex-col text-left">
        <span className="line-clamp-1 font-semibold">{mediaItem.title}</span>
        <span className="text-muted-foreground text-sm">
          {mediaItem.source}
        </span>
      </div>
    </div>
  );
}

// --- COMPONENT CON SỐ 4: Carousel (Cho nhiều ảnh/video) ---
function MediaCarousel({ media }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Carousel
        className="w-full"
        opts={{
          loop: false, // Tắt lặp vô hạn
        }}
      >
        <CarouselContent>
          {media.map((item, index) => (
            <CarouselItem key={index}>
              {/* TỶ LỆ NHỎ: Nhiều ảnh/video sẽ dùng tỷ lệ 1/1 (vuông)
               */}
              <AspectRatio ratio={1 / 1}>
                {item.type === "image" && (
                  <img
                    src={item.url}
                    alt={`Nội dung ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                )}
                {item.type === "video" && (
                  <video
                    controls
                    src={item.url}
                    poster={item.thumbnailUrl}
                    className="bg-muted h-full w-full object-cover"
                  />
                )}
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 hidden md:flex" />
        <CarouselNext className="absolute right-2 hidden md:flex" />
      </Carousel>
    </div>
  );
}

// --- COMPONENT CHÍNH ---
// (Logic bên trong không thay đổi, vì nó đã gọi đúng component)
function PostMedia({ media }) {
  if (!media || media.length === 0) {
    return null;
  }

  const mediaCount = media.length;
  const firstItem = media[0];
  const type = firstItem.type;

  if (type === "audio") {
    return <AudioPreview mediaItem={firstItem} />;
  }

  if (type === "image" || type === "video") {
    if (mediaCount === 1) {
      if (type === "image") {
        return <SingleImage mediaItem={firstItem} />;
      }
      if (type === "video") {
        return <VideoPlayer mediaItem={firstItem} />;
      }
    } else {
      return <MediaCarousel media={media} />;
    }
  }

  return null;
}

export default PostMedia;
