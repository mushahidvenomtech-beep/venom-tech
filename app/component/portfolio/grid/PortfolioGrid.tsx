"use client";

import React from "react";
import PortfolioSection from "@/app/component/home/portfolio/PortfolioSection";

export default function PortfolioGrid() {
  return (
    <PortfolioSection
      showCategoryFilters
      showViewAllButton={false}
      maxItems={null}
    />
  );
}
