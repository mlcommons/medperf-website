import Image from 'next/image';
import Link from 'next/link';

import githubLogo from '../public/images/github_logo.svg';
import medPerfLogo from '../public/images/medperf_logo.svg';
import SignupButton from '../auth/components/signup';

const Header = ({
  siteSettings, showHomeLink = false, showSignup = false, children,
}) => (
  <div className="w-full p-4 bg-primary">
    <div className="w-full flex items-center justify-between">
      <div>
        {showHomeLink && (
          <div className="w-18 h-7">
            <Link href="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <Image src={medPerfLogo} alt={`${siteSettings.name} Logo`} />
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-end space-x-4 text-sm">
        {showHomeLink && (
          <div className="hidden md:block">
            <Link href="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Home</a>
            </Link>
          </div>
        )}
        {showSignup && <SignupButton />}
        {siteSettings.documentation && (
          <a href={siteSettings.documentation} target="_blank" rel="noreferrer">Documentation</a>
        )}
        {siteSettings.teams && (
          <a href={siteSettings.teams} target="_blank" rel="noreferrer">Team</a>
        )}
        {siteSettings.email && (
          <a href={`mailto:${siteSettings.email}`} target="_blank" rel="noreferrer">Contact</a>
        )}
        {siteSettings.github && (
          <a href={siteSettings.github} target="_blank" rel="noreferrer" className="w-4 h-4">
            <Image src={githubLogo} alt={`Go to ${siteSettings.name} Github Repo`} />
          </a>
        )}
      </div>
    </div>
    {children}
  </div>
);

export default Header;
