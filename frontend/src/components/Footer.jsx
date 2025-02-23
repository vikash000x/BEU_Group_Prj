import React from "react";
import Marquee from "react-fast-marquee";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaLink, 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaTwitter 
} from 'react-icons/fa';

const developers = [
  {
    name: "Abhishek Kumar",
    role: "Lead Developer",
    social: {
      github: "https://github.com/abhishek-beu",
      linkedin: "https://linkedin.com/in/abhishek-beu",
      twitter: "https://twitter.com/abhishek_beu"
    }
  },
  {
    name: "Rahul Singh",
    role: "Full Stack Developer",
    social: {
      github: "https://github.com/rahul-beu",
      linkedin: "https://linkedin.com/in/rahul-beu",
      twitter: "https://twitter.com/rahul_beu"
    }
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    social: {
      github: "https://github.com/priya-beu",
      linkedin: "https://linkedin.com/in/priya-beu",
      twitter: "https://twitter.com/priya_beu"
    }
  },
  {
    name: "Vikash Kumar",
    role: "Backend Specialist",
    social: {
      github: "https://github.com/vikash-beu",
      linkedin: "https://linkedin.com/in/vikash-beu",
      twitter: "https://twitter.com/vikash_beu"
    }
  }
];

const SocialIcon = ({ Icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors duration-300"
  >
    <Icon size={20} />
  </a>
);

const DeveloperSection = () => (
  <div className="space-y-2">
    <h3 className="text-xl font-bold text-white mb-2 pb-1 border-b border-white border-opacity-20">
      Our Team
    </h3>
    <div className="flex flex-col space-y-1 text-sm">
      {developers.map((developer, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between text-gray-300 hover:text-white transition-colors duration-300"
        >
          <div>
            <span className="font-semibold mr-2">{developer.name}</span>
            <span className="text-xs text-gray-500">{developer.role}</span>
          </div>
          <div className="flex space-x-2">
            <a 
              href={developer.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a 
              href={developer.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a 
              href={developer.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              title="Twitter"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-[#14181f] to-[#2c3e50] text-white py-12 border-t border-opacity-20 border-white shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-white border-opacity-20">
              Bihar Engineering University
            </h3>
            <p className="text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
              Bihar Engineering University (BEU), Patna has been established by
              the Government of Bihar vide Bihar Engineering University, ACT, 2021
              (Act No. 20 of 2021), published in the Bihar Gazette No.-677 date
              09/08/2021.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-white border-opacity-20 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Address
            </h3>
            <p className="text-gray-300 hover:text-white transition-colors duration-300">
              Bihar Engineering University, 6th Floor, Examination Block,
              Aryabhatta Knowledge University, Mithapur, Patna – 800001, Bihar
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-white border-opacity-20 flex items-center">
              <FaLink className="mr-2" /> Useful Links
            </h3>
            <div className="flex flex-col space-y-2">
              {[
                { name: 'Bihar Government', url: 'https://state.bihar.gov.in/main/CitizenHome.html' },
                { name: 'AICTE', url: 'https://www.aicte-india.org/' },
                { name: 'UGC', url: 'https://www.ugc.gov.in/' },
                { name: 'NPTEL', url: 'https://nptel.ac.in/' }
              ].map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-white border-opacity-20 flex items-center">
              <FaPhone className="mr-2" /> Contact Us
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-300" />
                <p className="text-gray-300 hover:text-white transition-colors duration-300">
                  0612-2385475
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-300" />
                <p className="text-gray-300 hover:text-white transition-colors duration-300">
                  beubihar@gmail.com
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <DeveloperSection />
          </div>
        </div>

        <div className="mt-8">
          <Marquee speed={100} gradient={false} pauseOnHover={true}>
            <div className="flex items-center gap-16 py-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
              {[
                { name: 'Bihar Govt', url: 'https://state.bihar.gov.in/main/CitizenHome.html', src: 'https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651229/beu/unojg20l6cdam5ebs8z9.png' },
                { name: 'AICTE', url: 'https://www.aicte-india.org/', src: 'https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651334/beu/t1gj243hywvwcp0i67fy.png' },
                { name: 'UGC', url: 'https://www.ugc.gov.in/', src: 'https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651367/beu/tu43svd5ktfp0va3cgls.png' },
                { name: 'AISHE', url: 'https://aishe.gov.in/', src: 'https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651409/beu/t1csglbirfbldzm9tywt.png' },
                { name: 'NPTEL', url: 'https://nptel.ac.in/', src: 'https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651437/beu/pu0kv1yy3un8d7kma0un.png' }
              ].map((logo) => (
                <a 
                  key={logo.name} 
                  href={logo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <img 
                    alt={logo.name} 
                    src={logo.src} 
                    className="max-h-16 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Footer;
