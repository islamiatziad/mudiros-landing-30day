import LegalPageView from "@/components/legal/LegalPageView";
import { ROUTES } from "@/lib/routes";

export default function Cookies() {
  return <LegalPageView pageKey="cookies" route={ROUTES.cookies} />;
}
