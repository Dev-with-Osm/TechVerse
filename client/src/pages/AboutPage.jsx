import React from 'react';

export default function AboutPage() {
  return (
    <div className="flex  items-center justify-center mt-5 p-3">
      <div className="md:max-w-3xl p-8 bg-white shadow-md text-black rounded-lg">
        <h1 className="text-4xl font-bold mb-4  text-center">
          About TechVerse
        </h1>
        <p className="text-lg mb-6">
          Welcome to TechVerse, your go-to platform for the latest in technology
          and gaming news. Here, users can share their insights, updates, and
          analyses on a wide range of topics, from cutting-edge tech innovations
          to the hottest trends in gaming.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="mb-4">
          At TechVerse, our mission is to create a vibrant community where tech
          enthusiasts and gamers can connect, share knowledge, and stay informed
          about the latest developments in their fields of interest. We aim to
          provide a user-friendly platform that encourages quality content and
          meaningful discussions.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Features</h2>
        <ul className="list-disc list-inside mb-6">
          <li>User-generated posts about tech and gaming news</li>
          <li>Comment and engage with other users</li>
          <li>Stay updated with the latest trends and innovations</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-3">About the Developer</h2>
        <p>
          TechVerse was developed by <strong>osm</strong>. As a passionate
          developer and tech enthusiast, osm created this platform to bring
          together like-minded individuals and foster a community where everyone
          can learn and grow together.
        </p>
      </div>
    </div>
  );
}
