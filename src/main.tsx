import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowLeft, ArrowRight, Orbit, PanelsTopLeft, Layers, Monitor, Tablet, Smartphone, Globe, Download, ExternalLink, FlaskConical, MoveUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { applications, platformNames } from './catalog';
import type { Application, Access, Platform } from './catalog';
import './styles.css';

const platformIcons: Record<Platform, LucideIcon> = { desktop: Monitor, macos: Monitor, windows: Monitor, linux: Monitor, ipad: Tablet, iphone: Smartphone, web: Globe };
const appIcons = { panels: PanelsTopLeft, layers: Layers, orbit: Orbit };
const statuses = { available: 'Available', beta: 'Beta', 'coming-soon': 'Coming soon' };
const accessLabels = { download: 'Download installer', web: 'Open web app', 'app-store': 'View on App Store', testflight: 'Join beta', unavailable: 'Coming soon' };

function AppIcon({ app, large = false }: { app: Application; large?: boolean }) {
  if (app.icon.kind === 'image') {
    return <span className={`app-icon image ${app.accent} ${large ? 'large' : ''}`}><img src={app.icon.src} alt="" width={large ? 77 : 54} height={large ? 77 : 54} /></span>;
  }
  const Icon = appIcons[app.icon.name];
  return <span className={`app-icon ${app.accent} ${large ? 'large' : ''}`}><Icon aria-hidden="true" strokeWidth={1.5} /></span>;
}
function Platforms({ platforms }: { platforms: Platform[] }) {
  return <span className="platforms">{platforms.map(platform => {
    const Icon = platformIcons[platform];
    return <span key={platform}><Icon size={14} aria-hidden="true" />{platformNames[platform]}</span>;
  })}</span>;
}
function Card({ app, index }: { app: Application; index: number }) {
  return <article className={`app-card ${app.accent}`}>
    <div className="card-art" aria-hidden="true">
      <span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" />
      <span className="art-dot" /><span className="art-cross">+</span>
      <AppIcon app={app} large />
      <span className="art-index">AS / 0{index + 1}</span>
    </div>
    <div className="card-body">
      <div className="card-meta"><Platforms platforms={app.platforms} />{app.example && <span className="example-label">Example</span>}</div>
      <h2><a href={`#/apps/${app.slug}`}>{app.name}</a></h2>
      <p>{app.description}</p>
      <div className="card-bottom"><span className={`status ${app.status}`}><span />{statuses[app.status]}</span><a className="text-link" href={`#/apps/${app.slug}`}>Explore app <ArrowUpRight size={16} aria-hidden="true" /></a></div>
    </div>
  </article>;
}
function Catalog() {
  return <>
    <section className="intro" aria-labelledby="page-title">
      <div><div className="eyebrow"><span /> INDEPENDENTLY CREATED</div><h1 id="page-title">A small universe<br />of <span>applications.</span></h1><p>A personal collection of apps for your everyday devices.<br className="desktop-break" /> Find an app, explore the details, and make it yours.</p></div>
      <div className="intro-mark" aria-hidden="true"><Orbit strokeWidth={0.65} /><span>IDEAS INTO ORBIT</span></div>
    </section>
    <section className="catalog" aria-labelledby="catalog-title">
      <div className="section-heading"><div><h2 id="catalog-title">The collection</h2><span className="count">{String(applications.length).padStart(2, '0')}</span></div><span className="collection-note">A little of what I’m building.</span></div>
      <div className="card-grid">{applications.map((app, i) => <Card key={app.id} app={app} index={i} />)}</div>
      {applications.length === 0 && <p className="empty-state">The collection is taking shape. Applications will appear here when they’re ready.</p>}
      {applications.some(app => app.example) && <p className="sample-note"><span aria-hidden="true">○</span> This catalogue is taking shape. Entries marked “Example” are placeholders; real details and access links are on their way.</p>}
    </section>
  </>;
}
function AccessOption({ access }: { access: Access }) {
  const Icon = platformIcons[access.platform];
  const ActionIcon = access.kind === 'download' ? Download : access.kind === 'testflight' ? FlaskConical : ExternalLink;
  // Only explicit HTTPS or HTTP destinations can become interactive access links.
  const available = access.kind !== 'unavailable' && /^https?:\/\//i.test(access.url);
  return <div className="access-option"><div className="access-name"><Icon size={20} aria-hidden="true" /><strong>{platformNames[access.platform]}</strong></div>
    {access.requirements && <p>{access.requirements}</p>}
    {available ? <a className="button" href={access.url} target="_blank" rel="noopener noreferrer">{access.kind === 'download' ? `Download for ${platformNames[access.platform]}` : accessLabels[access.kind]}<ActionIcon size={16} aria-hidden="true" /></a> : <span className="unavailable">Coming soon</span>}
    {access.instructions && <p className="installation">{access.instructions}</p>}
  </div>;
}
function Detail({ app }: { app: Application }) {
  return <section className="detail" aria-labelledby="page-title">
    <div className="detail-layout"><div className="detail-content">
      <div className="detail-header"><a className="back-link icon-only" href="#/" aria-label="Back to all applications" title="Back to all applications"><ArrowLeft size={22} aria-hidden="true" /></a><AppIcon app={app} large /><div className="detail-heading">
        <h1 id="page-title">{app.name}</h1>
        <div className="detail-labels">{app.example && <span className="example-label">Example entry</span>}<span className={`status ${app.status}`}><span />{statuses[app.status]}</span></div>
      </div></div>
      <p className="detail-description">{app.description}</p><Platforms platforms={app.platforms} />
      {app.features.length > 0 && <section className="features"><h2>What’s inside</h2><ul>{app.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>}
      {app.screenshots.length > 0 && <section className="screenshots"><h2>A closer look</h2>{app.screenshots.map(shot => <img key={shot.src} src={shot.src} alt={shot.alt} loading="lazy" />)}</section>}
      {(app.version || app.updatedAt) && <dl className="metadata">{app.version && <><dt>Version</dt><dd>{app.version}</dd></>}{app.updatedAt && <><dt>Last updated</dt><dd>{app.updatedAt}</dd></>}</dl>}
    </div><aside className="access-panel"><div className="eyebrow">GET THE APP <MoveUpRight size={15} aria-hidden="true" /></div><h2>Choose your platform.</h2>{app.access.map(access => <AccessOption key={access.platform} access={access} />)}{app.example && <p className="access-note">This is an example entry. Download and access links will appear when the app details are added.</p>}</aside></div>
  </section>;
}
function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  useEffect(() => {
    const update = () => { setRoute(window.location.hash || '#/'); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  const app = applications.find(item => route === `#/apps/${item.slug}`);
  const home = route === '#/' || route === '#';
  useEffect(() => {
    document.title = `${app?.name ?? (home ? 'Applications' : 'Page not found')} — Astronaut Studios`;
    document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true });
  }, [route, app, home]);
  return <div className="site-shell"><a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <header className="site-header"><a className="brand" href="#/" aria-label="Astronaut Studios home"><span className="brand-symbol" aria-hidden="true">A<span /></span><span>Astronaut<span className="brand-light">Studios</span></span></a></header>
    <main id="main-content" tabIndex={-1}>{home ? <Catalog /> : app ? <Detail app={app} /> : <section className="not-found"><div className="eyebrow">OFF THE MAP / 404</div><h1>Nothing in this orbit.</h1><p>This application page could not be found.</p><a className="text-link" href="#/">Back to the collection<ArrowRight size={16} /></a></section>}</main>
    <footer className="site-footer"><div><Orbit size={18} aria-hidden="true" /><span>Astronaut Studios</span></div></footer>
  </div>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
