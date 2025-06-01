import DashboardBookings from "./DashboardBookings";
import HeroSection from "./HeroSection";

import Footer from "@/components/Footer";
import { FeedbackRatings } from "./feedbacks";
import { SupportNotifications } from "./SupportNotifications";
import { EarningsSection } from "./EarningsSection";

export default function HomeLogged() {
  return (
    <>
      <HeroSection />
      <DashboardBookings />
      <EarningsSection />
      <SupportNotifications />
      <FeedbackRatings />
      {/* here transaction section come, after the api integration it come show recent transaction  */}
      <Footer />
    </>
  );
}
