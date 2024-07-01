import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AdvancedHtmlToMarkdown(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return Array.from(doc.body.childNodes)
    .map((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName === "BR") {
          return "\n";
        }
        if (el.tagName === "P") {
          return el.textContent;
        }
        if (el.tagName === "H1") {
          return `# ${el.textContent}`;
        }
        if (el.tagName === "H2") {
          return `## ${el.textContent}`;
        }
        if (el.tagName === "H3") {
          return `### ${el.textContent}`;
        }
        if (el.tagName === "H4") {
          return `#### ${el.textContent}`;
        }
        if (el.tagName === "H5") {
          return `##### ${el.textContent}`;
        }
        if (el.tagName === "H6") {
          return `###### ${el.textContent}`;
        }
        if (el.tagName === "UL") {
          return Array.from(el.childNodes)
            .map((child) => {
              if (child.nodeType === Node.ELEMENT_NODE) {
                const li = child as HTMLElement;
                return `- ${li.textContent}`;
              }
              return "";
            })
            .join("\n");
        }
        if (el.tagName === "OL") {
          return Array.from(el.childNodes)
            .map((child, index) => {
              if (child.nodeType === Node.ELEMENT_NODE) {
                const li = child as HTMLElement;
                return `${index + 1}. ${li.textContent}`;
              }
              return "";
            })
            .join("\n");
        }
        if (el.tagName === "A") {
          return `[${el.textContent}](${el.getAttribute("href")})`;
        }
        if (el.tagName === "IMG") {
          return `![${el.getAttribute("alt")}](${el.getAttribute("src")})`;
        }
        if (el.tagName === "BLOCKQUOTE") {
          return `> ${el.textContent}`;
        }
        if (el.tagName === "CODE") {
          return `\`${el.textContent}\``;
        }
        if (el.tagName === "PRE") {
          return `\`\`\`\n${el.textContent}\n\`\`\``;
        }
      }
      return "";
    })
    .join("\n");
}


function AdvancedMarkdownToHtml(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ")) {
        return `<h1>${line.slice(2)}</h1>`;
      }
      if (line.startsWith("## ")) {
        return `<h2>${line.slice(3)}</h2>`;
      }
      if (line.startsWith("### ")) {
        return `<h3>${line.slice(4)}</h3>`;
      }
      if (line.startsWith("#### ")) {
        return `<h4>${line.slice(5)}</h4>`;
      }
      if (line.startsWith("##### ")) {
        return `<h5>${line.slice(6)}</h5>`;
      }
      if (line.startsWith("###### ")) {
        return `<h6>${line.slice(7)}</h6>`;
      }
      if (line.startsWith("- ")) {
        return `<ul><li>${line.slice(2)}</li></ul>`;
      }
      if (line.match(/^\d+\./)) {
        return `<ol><li>${line.slice(line.indexOf(".") + 2)}</li></ol>`;
      }
      if (line.startsWith("> ")) {
        return `<blockquote>${line.slice(2)}</blockquote>`;
      }
      if (line.match(/^\!\[.*\]\(.*\)$/)) {
        const alt = line.slice(2, line.indexOf("]("));
        const src = line.slice(line.indexOf("(") + 1, line.indexOf(")"));
        return `<img alt="${alt}" src="${src}" />`;
      }
      if (line.match(/^\[.*\]\(.*\)$/)) {
        const text = line.slice(1, line.indexOf("]("));
        const href = line.slice(line.indexOf("(") + 1, line.indexOf(")"));
        return `<a href="${href}">${text}</a>`;
      }
      if (line.startsWith("`")) {
        return `<code>${line.slice(1, line.length - 1)}</code>`;
      }
      if (line.startsWith("```")) {
        return `<pre>${line.slice(3)}</pre>`;
      }
      return `<p>${line}</p>`;
    })
    .join("\n");
}