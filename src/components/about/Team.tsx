import { useTranslation } from 'react-i18next';

interface TeamMember {
  image: string;
  name: string;
  role: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
    name: 'Rajesh Kumar',
    role: 'Lead Developer',
    description: 'Passionate about building efficient dairy management solutions that streamline operations.',
  },
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    name: 'Priya Sharma',
    role: 'Product Manager',
    description: 'Dedicated to creating user-friendly platforms that transform dairy business operations.',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
    name: 'Amit Patel',
    role: 'UI/UX Designer',
    description: 'Focused on designing intuitive interfaces that make dairy management simple and accessible.',
  },
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex w-full max-w-[17rem] flex-col items-center rounded-2xl border border-dk-line bg-white px-5 py-8 text-sm shadow-dk-sm transition hover:-translate-y-0.5 hover:border-dk-green-200 hover:shadow-md">
      <img className="h-24 w-24 rounded-full object-cover ring-2 ring-dk-green-100" src={member.image} alt={member.name} />
      <h2 className="mt-3 font-serif text-lg font-semibold text-dk-green-900">{member.name}</h2>
      <p className="text-sm font-medium text-dk-green-700">{member.role}</p>
      <p className="mt-3 w-11/12 text-center text-sm leading-relaxed text-dk-muted">{member.description}</p>
      <div className="mt-6 flex items-center gap-4 text-dk-muted">
        <a href="#" className="transition hover:text-dk-green-700" aria-label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a href="#" className="transition hover:text-dk-green-700" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M14.095 0H1.905C.855 0 0 .854 0 1.905v12.19C0 15.145.854 16 1.905 16h12.19c1.05 0 1.905-.854 1.905-1.905V1.905C16 .855 15.146 0 14.095 0m-1.521 6.98a2.85 2.85 0 0 1-2.651-1.277v4.395A3.248 3.248 0 1 1 6.674 6.85c.068 0 .134.006.201.01v1.6c-.067-.007-.132-.02-.2-.02a1.658 1.658 0 1 0 0 3.316c.915 0 1.724-.721 1.724-1.637l.016-7.465h1.531a2.85 2.85 0 0 0 2.63 2.547v1.78"
              fill="currentColor"
            />
          </svg>
        </a>
        <a href="#" className="transition hover:text-dk-green-700" aria-label="Twitter">
          <svg width="19" height="16" viewBox="0 0 19 16" fill="none" aria-hidden>
            <path
              d="m16.358 2.613 1.128-1.425c.326-.386.416-.683.445-.832-.89.535-1.722.713-2.256.713h-.208L15.348.95A3.83 3.83 0 0 0 12.795 0c-2.078 0-3.71 1.722-3.71 3.71 0 .12 0 .298.03.417l.088.593-.623-.03C4.78 4.573 1.663 1.307 1.158.743c-.831 1.485-.356 2.91.148 3.8l1.01 1.663-1.603-.89q.044 1.87 1.425 2.938l.801.594-.801.326c.504 1.515 1.632 2.138 2.464 2.375l1.098.297-1.04.713C2.999 13.745.92 13.656 0 13.568c1.87 1.305 4.097 1.602 5.64 1.602 1.158 0 2.02-.118 2.227-.207 8.313-1.96 8.699-9.382 8.699-10.866v-.208l.178-.119c1.01-.95 1.425-1.454 1.662-1.751-.089.03-.208.089-.326.119z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function Team() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-dk-line bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-dk-green-800 shadow-dk-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-dk-green-600" aria-hidden />
        {t('about.teamEyebrow')}
      </div>
      <h2 className="font-serif mt-4 text-3xl font-semibold tracking-tight text-dk-green-900 sm:text-4xl">{t('about.teamTitle')}</h2>
      <p className="mx-auto mb-12 mt-3 max-w-xl text-sm leading-relaxed text-dk-muted sm:mb-14 sm:text-base">{t('about.teamLead')}</p>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {teamMembers.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}
