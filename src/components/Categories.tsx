import { useState } from 'react'
import { BookOpen, Vote, Trophy, Music2, Landmark, MapPin, Newspaper, GraduationCap, Award } from 'lucide-react'

const cats = [
  { icon: <BookOpen size={32} />, label: 'History', count: '12,400' },
  { icon: <Vote size={32} />, label: 'Politics', count: '5,200' },
  { icon: <Trophy size={32} />, label: 'Sports', count: '3,800' },
  { icon: <Music2 size={32} />, label: 'Culture', count: '2,900' },
  { icon: <Landmark size={32} />, label: 'Government', count: '4,100' },
  { icon: <MapPin size={32} />, label: 'Geography', count: '2,600' },
  { icon: <Newspaper size={32} />, label: 'Current Affairs', count: '8,900' },
  { icon: <GraduationCap size={32} />, label: 'WAEC Prep', count: '7,200' },
  { icon: <Award size={32} />, label: 'JAMB Prep', count: '6,500' },
]

export default function Categories() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="categories" className="py-24 px-6 md:px-10 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="section-label mb-4">Categories</div>
          <h2 className="font-black-condensed text-ink" style={{ fontSize: 'clamp(48px,6vw,80px)', lineHeight: '0.92' }}>
            9 KNOWLEDGE DOMAINS.<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #111a0e' }}>THOUSANDS EACH.</span>
          </h2>
        </div>

        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {cats.map((c, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-2xl p-7 border-2 cursor-pointer transition-all duration-200"
              style={{
                background: hovered === i ? '#111a0e' : '#eef6e4',
                borderColor: hovered === i ? '#111a0e' : 'rgba(17,26,14,0.12)',
                transform: hovered === i ? 'translateY(-4px)' : 'none',
              }}>
              <div style={{ color: hovered === i ? '#a8e63d' : '#111a0e' }} className="mb-5 transition-colors duration-200">
                {c.icon}
              </div>
              <div className="font-black-condensed text-2xl mb-1 transition-colors duration-200"
                style={{ color: hovered === i ? '#eef6e4' : '#111a0e' }}>
                {c.label.toUpperCase()}
              </div>
              <div className="font-body text-sm font-semibold transition-colors duration-200"
                style={{ color: hovered === i ? '#a8e63d' : '#4a5e3a' }}>
                {c.count} questions
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
