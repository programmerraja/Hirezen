import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { Copy } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  maxHeight?: string;
}

export function CodeBlock({
  code,
  language = "jsx",
  showLineNumbers = true,
  className,
  maxHeight = "400px",
}: CodeBlockProps) {
  const { theme: appTheme } = useTheme();
  const isDark = appTheme === "dark";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className={`rounded-md overflow-hidden my-2 relative ${className} border border-border/50 shadow-sm w-full max-w-full`}>
      <div className="absolute top-2 right-2 z-10">
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="icon"
          className="h-6 w-6 bg-background/80 hover:bg-background"
          title="Copy code"
        >
          <Copy className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="bg-muted/30 text-xs px-4 py-1 border-b border-border/30">
        <span className="font-mono text-muted-foreground">
          {language === "jsx" ? "React" : language}
        </span>
      </div>
      <Highlight
        theme={isDark ? themes.vsDark : themes.vsLight}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 overflow-x-auto text-sm w-full`}
            style={{
              ...style,
              margin: 0,
              borderRadius: "0",
              maxHeight,
              backgroundColor: isDark ? "#1e1e1e" : "#f5f5f5",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className="table-row w-full"
              >
                {showLineNumbers && (
                  <span className="table-cell text-right pr-4 select-none opacity-50 text-xs w-8">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell pl-2 w-full">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
