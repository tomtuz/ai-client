import { useState, useEffect } from "react";
import { bundledLanguages, bundledThemes, createHighlighter } from "shiki";

import type { ShikiCodeProps } from "./types";

const highlighter = await createHighlighter({
  themes: Object.keys(bundledThemes),
  langs: Object.keys(bundledLanguages),
});

export function ShikiRender({ code, language }: ShikiCodeProps) {
  console.log("code: ", code);
  console.log("language: ", language);

  const [renderedCode, setRenderedCode] = useState<string>("");

  useEffect(() => {
    const renderCode = async () => {
      if (!code) return;

      if (!Object.keys(bundledLanguages).includes(language || "")) {
        language = "text";
      }

      const htmlData = await highlighter.codeToHtml(code, {
        lang: language || "typescript",
        theme: "poimandres",
      });

      setRenderedCode(htmlData);
    };

    renderCode();
  }, [code, language]);

  if (!code) {
    return null;
  }

  return (
    /* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */
    <div dangerouslySetInnerHTML={{ __html: renderedCode }} />
  );
}
