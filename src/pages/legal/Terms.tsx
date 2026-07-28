import LegalPageView from "@/components/legal/LegalPageView";
import { ROUTES } from "@/lib/routes";

export default function Terms() {
  return <LegalPageView pageKey="terms" route={ROUTES.terms} />;
}
