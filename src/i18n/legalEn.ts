/**
 * Legal + trust page content, English.
 * Structured as data so pages render identically in both languages.
 * `s` = strong span, rendered bold. Links use {privacy}/{security}/etc tokens.
 */
export type Block =
  | { p: string }
  | { sub: string }
  | { list: string[] };

export type Clause = { title: string; blocks: Block[] };
export type LegalPage = { eyebrow: string; title: string; intro: string; updated?: boolean; clauses: Clause[] };

export const legalEn: Record<string, LegalPage> = {
  cookies: {
    eyebrow: "Legal",
    title: "Cookie Policy",
    intro: "This policy explains what cookies MudirOS uses, what they do, and how you control them.",
    updated: true,
    clauses: [
      { title: "What cookies are", blocks: [
        { p: "Cookies are small text files a website stores on your device. They let a site remember your actions and preferences over time. We also use similar technologies like local storage, and we refer to them all as “cookies” here." },
      ]},
      { title: "How we use cookies", blocks: [
        { p: "We group the cookies we use into three categories:" },
        { list: [
          "**Strictly necessary** — required for the site and app to function, such as keeping you signed in and keeping your session secure. These cannot be switched off.",
          "**Analytics** — help us understand how the site is used so we can improve it, in aggregate and without identifying you personally. These load only with your consent where required.",
          "**Preferences** — remember choices like your language, so your experience stays consistent.",
        ]},
        { p: "We do **not** use advertising cookies, and we do not sell data collected through cookies." },
      ]},
      { title: "Third-party cookies", blocks: [
        { p: "Some cookies are set by trusted providers who help us run the Service — for example, our payment processor during checkout, or our analytics provider. These providers act on our behalf and are bound by contracts that protect your data." },
      ]},
      { title: "Managing cookies", blocks: [
        { list: [
          "Most browsers let you view, block, or delete cookies in their settings.",
          "You can refuse non-essential cookies where we ask for consent.",
          "Blocking strictly necessary cookies may stop parts of the Service from working.",
        ]},
        { p: "For guidance on managing cookies, check your browser’s help pages — the steps differ between Chrome, Safari, Firefox, and Edge." },
      ]},
      { title: "Changes to this policy", blocks: [
        { p: "As we add or change features, the cookies we use may change too. We will update this page and the date above when that happens." },
      ]},
      { title: "Contact", blocks: [
        { p: "Questions about cookies? Email {email}. See also our {privacy}." },
      ]},
    ],
  },

  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "This policy explains what information MudirOS collects, why we collect it, and the choices you have. We keep it in plain language on purpose.",
    updated: true,
    clauses: [
      { title: "Who we are", blocks: [
        { p: "MudirOS provides the AI Business Manager for SMEs in Saudi Arabia and the GCC. In this policy, “MudirOS,” “we,” “us,” and “our” refer to the MudirOS team. “You” refers to anyone who visits our website, requests a trial, or uses the service." },
      ]},
      { title: "Information we collect", blocks: [
        { sub: "Information you give us" },
        { list: [
          "**Trial and account details** — your name, company name, business email, optional phone number, and company size when you request a free trial or create an account.",
          "**Business data you enter** — the sales, inventory, customer, invoice, and financial records you or your team add while using MudirOS.",
          "**Support communications** — messages you send us by email, WhatsApp, or in-product chat.",
        ]},
        { sub: "Information we collect automatically" },
        { list: [
          "**Usage data** — pages visited, features used, and actions taken, so we can improve the product and diagnose problems.",
          "**Device and log data** — IP address, browser type, device type, and timestamps, collected through standard server logs.",
          "**Cookies** — see our {cookies} for the specific cookies we use.",
        ]},
      ]},
      { title: "How we use your information", blocks: [
        { list: [
          "Provide, operate, and maintain the service and your workspace.",
          "Set up and activate your 30-day free trial and any paid subscription.",
          "Process payments and send billing notices, receipts, and renewal reminders.",
          "Respond to your questions and provide customer support.",
          "Send service messages about changes, security, and your account.",
          "Improve features, reliability, and performance through aggregated analytics.",
          "Detect, prevent, and address fraud, abuse, and security issues.",
          "Meet legal, tax, and regulatory obligations.",
        ]},
        { p: "We do **not** sell your personal information, and we do not use the business data inside your workspace to train external AI models." },
      ]},
      { title: "Legal bases for processing", blocks: [
        { p: "Where applicable, we process your information on these bases:" },
        { list: [
          "**Contract** — to deliver the service you signed up for.",
          "**Legitimate interests** — to secure, support, and improve the service.",
          "**Consent** — for optional cookies and marketing, which you can withdraw.",
          "**Legal obligation** — to comply with tax, accounting, and other laws.",
        ]},
      ]},
      { title: "How we share information", blocks: [
        { p: "We share information only in these limited cases:" },
        { list: [
          "**Service providers** — trusted vendors who host our infrastructure, process payments, or send email on our behalf, under contracts that require them to protect your data.",
          "**Legal requirements** — when required by law, regulation, or valid legal process.",
          "**Business transfers** — if MudirOS is involved in a merger, acquisition, or sale of assets, with notice to you.",
          "**With your direction** — when you ask us to connect a third-party tool or share data with someone.",
        ]},
      ]},
      { title: "Data retention", blocks: [
        { p: "We keep your information for as long as your account is active. If you close your account or your trial ends without conversion, we retain your data for a limited period so you can reactivate, then delete or anonymize it, except where we must keep records to meet legal, tax, or accounting obligations. You can request earlier deletion at any time." },
      ]},
      { title: "Security", blocks: [
        { p: "We protect your data with encryption in transit and at rest, access controls, and continuous monitoring. See our {security} for details. No system is perfectly secure, but we work hard to keep your business data safe and to notify you promptly if a breach ever affects you." },
      ]},
      { title: "Your rights and choices", blocks: [
        { list: [
          "Access the personal information we hold about you.",
          "Correct information that is inaccurate or incomplete.",
          "Request deletion of your personal information.",
          "Export your business data in a portable format.",
          "Object to or restrict certain processing.",
          "Withdraw consent for optional cookies or marketing at any time.",
        ]},
        { p: "To exercise any of these, email {email}. We respond within a reasonable timeframe and may need to verify your identity first." },
      ]},
      { title: "International transfers", blocks: [
        { p: "Your data may be processed on servers located outside the Kingdom of Saudi Arabia. When we transfer data across borders, we use appropriate safeguards so it remains protected to the standard described in this policy." },
      ]},
      { title: "Children", blocks: [
        { p: "MudirOS is a business tool and is not directed to anyone under 18. We do not knowingly collect information from children." },
      ]},
      { title: "Changes to this policy", blocks: [
        { p: "We may update this policy as the product and the law evolve. When we make material changes, we will update the date above and, where appropriate, notify you by email or in the product." },
      ]},
      { title: "Contact us", blocks: [
        { p: "Questions about privacy? Email {email} or reach us through our {contact}." },
      ]},
    ],
  },

  refund: {
    eyebrow: "Legal",
    title: "Refund Policy",
    intro: "We want MudirOS to be an easy decision. Here is exactly how trials, billing, and refunds work — no surprises.",
    updated: true,
    clauses: [
      { title: "Try before you pay", blocks: [
        { p: "Every plan starts with a **30-day free trial**, with no credit card required. The trial is designed so you can fully evaluate MudirOS before spending anything. Because of this, most questions about “getting your money back” never come up — you only pay once you have decided the Service is right for you." },
      ]},
      { title: "Monthly subscriptions", blocks: [
        { list: [
          "Paid plans are billed monthly in advance.",
          "Your subscription renews automatically each month until you cancel.",
          "We email a receipt for every payment.",
        ]},
      ]},
      { title: "Cancelling", blocks: [
        { p: "You can cancel anytime from your account settings. When you cancel:" },
        { list: [
          "Your plan stays active until the end of the current billing period.",
          "You are not charged again after that period ends.",
          "You keep the ability to export your data before your access ends.",
        ]},
        { p: "Because access continues to the end of the period you already paid for, we do not provide partial refunds for the unused days of a monthly cycle." },
      ]},
      { title: "When we do issue refunds", blocks: [
        { p: "We will refund a payment in cases such as:" },
        { list: [
          "**Duplicate or accidental charges** — for example, being billed twice for the same period.",
          "**Billing errors on our side** — if we charged the wrong amount, we make it right.",
          "**A charge immediately after your trial that you did not intend** — if you contact us promptly, we will work with you in good faith.",
          "**Extended service failure** — if a problem on our side prevents you from using the Service for a prolonged period and we cannot resolve it.",
        ]},
      ]},
      { title: "How to request a refund", blocks: [
        { p: "Email {email} from the address on your account, or message us on {whatsapp}. Include your account email and a short note on what happened. We review every request individually and aim to respond within a few business days." },
      ]},
      { title: "How refunds are paid", blocks: [
        { p: "Approved refunds are returned to the original payment method. The time it takes to appear depends on your bank or card provider, and is usually a few business days after we process it." },
      ]},
      { title: "Taxes", blocks: [
        { p: "Where a refund applies to a payment that included VAT or other taxes, the refunded amount reflects the tax that was originally charged, in line with applicable regulations." },
      ]},
      { title: "Questions", blocks: [
        { p: "If anything about billing is unclear, ask us before you are charged. Email {email} — we would rather answer a question early than sort out a charge later." },
      ]},
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "These terms govern your use of MudirOS. By requesting a trial or using the service, you agree to them.",
    updated: true,
    clauses: [
      { title: "Agreement to terms", blocks: [
        { p: "These Terms of Service (“Terms”) form a binding agreement between you and MudirOS regarding your use of MudirOS (the “Service”). If you use the Service on behalf of a company, you confirm you are authorized to accept these Terms for that company." },
      ]},
      { title: "The service", blocks: [
        { p: "MudirOS is the AI Business Manager for SMEs in Saudi Arabia and the GCC. It brings sales, inventory, cashflow, customers, and reporting into one workspace, with an AI assistant that surfaces what needs your attention. We may add, change, or remove features over time to improve the Service." },
      ]},
      { title: "Free trial", blocks: [
        { list: [
          "The free trial lasts **30 days** from activation.",
          "No credit card is required to start the trial.",
          "You can use trial features to evaluate whether the Service fits your business.",
          "At the end of the trial, you may choose a paid plan to continue, or let the trial lapse with no charge.",
          "We may adjust trial length or availability for future sign-ups, but this will not shorten a trial already in progress.",
        ]},
      ]},
      { title: "Subscriptions and billing", blocks: [
        { list: [
          "Paid plans are billed **monthly** in advance, in the currency shown at checkout.",
          "Subscriptions renew automatically each month until you cancel.",
          "Prices are shown on our Pricing section and exclude applicable taxes (such as VAT), which are added where required.",
          "You are responsible for keeping your billing details accurate and current.",
          "If a payment fails, we may retry it and may suspend access until the balance is settled.",
        ]},
      ]},
      { title: "Cancellations and refunds", blocks: [
        { p: "You can cancel your subscription at any time from your account settings; access continues until the end of the current billing period. Refunds are governed by our {refund}." },
      ]},
      { title: "Your responsibilities", blocks: [
        { list: [
          "Keep your login credentials confidential and secure.",
          "Ensure everyone you invite to your workspace follows these Terms.",
          "Provide accurate account and billing information.",
          "Use the Service in compliance with all laws that apply to your business.",
          "Own or have the right to use any data you upload to the Service.",
        ]},
      ]},
      { title: "Acceptable use", blocks: [
        { p: "You agree not to:" },
        { list: [
          "Break the law or infringe the rights of others while using the Service.",
          "Attempt to access accounts, data, or systems that are not yours.",
          "Probe, scan, or test the vulnerability of the Service without permission.",
          "Introduce malware, or disrupt or overload our infrastructure.",
          "Resell, sublicense, or copy the Service except as these Terms allow.",
          "Reverse engineer the Service except where the law expressly permits it.",
        ]},
      ]},
      { title: "Your data and ownership", blocks: [
        { p: "You own the business data you put into MudirOS. You grant us the limited rights needed to host, process, back up, and display that data so we can provide the Service. You can export your data at any time, and we handle it as described in our {privacy}." },
      ]},
      { title: "Intellectual property", blocks: [
        { p: "The Service, including its software, design, and branding, belongs to MudirOS and is protected by intellectual-property laws. These Terms grant you a limited, non-exclusive, non-transferable right to use the Service; they do not transfer ownership of it to you." },
      ]},
      { title: "Availability and support", blocks: [
        { p: "We work to keep the Service available and reliable, but we do not guarantee uninterrupted access. We may perform maintenance, and we may need to suspend the Service occasionally. Support is available by email and WhatsApp; response times vary by plan." },
      ]},
      { title: "Third-party services", blocks: [
        { p: "The Service may integrate with third-party tools you choose to connect. Those tools are governed by their own terms, and we are not responsible for them." },
      ]},
      { title: "Disclaimers", blocks: [
        { p: "The Service is provided “as is” and “as available.” To the extent permitted by law, we disclaim warranties we have not expressly stated here. MudirOS helps you manage your business, but you remain responsible for your own business decisions." },
      ]},
      { title: "Limitation of liability", blocks: [
        { p: "To the maximum extent permitted by law, MudirOS will not be liable for indirect, incidental, or consequential damages, or for lost profits or data. Our total liability for any claim relating to the Service is limited to the amount you paid us in the twelve months before the claim arose." },
      ]},
      { title: "Termination", blocks: [
        { p: "You may stop using the Service and cancel at any time. We may suspend or terminate access if you breach these Terms or use the Service in a way that risks harm to others or to our systems. On termination, your right to use the Service ends, and we handle your data as described in our {privacy}." },
      ]},
      { title: "Governing law", blocks: [
        { p: "These Terms are governed by the laws of the Kingdom of Saudi Arabia. Disputes will be handled by the competent courts of the Kingdom of Saudi Arabia, unless the law requires otherwise." },
      ]},
      { title: "Changes to these terms", blocks: [
        { p: "We may update these Terms as the Service evolves. When changes are material, we will update the date above and notify you by email or in the product. Continuing to use the Service after changes take effect means you accept the updated Terms." },
      ]},
      { title: "Contact", blocks: [
        { p: "Questions about these Terms? Email {email} or visit our {contact}." },
      ]},
    ],
  },
};
