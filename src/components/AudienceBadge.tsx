import { AUDIENCE_LABELS, type PostAudience } from "../data/blog";

const STYLES: Record<PostAudience, string> = {
  businesses: "bg-get-wash text-get-ink dark:bg-get-wash-dark dark:text-get",
  developers: "bg-post-wash text-post-ink dark:bg-post-wash-dark dark:text-post",
  everyone: "bg-accent-faint text-accent-ink",
};

/** Who a post is written for, as a small pill. */
export function AudienceBadge({ audience }: { audience: PostAudience }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[audience]}`}
    >
      {AUDIENCE_LABELS[audience]}
    </span>
  );
}
