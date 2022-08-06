import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import classNames from 'classnames';

import mapAnimation from '../public/animations/mapAnimation.json';

import BenchmarkIllustration from './illustrations/BenchmarkIllustration';
import CliniciansIllustration from './illustrations/CliniciansIllustration';
import ResearchersIllustration from './illustrations/ResearchersIllustration';
import ResultsIllustration from './illustrations/ResultsIllustration';
import Arrow from './illustrations/Arrow';

const Hero = ({ hero }) => {
  const { title, description, roles } = hero;

  const illustrationContainer = useRef(null);
  const [animation, setAnimation] = useState();
  const [totalFrames, setTotalFrames] = useState();
  const [sectionFrames, setSectionFrames] = useState();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!illustrationContainer || animation) return;
    console.log('Animation loaded');
    const anim = lottie.loadAnimation({
      container: illustrationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: mapAnimation,
    });
    // console.log('Total frames', anim.totalFrames);
    const frames = anim.totalFrames;
    setAnimation(anim);
    setTotalFrames(frames);
    setSectionFrames(frames / 5);
  }, [animation, illustrationContainer]);

  const playAnimation = () => {
    if (!animation) return;
    animation.goToAndPlay(totalFrames / 5, true);
  };

  // const pauseAnimation = () => {
  //   if (!animation) return;
  //   animation.pause();
  // };

  // const resumeAnimation = () => {
  //   if (!animation) return;
  //   animation.play();
  // };

  animation?.setSpeed(0.5);

  animation?.addEventListener('complete', () => {
    animation.goToAndStop(0, true);
  });

  /** Speed up setting the active slide index by 1/2 the length of the CSS transition
   * to ensure the map and roles animations 'look' like they're happening at the same time
   * Calculation:
   * Translate % in milliseconds to % in slide frame length, divided by 2 for 1/2 transition time
   */
  const halfTransitionDuration = 75; // in milliseconds
  const transitionDurationToOffset = ((halfTransitionDuration / 1000) * sectionFrames) / 2;

  animation?.addEventListener('enterFrame', () => {
    const { currentFrame } = animation;
    const segmentIndex = Math.floor((currentFrame + transitionDurationToOffset) / sectionFrames);
    setActiveIndex(segmentIndex);
  });

  return (
    <div className="max-w-screen-lg md:mx-auto border-white border-3 overflow-hidden">
      <h3 className="p-4 border-b-3 border-white font-mono text-sm">{title}</h3>
      <div className="p-4 md:p-8">
        <div className="md:grid md:grid-cols-2 md:gap-x-12 md:items-center">
          <div>
            <p>{description}</p>
            <button type="button" onClick={() => playAnimation()} className="my-4">Play</button>
            {/*
            <br />
            <button type="button" onClick={() => pauseAnimation()} className="my-4">Pause</button>
            <br />
            <button type="button" onClick={() => resumeAnimation()} className="my-4">Resume</button>
            */}
          </div>
          <div>
            <div ref={illustrationContainer} />
          </div>
        </div>
        <br />
        <br />
        <div className="overflow-x-scroll md:overflow-x-auto -mx-4 md:mx-0 pt-4 md:pt-0">
          <ul className={`rolesAnimation rolesAnimation--${activeIndex} relative grid grid-cols-4 md:gap-x-12`}>
            {roles.length > 0
              && roles.map(({ sectionId, name, description: roleDescription }, i) => (
                <li
                  key={sectionId}
                  className={classNames({
                    'transition-opacity relative px-4 md:px-0 grid grid-rows-roles': true,
                    'opacity-30': activeIndex !== i + 1 && activeIndex !== 0,
                  })}
                >
                  <div className={classNames({
                    'relative scale-80 md:scale-100 mb-4 md:mb-8 h-36 flex items-center justify-center transition-colors': true,
                    'text-black': activeIndex !== i + 1,
                    'text-blue': activeIndex === i + 1,
                  })}
                  >
                    {sectionId === 'benchmark-committee' && (
                      <BenchmarkIllustration />
                    )}
                    {sectionId === 'researchers' && (
                      <ResearchersIllustration />
                    )}
                    {sectionId === 'clinicians' && (
                      <CliniciansIllustration />
                    )}
                    {sectionId === 'results' && (
                      <ResultsIllustration />
                    )}
                  </div>
                  <p className="mb-4 self-center">
                    {i + 1}. {name}
                  </p>
                  <p className="mb-4">
                    {roleDescription}
                  </p>
                  <Link href={`#${sectionId}`} scroll={false} passHref>
                    <button type="button" className="justify-self-start underline">Read more</button>
                  </Link>
                </li>
              ))}
            {/* We couldn't put these above because of weird opacity issues */}
            <li className={classNames({
              'absolute scale-80 top-16 left-1/4 -ml-4 md:ml-0 transition-opacity': true,
              'opacity-30': activeIndex !== 0,
            })}
            >
              <Arrow />
            </li>
            <li className={classNames({
              'absolute scale-80 top-16 left-1/2 -ml-4 md:ml-0 transition-opacity': true,
              'opacity-30': activeIndex !== 0,
            })}
            >
              <Arrow />
            </li>
            <li className={classNames({
              'absolute scale-80 top-16 left-3/4 -ml-4 md:ml-0 transition-opacity': true,
              'opacity-30': activeIndex !== 0,
            })}
            >
              <Arrow />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
