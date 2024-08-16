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

  // TODO: fix error (useEffect)
  // TypeError: context.getSource is not a function
  // Rule: "react-hooks/exhaustive-deps"

  // useEffect(() => {
  //   const renderCode = async () => {
  //     if (!code) return;

  //     if (!Object.keys(bundledLanguages).includes(language || "")) {
  //       language = "text";
  //     }

  //     const htmlData = await highlighter.codeToHtml(code, {
  //       lang: language || "typescript",
  //       theme: "poimandres",
  //     });

  //     setRenderedCode(htmlData);
  //   };

  //   renderCode();
  // }, [code, language]);

  if (!code) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: renderedCode }} />;
}
