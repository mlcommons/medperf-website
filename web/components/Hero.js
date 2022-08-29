import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import classNames from 'classnames';

import mapAnimation from '../public/animations/mapAnimation--earlierTransitions.json';

import Arrow from './illustrations/Arrow';
import SectionIllustrations from './SectionIllustrations';

const Hero = ({ hero }) => {
  const { title, description, roles } = hero;

  const illustrationContainer = useRef(null);
  const rolesContainer = useRef(null);
  const rolesSlides = useRef(null);

  const [animation, setAnimation] = useState();
  const [totalFrames, setTotalFrames] = useState();
  const [sectionFrames, setSectionFrames] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const [timeline, setTimeline] = useState();
  const [isComplete, setIsComplete] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState();

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsNarrowScreen(mql.matches);

    const changeListener = (event) => setIsNarrowScreen(event.matches);

    mql.addEventListener('change', changeListener);
    return () => {
      mql.removeEventListener('change', changeListener);
    };
  }, []);

  /* Create map animation */
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

  /* Create timeline */
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 0.4,
        ease: 'power2.out',
      },
    });
    setTimeline(tl);
  }, []);

  /** Play animation and set roles animation timeline */
  const playAnimation = () => {
    if (!animation) return;

    /* On mobile, ensure container is scrolled to start position */
    rolesContainer.current.scrollLeft = 0;

    animation.goToAndPlay(totalFrames / 5, true);
    setIsComplete(false);

    if (isNarrowScreen) {
      timeline.to(rolesSlides.current, { x: 0 });
      timeline.to(rolesSlides.current, { x: '-12.5%' }, 2);
      timeline.to(rolesSlides.current, { x: '-37.5%' }, 4);
      timeline.to(rolesSlides.current, { x: '-62.5%' }, 6);
      timeline.to(rolesSlides.current, { x: 0 }, 8);
    }
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
    /** Delayed completion to allow for gsap animation to finish
     * Since we only have the position transform on mobile and not desktop,
     * this is the easiest way to apply this to both
     */
    setTimeout(() => {
      setIsComplete(true);
    }, 400);
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

  /* Create scroll listeners to play animation */
  useEffect(() => {
    if (!illustrationContainer.current || !animation) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const sharedTriggerProps = {
      trigger: illustrationContainer.current,
      once: true,
      onEnter: () => {
        // console.log(`Triggered to play on ${isNarrowScreen ? 'narrow' : 'wide'} screens`);
        playAnimation();
      },
    };

    mm.add('(max-width:767px)', () => {
      ScrollTrigger.create({
        start: 'top 25%',
        end: 'top 25%',
        ...sharedTriggerProps,
      });
    });
    mm.add('(min-width:768px)', () => {
      ScrollTrigger.create({
        start: 'top 20%',
        end: 'top 20%',
        ...sharedTriggerProps,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [illustrationContainer, animation]);

  return (
    <div className="max-w-screen-lg md:mx-auto border-white border-3 overflow-hidden">
      <h3 className="p-4 border-b-3 border-white font-mono text-sm">{title}</h3>
      <div className="p-4 md:p-8">
        <div className="md:grid md:grid-cols-2 md:gap-x-12 md:items-center">
          <div>
            <p>{description}</p>
            <button
              type="button"
              onClick={() => playAnimation()}
              className={classNames({
                'transition-opacity opacity-0 my-6 md:my-4 font-mono text-dark-gray flex space-x-2 items-center mx-auto md:mx-0 hover:text-black': true,
                'opacity-100': isComplete,
              })}
            >
              <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 8.49995L0.75 16.7272L0.750001 0.272705L15 8.49995Z" fill="currentColor" />
              </svg>
              <span>Replay</span>
            </button>
            {/*
            <br />
            <button type="button" onClick={() => pauseAnimation()} className="my-4">Pause</button>
            <br />
            <button type="button" onClick={() => resumeAnimation()} className="my-4">Resume</button>
            */}
          </div>
          <div>
            <div ref={illustrationContainer} className="max-w-sm mx-auto" />
          </div>
        </div>
        <br />
        <br />
        <div
          ref={rolesContainer}
          className={classNames({
            'rolesAnimationContainer overflow-x-scroll md:overflow-x-auto -mx-4 md:mx-0 pt-4 md:pt-0': true,
            'overflow-x-none pointer-events-none md:pointer-events-auto': activeIndex > 0,
          })}
        >
          <ul
            ref={rolesSlides}
            className={classNames({
              'rolesAnimation relative grid grid-cols-4 md:gap-x-12': true,
              'rolesAnimation--overrideTransform': isComplete,
            })}
          >
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
                    <SectionIllustrations id={sectionId} />
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
