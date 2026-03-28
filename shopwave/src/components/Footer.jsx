const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', href: 'https://www.linkedin.com/company/shopwave' },
    { label: 'Careers',  href: 'https://www.linkedin.com/jobs' },
    { label: 'Press',    href: 'https://techcrunch.com' },
    { label: 'Blog',     href: 'https://medium.com' },
  ],
  Support: [
    { label: 'Help Center', href: 'https://support.google.com' },
    { label: 'Contact',     href: 'https://www.intercom.com' },
    { label: 'Returns',     href: 'https://www.amazon.com/returns' },
    { label: 'Shipping',    href: 'https://www.fedex.com/en-us/tracking.html' },
  ],
  Legal: [
    { label: 'Privacy', href: 'https://policies.google.com/privacy' },
    { label: 'Terms',   href: 'https://policies.google.com/terms' },
    { label: 'Cookies', href: 'https://cookiepedia.co.uk/what-are-cookies' },
    { label: 'GDPR',    href: 'https://gdpr.eu' },
  ],
};

const SOCIALS = [
  { label: '𝕏',  href: 'https://twitter.com' },
  { label: 'in', href: 'https://linkedin.com' },
  { label: 'f',  href: 'https://facebook.com' },
  { label: 'ig', href: 'https://instagram.com' },
];

const Footer = ({ setPage }) => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <div className="nav-logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          ShopWave<span className="nav-logo-dot">.</span>
        </div>
        <p className="footer-desc">
          A modern e-commerce experience built with care. Quality products, seamless checkout, happy customers.
        </p>
        <div className="footer-socials">
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {Object.entries(FOOTER_LINKS).map(([title, links]) => (
        <div key={title} className="footer-col">
          <h4>{title}</h4>
          <ul>
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="footer-bottom">
      <span>© 2025 ShopWave. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;