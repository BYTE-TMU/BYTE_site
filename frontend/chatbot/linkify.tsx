const URL_REGEX = /(https?:\/\/[^\s<>"')\]]+)/g

export function linkify(text: string) {
  return text.split(URL_REGEX).map((part, i) =>
    part.startsWith('http://') || part.startsWith('https://') ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline break-all hover:opacity-80"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}
