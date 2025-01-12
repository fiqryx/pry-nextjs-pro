import type { CodeToHastOptions } from 'shiki/core'

import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

import vesper from 'shiki/themes/vesper.mjs'
import oneDarkPro from 'shiki/themes/one-dark-pro.mjs'
import githubLight from 'shiki/themes/github-light.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'
import githubDarkDimmed from 'shiki/themes/github-dark-dimmed.mjs'
import githubDarkDefault from 'shiki/themes/github-dark-default.mjs'

import tsx from 'shiki/langs/tsx.mjs'
import jsx from 'shiki/langs/jsx.mjs'
import bash from 'shiki/langs/bash.mjs'
import js from 'shiki/langs/javascript.mjs'
import ts from 'shiki/langs/typescript.mjs'

import {
  codeToHtml,
  BundledTheme,
  BundledLanguage,
} from "shiki"

const shiki = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  langs: [js, ts, jsx, tsx, bash],
  themes: [
    vesper,
    oneDarkPro,
    githubLight,
    githubDark,
    githubDarkDimmed,
    githubDarkDefault,
  ],
})


export async function highlightCode(
  code: string,
  op?: Partial<CodeToHastOptions<BundledLanguage, BundledTheme>>
) {
  const html = codeToHtml(code, {
    lang: "ts",
    themes: {
      dark: 'vesper',
      light: 'github-light',
      dim: 'github-dark-dimmed',
    },
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
      },
    ],
    ...op
  })

  return html
}

export function highlightCodeSync(
  code: string,
  op?: Partial<CodeToHastOptions<BundledLanguage, BundledTheme>>
) {
  const html = shiki.codeToHtml(code, {
    lang: 'ts',
    themes: {
      dark: 'vesper',
      light: 'github-light',
      dim: 'github-dark-dimmed',
    },
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
      },
    ],
    ...op
  })

  return html
}
