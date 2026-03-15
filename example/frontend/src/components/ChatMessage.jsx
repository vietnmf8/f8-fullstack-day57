import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import php from "react-syntax-highlighter/dist/esm/languages/prism/php";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("shell", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("xml", markup);

const MimiAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 select-none">
        M
    </div>
);

const TypingIndicator = () => (
    <div className="flex items-end gap-2">
        <MimiAvatar />
        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
            <div className="flex gap-1 items-center h-5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            </div>
        </div>
    </div>
);

const markdownComponents = {
    // Code block with syntax highlighting
    code({ inline, className, children }) {
        const language = /language-(\w+)/.exec(className || "")?.[1];
        const code = String(children).replace(/\n$/, "");

        if (!inline && language) {
            return (
                <SyntaxHighlighter
                    style={oneDark}
                    language={language}
                    PreTag="div"
                    customStyle={{
                        borderRadius: "0.5rem",
                        fontSize: "0.8rem",
                        margin: "0.5rem 0",
                        padding: "1rem",
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            );
        }

        // Inline code
        return (
            <code className="bg-gray-100 text-orange-600 text-[0.8em] px-1.5 py-0.5 rounded font-mono">
                {children}
            </code>
        );
    },

    // Headings
    h1: ({ children }) => <h1 className="text-base font-bold mt-3 mb-1">{children}</h1>,
    h2: ({ children }) => <h2 className="text-sm font-bold mt-3 mb-1">{children}</h2>,
    h3: ({ children }) => <h3 className="text-sm font-semibold mt-2 mb-1">{children}</h3>,

    // Paragraph
    p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed whitespace-pre-wrap">{children}</p>,

    // Lists
    ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-0.5">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-0.5">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // Blockquote
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-orange-300 pl-3 italic text-gray-600 my-2">
            {children}
        </blockquote>
    ),

    // Horizontal rule
    hr: () => <hr className="border-gray-200 my-3" />,

    // Bold / italic
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,

    a: ({ href, children }) => {
        const safe = href?.startsWith("http://") || href?.startsWith("https://") ? href : "#";
        return (
            <a
                href={safe}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
            >
                {children}
            </a>
        );
    },

    // Table (GFM)
    table: ({ children }) => (
        <div className="overflow-x-auto my-2">
            <table className="min-w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
    th: ({ children }) => (
        <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-3 py-2 text-gray-700 border-b border-gray-100">{children}</td>
    ),
};

const AssistantBubble = ({ content }) => (
    <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm px-4 py-3 text-sm max-w-[85%] sm:max-w-[75%]">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
        >
            {content}
        </ReactMarkdown>
    </div>
);

const UserBubble = ({ content }) => (
    <div className="bg-orange-500 text-white rounded-2xl rounded-br-sm shadow-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words max-w-[75%] sm:max-w-[65%]">
        {content}
    </div>
);

const ChatMessage = ({ message, isLoading }) => {
    if (isLoading) return <TypingIndicator />;

    const isUser = message.role === "user";

    return (
        <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
            {!isUser && <MimiAvatar />}
            {isUser ? (
                <UserBubble content={message.content} />
            ) : (
                <AssistantBubble content={message.content} />
            )}
        </div>
    );
};

export default ChatMessage;
