'use client'

import {useMemo, useState} from 'react'
import {urlFor} from '@/lib/sanity'

function PackageIcon({name}: {name: string}) {
  const n = name.toLowerCase()
  if (n.includes('linkedin') && n.includes('cv')) {
    return (
      <div className="icon-merge">
        <PackageIcon name="cv" />
        <PackageIcon name="linkedin" />
      </div>
    )
  }
  if (n.includes('linkedin')) return <div className="icon-linkedin">in</div>
  if (n.includes('job')) return <svg viewBox="0 0 120 120" className="icon-svg" aria-label="briefcase"><rect x="12" y="36" width="96" height="62" rx="8" fill="#45769c" /><path d="M38 36v-10c0-8 6-14 14-14h16c8 0 14 6 14 14v10h-10v-8c0-3-2-5-5-5H53c-3 0-5 2-5 5v8z" fill="#e68a45" /><rect x="54" y="64" width="12" height="16" rx="5" fill="#ffd95f" /></svg>
  if (n.includes('report') && n.includes('counselling')) return <svg viewBox="0 0 120 120" className="icon-svg" aria-label="checklist"><path d="M30 18h44l20 20v64a8 8 0 0 1-8 8H30a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8z" fill="#efefef" /><path d="M74 18v18h20" fill="#dadada" /><rect x="34" y="44" width="10" height="10" fill="#fff" stroke="#4e5d75" /><rect x="34" y="62" width="10" height="10" fill="#fff" stroke="#4e5d75" /><rect x="34" y="80" width="10" height="10" fill="#fff" stroke="#4e5d75" /><path d="M36 49l3 3 6-7" stroke="#ef5d64" strokeWidth="2.5" fill="none" /><path d="M36 67l3 3 6-7" stroke="#ef5d64" strokeWidth="2.5" fill="none" /><rect x="52" y="46" width="30" height="3" rx="1.5" fill="#4e5d75" /><rect x="52" y="64" width="24" height="3" rx="1.5" fill="#4e5d75" /></svg>
  if (n.includes('report')) return <svg viewBox="0 0 120 120" className="icon-svg" aria-label="report"><rect x="22" y="18" width="76" height="94" rx="8" fill="#d4864c" /><rect x="30" y="26" width="60" height="78" rx="4" fill="#f4efe6" /><rect x="44" y="12" width="32" height="14" rx="3" fill="#f2d064" /><rect x="44" y="64" width="8" height="16" rx="2" fill="#d95b7b" /><rect x="57" y="56" width="8" height="24" rx="2" fill="#ea9f45" /><rect x="70" y="48" width="8" height="32" rx="2" fill="#6ab5e8" /></svg>
  if (n.includes('cv')) return <svg viewBox="0 0 120 120" className="icon-svg" aria-label="cv"><rect x="24" y="14" width="72" height="94" rx="8" fill="#6f87d7" /><circle cx="60" cy="35" r="12" fill="#f3f4f8" /><rect x="48" y="49" width="24" height="6" rx="3" fill="#ffd24d" /><rect x="36" y="62" width="48" height="4" rx="2" fill="#9db5ff" /><rect x="36" y="72" width="44" height="4" rx="2" fill="#9db5ff" /><rect x="36" y="82" width="50" height="4" rx="2" fill="#9db5ff" /></svg>
  return <div className="icon-linkedin">in</div>
}

