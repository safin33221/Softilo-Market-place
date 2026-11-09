import React from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { CommissionCalculator } from "@/components/landing/CommissionCalculator";
import { FraudProtectionSection } from "@/components/landing/FraudProtectionSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaBanner } from "@/components/landing/CtaBanner";

export default function SellerLandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeatureGrid />
      <CommissionCalculator />
      <FraudProtectionSection />
      <FaqSection />
      <CtaBanner />
    </div>
  );
}
