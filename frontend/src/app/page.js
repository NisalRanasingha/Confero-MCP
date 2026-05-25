'use client';
import { useState } from 'react';

import Nav           from '@/components/ui/Nav';
import Footer        from '@/components/ui/Footer';
import Hero          from '@/components/sections/Hero';
import Overview      from '@/components/sections/Overview';
import Metrics       from '@/components/sections/Metrics';
import Audience      from '@/components/sections/Audience';
import Topics        from '@/components/sections/Topics';
import Attend        from '@/components/sections/Attend';
import Speakers      from '@/components/sections/Speakers';
import Sponsors      from '@/components/sections/Sponsors';
import RegisterModal from '@/components/sections/RegisterForm';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Nav onOpenModal={() => setModalOpen(true)} />

      <main>
        <Hero onOpenModal={() => setModalOpen(true)} />

        <hr className="hr-gradient mx-6 lg:mx-8 max-w-7xl lg:mx-auto" />
        <Overview />

        <hr className="hr-gradient mx-6 lg:mx-8 max-w-7xl lg:mx-auto" />
        <Metrics />

        <hr className="hr-gradient mx-6 lg:mx-8 max-w-7xl lg:mx-auto" />
        <Audience />

        <hr className="hr-gradient mx-6 lg:mx-8 max-w-7xl lg:mx-auto" />
        <Topics />

        <hr className="hr-gradient mx-6 lg:mx-8 max-w-7xl lg:mx-auto" />
        <Attend onOpenModal={() => setModalOpen(true)} />

        <hr className="hr-gradient mx-6 lg:mx-8 max-w-7xl lg:mx-auto" />
        <Speakers />

        <hr className="hr-gradient mx-6 lg:mx-8 max-w-7xl lg:mx-auto" />
        <Sponsors />
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />

      {/* Global modal — rendered at root level, above everything */}
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