export default function HomeClient({data}: {data: any}) {
  const [activeAudienceIdx, setActiveAudienceIdx] = useState(0)
  const [galleryIdx, setGalleryIdx] = useState(0)

  const audiences = data?.packagesByAudience || []
  const activeAudience = audiences[activeAudienceIdx]
  const gallery = data?.gallery || []

  const visibleGallery = useMemo(() => {
    if (!gallery.length) return []
    return [gallery[galleryIdx % gallery.length], gallery[(galleryIdx + 1) % gallery.length], gallery[(galleryIdx + 2) % gallery.length]]
  }, [gallery, galleryIdx])

  const nextGallery = () => setGalleryIdx((prev) => (prev + 1) % (gallery.length || 1))
  const prevGallery = () => setGalleryIdx((prev) => (prev - 1 + (gallery.length || 1)) % (gallery.length || 1))
  const formatPrice = (value: string) => {
    const clean = (value || '').replace(/[^\d,]/g, '')
    return clean ? `₹${clean}` : value
  }

  return (
    <main>
      <header className="topbar"><div className="brand">{data?.logo && <img src={urlFor(data.logo).width(70).height(70).url()} alt="logo" />}<div><h1>{data?.brandName}</h1><p>{data?.tagline}</p></div></div><nav>{['Home', 'About Founder', 'Services', 'Packages', 'Testimonials', 'Photo Gallery', 'Contact Us'].map((n) => (<a key={n} href={`#${n.toLowerCase().replace(/\s+/g, '-')}`}>{n}</a>))}</nav></header>
      <section id="home" className="hero"><h2>Dare to Dream. Learn with Clarity.</h2><p>{data?.aboutBrand}</p></section>
      <section id="about-founder" className="section founder"><div><h3>About Founder</h3><h4>{data?.founderName}</h4><p>{data?.founderBio}</p></div>{data?.founderPhoto && <img src={urlFor(data.founderPhoto).width(480).url()} alt="Founder" />}</section>
      <section id="services" className="section"><h3>Services</h3><div className="cards">{data?.services?.map((service: any) => (<article key={service.title} className="card"><h4>{service.title}</h4><p>{service.description}</p><p><strong>Who it is for:</strong> {service.whoFor}</p><p><strong>Mode:</strong> {service.mode}</p></article>))}</div></section>
      <section id="packages" className="section"><h3>Packages</h3><div className="tabs">{audiences.map((a: any, idx: number) => (<button key={a.audience} className={idx === activeAudienceIdx ? 'active' : ''} onClick={() => setActiveAudienceIdx(idx)}>{a.audience}</button>))}</div>{activeAudience && <div className="cards two">{[activeAudience.standard, activeAudience.premium].map((plan: any) => (<article key={plan.name} className="plan"><span>{plan.tier}</span><h4>{plan.name}</h4><h5>{formatPrice(plan.price)}</h5><ul>{plan.features?.map((f: any) => <li key={f.text} className={f.included ? 'ok' : 'no'}>{f.text}</li>)}</ul><button className="buy-btn" type="button">BUY NOW</button></article>))}</div>}<h3 className="custom-title">Customize Your Mentorship Plan</h3><div className="cards two">{data?.customPackages?.map((pkg: any) => (<article key={pkg.name} className="card package"><PackageIcon name={pkg.name} /><div><h4>{pkg.name}</h4><p className="price">{formatPrice(pkg.price)}</p><p>{pkg.description}</p></div></article>))}</div></section>
      <section id="testimonials" className="section"><h3>Testimonials</h3><div className="cards">{data?.testimonials?.map((t: any, i: number) => (<blockquote key={i} className="card quote">"{t.quote}"<cite>{t.author}</cite></blockquote>))}</div></section>
      <section id="photo-gallery" className="section"><h3>Photo Gallery</h3><div className="gallery-wrap"><button className="gallery-side prev" onClick={prevGallery} aria-label="Previous photos">{'<'}</button><div className="gallery">{visibleGallery.map((g: any, i: number) => <img key={i} src={urlFor(g).width(500).height(380).url()} alt={`Gallery ${i + 1}`} />)}</div><button className="gallery-side next" onClick={nextGallery} aria-label="Next photos">{'>'}</button></div></section>
      <section id="contact-us" className="section contact"><h3>Contact Us</h3><div className="contact-grid"><div className="contact-card"><h4>Let us guide your next step</h4><p>Ready to begin your learning transformation? Reach us directly.</p><p><strong>Phone:</strong> {data?.contactPhone}</p><p><strong>WhatsApp:</strong> {data?.contactWhatsapp}</p></div><form className="contact-form contact-card"><input type="text" placeholder="Your Name" required /><input type="email" placeholder="Your Email" required /><input type="tel" placeholder="Phone Number" required /><input type="text" placeholder="Subject" /><textarea placeholder="Your Message" rows={5} required /><button type="submit">Submit</button></form></div></section>
    </main>
  )
}
