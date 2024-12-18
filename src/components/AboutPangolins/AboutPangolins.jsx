import React from 'react';
import './AboutPangolins.css';

const AboutPangolins = () => {
  return (
    <div className="about-pangolins-container">
      <h1 className="about-title">About Pangolins</h1>
      <div className="about-section">
        <div className="about-text">
          <p>
            Pangolins, also known as scaly anteaters, are unique mammals covered in protective keratin scales. 
            These nocturnal creatures are found in Asia and Africa, and they are known for their ability to roll 
            into a ball when threatened. Unfortunately, they are also one of the most trafficked mammals in the world, 
            facing threats from illegal poaching and habitat loss.
          </p>
          <p>
            These fascinating creatures play a vital role in their ecosystems by controlling insect populations. 
            Pangolins primarily feed on ants and termites using their specialized, sticky tongues. 
          </p>
          <p>
            Conservation efforts are ongoing to protect these endangered species and raise awareness 
            about their importance in maintaining biodiversity.
          </p>
        </div>
      </div>

      <div className="about-sources">
        <h2>Sources</h2>
        <ul>
          <li>
            <a
              href="https://www.worldwildlife.org/species/pangolin"
              target="_blank"
              rel="noopener noreferrer"
            >
              World Wildlife Fund (WWF) - Pangolins
            </a>
          </li>
          <li>
            <a
              href="https://www.iucnredlist.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              IUCN Red List - Pangolin Conservation Status
            </a>
          </li>
          <li>
            <a
              href="https://www.nationalgeographic.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Geographic - Pangolin Facts
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPangolins;
