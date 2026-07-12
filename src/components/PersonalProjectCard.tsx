import type { PersonalProject } from '../data/personal-projects';

export default function PersonalProjectCard({
  title,
  org,
  date,
  location,
  role,
  description,
  achievement,
  technologies,
  href,
  linkLabel,
  image,
}: PersonalProject) {
  const cardClasses =
    'relative block bg-white/95 backdrop-blur-sm border border-rose-200 rounded-lg p-6 lg:p-5 hover:bg-rose-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col h-full no-underline';

  const content = (
    <>
      {achievement && (
        <div className="absolute -top-3 right-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
          {achievement}
        </div>
      )}

      {image && (
        <div className="w-full h-40 mb-4 rounded-md overflow-hidden bg-gray-100">
          <img src={image} alt={`${title} project`} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-rose-600 font-medium text-base lg:text-sm mb-1">{org}</p>
          <p className="text-gray-500 text-sm">
            {date}
            {location ? ` • ${location}` : ''}
          </p>
          <p className="text-gray-500 text-sm italic mt-1">{role}</p>
        </div>
        <div className="bg-rose-200 p-3 rounded-full ml-3 shrink-0">
          <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      <p className="text-gray-700 mb-4 flex-1">{description}</p>

      <div className="text-sm text-rose-600 font-medium">{technologies.join(' • ')}</div>

      {href && (
        <div className="mt-3 inline-flex items-center text-xs text-rose-700 font-medium">
          {linkLabel ?? 'Learn more'}
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        aria-label={`${title} — ${linkLabel ?? 'open link in new tab'}`}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}
