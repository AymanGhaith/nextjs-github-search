import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
}

export default function InfiniteScroll({
  loadMore,
  hasMore,
}: InfiniteScrollProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore, hasMore]);

  return <div ref={observerTarget} className="h-10" />;
}
