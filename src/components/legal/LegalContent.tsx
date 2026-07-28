import { Fragment, type ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Clause, SubHeading, List } from "./Prose";
import { SITE } from "@/lib/site";
import type { LegalPage, Block } from "@/i18n/legalEn";

/** Inline tokens available in copy: **bold**, {email}, {privacy}, {security}, {contact}, {refund}, {whatsapp}, {cookies} */
function renderInline(text: string, keyBase: string): ReactNode[] {
  // Split on **bold** and {tokens} while keeping delimiters.
  const parts = text.split(/(\*\*[^*]+\*\*|\{[a-z]+\})/g).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    switch (part) {
      case "{email}":
        return <a key={key} href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>;
      case "{whatsapp}":
        return <a key={key} href={SITE.whatsapp}>WhatsApp</a>;
      case "{privacy}":
        return <RouterLink key={key} to="/privacy-policy">{tokenLabel(part)}</RouterLink>;
      case "{security}":
        return <RouterLink key={key} to="/security">{tokenLabel(part)}</RouterLink>;
      case "{contact}":
        return <RouterLink key={key} to="/contact">{tokenLabel(part)}</RouterLink>;
      case "{refund}":
        return <RouterLink key={key} to="/refund-policy">{tokenLabel(part)}</RouterLink>;
      case "{cookies}":
        return <RouterLink key={key} to="/cookie-policy">{tokenLabel(part)}</RouterLink>;
      default:
        return <Fragment key={key}>{part}</Fragment>;
    }
  });
}

// Link text is provided by the surrounding sentence in most languages,
// but we also need a readable label. These are localized via the dict below.
let LINK_LABELS: Record<string, string> = {};
export function setLinkLabels(labels: Record<string, string>) {
  LINK_LABELS = labels;
}
function tokenLabel(token: string): string {
  return LINK_LABELS[token] ?? token;
}

function renderBlock(block: Block, i: number): ReactNode {
  if ("p" in block) return <p key={i}>{renderInline(block.p, `p${i}`)}</p>;
  if ("sub" in block) return <SubHeading key={i}>{renderInline(block.sub, `s${i}`)}</SubHeading>;
  if ("list" in block)
    return <List key={i} items={block.list.map((it, j) => <Fragment key={j}>{renderInline(it, `l${i}-${j}`)}</Fragment>)} />;
  return null;
}

/** Renders a full legal page's clauses from structured data. */
export default function LegalContent({ page }: { page: LegalPage }) {
  return (
    <>
      {page.clauses.map((clause, i) => (
        <Clause key={i} n={i + 1} title={clause.title}>
          {clause.blocks.map(renderBlock)}
        </Clause>
      ))}
    </>
  );
}
