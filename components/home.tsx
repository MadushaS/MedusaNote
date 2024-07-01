"use client"

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Placeholder conversion functions
const convertMarkdownToHTML = (markdown:string) => markdown; // Use a real library in production
const convertHTMLToMarkdown = (html:string) => html; // Use a real library in production

const Header = memo(() => (
  <header className="bg-primary text-primary-foreground py-4 px-6">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Markdown Converter</h1>
      <nav className="flex gap-4">
        <Link href="#" className="hover:underline" prefetch={false}>Home</Link>
        <Link href="#" className="hover:underline" prefetch={false}>About</Link>
        <Link href="#" className="hover:underline" prefetch={false}>Contact</Link>
      </nav>
    </div>
  </header>
));

Header.displayName = 'Header';

const Footer = memo(() => (
  <footer className="bg-muted text-muted-foreground py-4 px-6">
    <div className="container mx-auto flex justify-between items-center">
      <p>&copy; 2024 Markdown Converter</p>
      <nav className="flex gap-4">
        <Link href="#" className="hover:underline" prefetch={false}>Terms</Link>
        <Link href="#" className="hover:underline" prefetch={false}>Privacy</Link>
        <Link href="#" className="hover:underline" prefetch={false}>Support</Link>
      </nav>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

export function HomeComponent() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isToMarkdown, setIsToMarkdown] = useState(true);

  const handleConvert = useCallback(() => {
    const convertedText = isToMarkdown ? convertHTMLToMarkdown(input) : convertMarkdownToHTML(input);
    setOutput(convertedText);
  }, [input, isToMarkdown]);

  const toggleConvert = useCallback(() => {
    setIsToMarkdown(!isToMarkdown);
  }, [isToMarkdown]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output);
  }, [output]);

  const handleDownload = useCallback(() => {
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `output.${isToMarkdown ? "md" : "html"}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [output, isToMarkdown]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MainContent {...{input, setInput, output, isToMarkdown, handleConvert, toggleConvert, handleCopy, handleDownload}} />
      <Footer />
    </div>
  );
}

const MainContent = memo(({ input, setInput, output, isToMarkdown, handleConvert, toggleConvert, handleCopy, handleDownload }) => (
  <main className="flex-1 bg-background py-12">
    <div className="container mx-auto max-w-7xl px-6">
      <div className="flex justify-center m-6">
        <Button onClick={toggleConvert}>
          {isToMarkdown ? "HTML" : "Markdown"} To {isToMarkdown ? "Markdown" : "HTML"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="input" className="mb-2 font-medium">
            {isToMarkdown ? "Markdown" : "HTML"} Input
          </label>
          <Textarea
            id="input"
            className="flex-1 border border-input rounded-md p-4 bg-background text-foreground font-mono text-sm"
            rows={15}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="output" className="mb-2 font-medium">
            {isToMarkdown ? "HTML" : "Markdown"} Output
          </label>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="flex-1 border border-input rounded-md p-4 bg-background text-foreground"
            rows={10}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCopy}>Copy</Button>
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={handleConvert}>
          Convert to {isToMarkdown ? "HTML" : "Markdown"}
        </Button>
      </div>
    </div>
  </main>
));

MainContent.displayName = 'MainContent';