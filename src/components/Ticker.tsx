export default function Ticker() {
  const items = ['Nigerian History', 'Current Affairs', 'WAEC Prep', 'JAMB Prep', 'Politics', 'Sports', 'Geography', 'Culture', 'Government', 'AI-Generated', 'Daily Updates', '50K+ Questions']
  const doubled = [...items, ...items]

  return (
    <div className="border-y-2 border-ink bg-ink py-4 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 mx-6">
            <span className="font-black-condensed text-cream text-xl tracking-wide">{item}</span>
            <span className="w-2 h-2 rounded-full bg-lime flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
