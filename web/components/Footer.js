import Image from 'next/image';
import medPerfLogoGreen from '../public/images/medperf_logo_green.svg';

const fallbackPrivacyUrl = 'https://mlcommons.org/en/policies/';

const Footer = ({ siteSettings }) => (
  <div className="w-full p-4 md:p-12 bg-light-gray">
    <div className="max-w-screen-lg md:mx-auto flex justify-between items-end">
      <div>
        <div className="w-20">
          <Image src={medPerfLogoGreen} alt={`${siteSettings.name} Logo`} />
        </div>
        <p className="text-sm text-dark-gray">
          Powered by <a href="https://mlcommons.org" className="underline">ML Commons</a>
        </p>
      </div>

      <div className="text-sm">
        &copy; 2020 - 2022 MLCommons
        <br />
        <a href={siteSettings.privacyPolicy || fallbackPrivacyUrl} target="_blank" rel="noreferrer" className="underline">Privacy Policy</a>
      </div>
    </div>
  </div>
);

export default Footer;
