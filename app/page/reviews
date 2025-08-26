"use client";
import { useSearchParams } from "next/navigation";
import ReviewCard from "@/components/ReviewCard";
import reviews from "@/data/reviews.json";

export default function ReviewsPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = 12;
  const totalPages = Math.ceil(reviews.length / perPage);
  const start = (page - 1) * perPage;
  const items = reviews.slice(start, start + perPage);

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-2xl font-bold">Customer Reviews</h1>

      <div className="review-grid" style={{ marginTop: 12 }}>
        {items.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {page > 1 && (
          <a className="btn" href={`?page=${page - 1}`}>
            Prev
          </a>
        )}
        <span>
          Page {page} / {totalPages}
        </span>
        {page < totalPages && (
          <a className="btn" href={`?page=${page + 1}`}>
            Next
          </a>
        )}
      </div>
    </div>
  );
}
