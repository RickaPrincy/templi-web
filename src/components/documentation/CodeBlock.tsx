import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  caption?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  showLineNumbers = false,
  caption,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mb-6">
      {caption && (
        <div className="text-sm text-muted-foreground mb-1">{caption}</div>
      )}
      <div className="relative bg-[#20252e] rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2A2F38] border-b border-[#2A324A]">
          <span className="text-xs font-mono text-zinc-400">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-zinc-300 hover:text-white hover:bg-[#2A324A]"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
        <pre
          className={`p-4 overflow-x-auto text-sm text-white ${showLineNumbers ? 'line-numbers' : ''}`}
        >
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
