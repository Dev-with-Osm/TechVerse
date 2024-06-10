import React from 'react';
import Accordion from './Accordion';
import { Link } from 'react-router-dom';
import { IoArrowForwardSharp } from 'react-icons/io5';

export default function Faq() {
  return (
    <div className="flex items-center justify-between gap-10 md:flex-row flex-col p-3 ">
      <div className="flex flex-1 flex-col gap-10">
        <div className="text-4xl md:text-left text-center">
          <h1>Any questions?</h1>
          <h1>We got you.</h1>
        </div>
        <p className="md:text-left text-center">
          Welcome to our FAQ section, where we address common inquiries about
          our tech and gaming news platform. We cover the latest updates on
          gadgets, software, gaming releases, reviews, and industry trends. Our
          goal is to keep you informed with expert analysis and in-depth
          articles. If you have any questions not covered here, feel free to
          reach out to us for more information.
        </p>
        <Link
          to={'/support'}
          className="text-blue-400 flex items-center justify-center md:justify-start "
        >
          Contact us
          <IoArrowForwardSharp />
        </Link>
      </div>
      <div className="p-4 bg-transparent rounded-lg flex flex-1 flex-col">
        <Accordion
          title="What was your favorite tech innovation this year?"
          answer="Share your thoughts on the most impactful tech innovation you've seen this year!"
        />
        <Accordion
          title="Which upcoming game are you most excited about?"
          answer="Tell us about the game releases you're eagerly anticipating and why."
        />
        <Accordion
          title="How do you stay updated with the latest in newstech?"
          answer="Discuss your favorite sources and methods for keeping up with newstech trends."
        />
        <Accordion
          title="What's the best gaming setup you've seen?"
          answer="Post pictures and descriptions of the most impressive gaming setups you've encountered."
        />
        <Accordion
          title="What are your thoughts on the latest gaming consoles?"
          answer="Share your experiences and opinions on the newest gaming consoles on the market."
        />
      </div>
    </div>
  );
}
