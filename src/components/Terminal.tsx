import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useReducedMotion } from 'framer-motion';

const PROMPT = 'user@vinusha:~$';

const StaticTerminal = () => (
  <div className="font-mono text-sm leading-7 text-green-400">
    <div><span className="text-primary">{PROMPT}</span> whoami</div>
    <div className="text-accent pl-2">Ravindu Vinusha — Computer Engineer, IoT Builder, Robotics Hacker</div>
    <div className="mt-1"><span className="text-primary">{PROMPT}</span> cat interests.txt</div>
    <div className="text-accent pl-2">Embedded Systems · Robotics · AI/ML · BCI · Ethical Hacking · Computer Vision</div>
    <div className="mt-1"><span className="text-primary">{PROMPT}</span> ls ./projects</div>
    <div className="text-secondary pl-2">smart-irrigation/ autonomous-rover/ bci-classifier/ network-scanner/ vision-pipeline/</div>
    <div className="mt-1"><span className="text-primary">{PROMPT}</span> run ./passion</div>
    <div className="text-yellow-400 pl-2">Building systems where hardware meets intelligence...</div>
    <div className="text-primary pl-2 flex items-center gap-1">
      READY<span className="inline-block w-2 h-4 bg-primary animate-blink ml-1" />
    </div>
  </div>
);

export default function Terminal() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="terminal"
      className="py-16 relative overflow-hidden"
      aria-label="Terminal introduction"
    >
      {/* scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-5"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.15) 2px, rgba(0,255,136,0.15) 4px)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-t-lg bg-cyber-light border border-primary/20">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-gray-400 font-mono">bash — vinusha@portfolio</span>
          </div>

          {/* Terminal body */}
          <div
            className="rounded-b-lg bg-cyber-darker border border-t-0 border-primary/20 p-6 min-h-[260px]"
            style={{ boxShadow: '0 0 30px rgba(0,255,136,0.08) inset' }}
          >
            {reducedMotion ? (
              <StaticTerminal />
            ) : (
              <div className="font-mono text-sm leading-7">
                <TypeAnimation
                  sequence={[
                    // whoami
                    `${PROMPT} `,
                    400,
                    `${PROMPT} whoami`,
                    600,
                    `${PROMPT} whoami\nRavindu Vinusha — Computer Engineer, IoT Builder, Robotics Hacker`,
                    900,
                    // cat interests
                    `${PROMPT} whoami\nRavindu Vinusha — Computer Engineer, IoT Builder, Robotics Hacker\n\n${PROMPT} `,
                    400,
                    `${PROMPT} whoami\nRavindu Vinusha — Computer Engineer, IoT Builder, Robotics Hacker\n\n${PROMPT} cat interests.txt`,
                    600,
                    `${PROMPT} whoami\nRavindu Vinusha — Computer Engineer, IoT Builder, Robotics Hacker\n\n${PROMPT} cat interests.txt\nEmbedded Systems · Robotics · AI/ML · BCI · Ethical Hacking · Computer Vision`,
                    900,
                    // ls projects
                    `${PROMPT} whoami\nRavindu Vinusha — Computer Engineer, IoT Builder, Robotics Hacker\n\n${PROMPT} cat interests.txt\nEmbedded Systems · Robotics · AI/ML · BCI · Ethical Hacking · Computer Vision\n\n${PROMPT} ls ./projects`,
                    600,
                    `${PROMPT} whoami\nRavindu Vinusha — Computer Engineer, IoT Builder, Robotics Hacker\n\n${PROMPT} cat interests.txt\nEmbedded Systems · Robotics · AI/ML · BCI · Ethical Hacking · Computer Vision\n\n${PROMPT} ls ./projects\nsmart-irrigation/  autonomous-rover/  bci-classifier/  network-scanner/  vision-pipeline/`,
                    900,
                    // run passion
                    `${PROMPT} whoami\nRavindu Vinusha — Computer Engineer, IoT Builder, Robotics Hacker\n\n${PROMPT} cat interests.txt\nEmbedded Systems · Robotics · AI/ML · BCI · Ethical Hacking · Computer Vision\n\n${PROMPT} ls ./projects\nsmart-irrigation/  autonomous-rover/  bci-classifier/  network-scanner/  vision-pipeline/\n\n${PROMPT} run ./passion\nBuilding systems where hardware meets intelligence...\nREADY ▊`,
                    5000,
                  ]}
                  wrapper="pre"
                  speed={70}
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    color: '#00ff88',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                  }}
                  repeat={Infinity}
                  cursor={true}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
