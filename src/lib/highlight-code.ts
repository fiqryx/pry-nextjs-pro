import type { CodeToHastOptions } from 'shiki/core'

import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

import js from 'shiki/langs/javascript.mjs'
import ts from 'shiki/langs/typescript.mjs'
import oneDarkPro from 'shiki/themes/one-dark-pro.mjs'
import githubDarkDefault from 'shiki/themes/github-dark-default.mjs'

import {
  codeToHtml,
  BundledTheme,
  BundledLanguage,
} from "shiki"

const shiki = createHighlighterCoreSync({
  themes: [oneDarkPro, githubDarkDefault],
  langs: [js, ts],
  engine: createJavaScriptRegexEngine()
})


export async function highlightCode(
  code: string,
  op?: CodeToHastOptions<BundledLanguage, BundledTheme>
) {
  const html = codeToHtml(code, op ?? {
    lang: "typescript",
    theme: "github-dark-default",
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
      },
    ],
  })

  return html
}

export function highlightCodeSync(
  code: string,
  op?: CodeToHastOptions<BundledLanguage, BundledTheme>
) {
  const html = shiki.codeToHtml(code, op ?? {
    lang: 'ts',
    theme: 'github-dark-default',
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
      },
    ],
  })

  return html
}
