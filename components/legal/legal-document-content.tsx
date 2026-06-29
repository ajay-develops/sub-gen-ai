import type { LegalDocument } from "@/lib/legal/types";

interface LegalDocumentContentProps {
  document: LegalDocument;
}

export function LegalDocumentContent({ document }: LegalDocumentContentProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-10 border-b pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {document.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{document.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {document.lastUpdated}
        </p>
      </header>

      <div className="space-y-10">
        {document.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="list-disc space-y-2 pl-6">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
