import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colleges = [
  {
    name: "BHAGALPUR COLLEGE OF ENGINEERING",
    shortName: "bce-bhagalpur",
    college_id: "001",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis dui ut magna hendrerit, non fermentum justo pharetra. Sed venenatis quam non orci interdum, in consequat ex sodales. Nullam id turpis nec eros bibendum dictum ac a magna. Vivamus porttitor, eros eget interdum molestie, risus nisi cursus dolor, et euismod velit erat a risus. Duis nec gravida libero, vel faucibus odio. Ut malesuada sem et lectus tincidunt, sit amet dictum metus viverra. Nam vel metus eget urna tristique posuere non in arcu. Suspendisse sit amet felis at magna vehicula fermentum.Curabitur sagittis varius lectus, nec interdum sapien iaculis vel. Fusce ac ligula sem. Vestibulum egestas sodales lacus. Aenean auctor nunc sed tellus dignissim, nec suscipit lacus tempus. Vivamus venenatis volutpat libero, vel efficitur ante fringilla sit amet. Sed in erat at lorem iaculis gravida. Proin ac risus eu risus iaculis ultrices. Maecenas posuere mi vitae velit ultricies posuere. Nulla luctus est ac nibh auctor, ut tincidunt justo pretium. Quisque posuere consequat elit, eget egestas sapien finibus sed. Suspendisse potenti. Pellentesque fringilla, nisl ut ultrices sagittis, eros arcu lacinia eros, vel accumsan purus odio at metus.",
  },
  {
    name: "GAYA COLLEGE OF ENGINEERING",
    shortName: "gce-gaya",
    college_id: "002",
    description:
      "Gaya College of Engineering offers a range of technical programs in engineering. The campus is equipped with state-of-the-art infrastructure and provides students with hands-on experience.",
  },
  {
    name: "DARBHANGA COLLEGE OF ENGINEERING",
    shortName: "dce-darbhanga",
    college_id: "003",
    description:
      "Darbhanga College of Engineering provides quality education in engineering disciplines. The college emphasizes on overall development through extracurricular activities and workshops.",
  },
  {
    name: "MOTIHARI COLLEGE OF ENGINEERING",
    shortName: "mce-motihari",
    college_id: "004",
    description:
      "Motihari College of Engineering offers a diverse range of engineering programs. It is known for its academic excellence and collaborative research initiatives with industry partners.",
  },
  {
    name: "LOK NAYAK JAI PRAKASH INSTITUTE OF TECHNOLOGY",
    shortName: "lnjpit-chapra",
    college_id: "005",
    description:
      "LNJPIT offers a wide range of technical programs, focusing on industry-oriented skills. The college promotes research activities and has excellent lab facilities.",
  },
  {
    name: "SERSHAH ENGINEERING COLLEGE",
    shortName: "sec-sasaram",
    college_id: "006",
    description:
      "Sershah Engineering College focuses on producing high-quality engineers by providing modern teaching methods, industry internships, and a strong placement record.",
  },
  {
    name: "RASHTRAKAVI RAMDHARI SINGH DINKAR COLLEGE OF ENGINEERING",
    shortName: "rrsdce-begusarai",
    college_id: "007",
    description:
      "The college provides world-class education in the field of engineering and technology. Students receive hands-on training and are encouraged to participate in innovative projects.",
  },
  {
    name: "SUPAUL COLLEGE OF ENGINEERING",
    shortName: "sce-supaul",
    college_id: "008",
    description:
      "Supaul College of Engineering offers undergraduate programs in engineering with an emphasis on research, practical training, and skill development.",
  },
  {
    name: "BAKHTIYARPUR COLLEGE OF ENGINEERING",
    shortName: "bce-bakhtiyarpur",
    college_id: "009",
    description:
      "Bakhtiyarpur College of Engineering is known for its strong academic programs and infrastructure. It focuses on developing students' technical skills and research capabilities.",
  },
  {
    name: "SITAMARHI INSTITUTE OF TECHNOLOGY",
    shortName: "sit-sitamarhi",
    college_id: "010",
    description:
      "Sitamarhi Institute of Technology offers specialized engineering education with an emphasis on technology-driven innovations and industry collaborations.",
  },
  {
    name: "PURNEA COLLEGE OF ENGINEERING",
    shortName: "pce-purnea",
    college_id: "011",
    description:
      "Purnea College of Engineering is committed to providing high-quality engineering education. It has a vibrant campus life and a strong focus on research and development.",
  },
  {
    name: "B. P. MANDAL COLLEGE OF ENGINEERING",
    shortName: "bpcm-madhepura",
    college_id: "012",
    description:
      "BP Mandal College of Engineering offers cutting-edge engineering programs. It focuses on innovation and offers numerous opportunities for student growth and development.",
  },
  {
    name: "KATIHAR ENGINEERING COLLEGE",
    shortName: "keck-katihar",
    college_id: "013",
    description:
      "Katihar Engineering College focuses on providing high-quality technical education with a strong emphasis on industry interaction and modern teaching methods.",
  },
  {
    name: "SAHARSA COLLEGE OF ENGINEERING",
    shortName: "sce-saharsa",
    college_id: "014",
    description:
      "Saharsha College of Engineering offers a variety of engineering courses. The college strives for excellence in teaching, research, and overall student development.",
  },
  {
    name: "GOVERNMENT ENGINEERING COLLEGE, JAMUI",
    shortName: "gec-jamui",
    college_id: "015",
    description:
      "Government Engineering College, Jamui, is a state-run institution providing quality engineering education. It offers modern infrastructure and a well-developed research ecosystem.",
  },
  {
    name: "GOVERNMENT ENGINEERING COLLEGE, BANKA",
    shortName: "gec-banka",
    college_id: "016",
    description:
      "Government Engineering College, Banka, provides state-of-the-art facilities and focuses on fostering industry-ready engineers with a practical learning approach.",
  },
  {
    name: "GOVERNMENT ENGINEERING COLLEGE, VAISHALI",
    shortName: "gec-vaishali",
    college_id: "017",
    description:
      "Government Engineering College, Vaishali offers undergraduate engineering courses with an emphasis on quality education, research, and innovation.",
  },
  {
    name: "GOVERNMENT ENGINEERING COLLEGE, NAWADA",
    shortName: "gec-nawada",
    college_id: "018",
    description:
      "Government Engineering College, Nawada offers programs that are designed to develop students' technical skills and knowledge with cutting-edge infrastructure.",
  },
  {
    name: "GOVERNMENT ENGINEERING COLLEGE, KISHANGANJ",
    shortName: "gec-kishanganj",
    college_id: "019",
    description:
      "Government Engineering College, Kishanganj is known for its academic excellence and innovative teaching methods. It prepares students for global engineering challenges.",
  },
  {
    name: "GOVERNMENT ENGINEERING COLLEGE, MUNGER",
    shortName: "gec-munger",
    college_id: "020",
    description:
      "Government Engineering College, Munger offers cutting-edge courses in engineering, ensuring students are well-prepared for both industry and academia.",
  },
  // Continue adding other colleges similarly...
];
