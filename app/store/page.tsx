import type { Metadata } from "next";
import { Zone } from "@/components/ui/Zone";

export const metadata: Metadata = {
  title: "Store",
  description: "Prints, objects, and releases — coming soon.",
};

export default function StorePage() {
  return (
    <div className="container stub-page">
      <Zone index={1}>
        <span className="stub-page__label">Store</span>
        <h1 className="stub-page__title">Coming Soon</h1>
        <p className="stub-page__description">
          Prints, objects, and releases. Check back later.
        </p>
      </Zone>
    </div>
  );
}
