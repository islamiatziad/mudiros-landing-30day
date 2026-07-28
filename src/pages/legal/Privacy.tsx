import LegalPageView from "@/components/legal/LegalPageView";
import { ROUTES } from "@/lib/routes";

export default function Privacy() {
  return <LegalPageView pageKey="privacy" route={ROUTES.privacy} />;
}
