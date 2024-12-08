import React from "react";
import Marquee from "react-fast-marquee";

const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-white w-full h-auto border-t-[0.01rem] border-t-white border-opacity-50 pb-4 bg-[#14181f]">
      <footer className="flex items-center justify-center w-[1200px] px-2 text-white font-semibold">
      </footer>
      <div className="flex justify-center gap-4 w-10/12">
        <div className="w-4/12">
          <p className="text-xl font-medium pb-2">
            Bihar Engineering University, Patna
          </p>
          <p>
            Bihar Engineering University (BEU), Patna has been established by
            the Government of Bihar vide Bihar Engineering University, ACT, 2021
            (Act No. 20 of 2021), published in the Bihar Gazette No.-677 date
            09/08/2021.
          </p>
        </div>
        <div className="w-4/12">
          <p className="text-xl font-medium pb-2">Address</p>
          <p>
            Bihar Engineering University, 6th Floor, Examination Block,
            Aryabhatta Knowledge University, Mithapur, Patna – 800001, Bihar
          </p>
        </div>
        <div className="w-2/12">
          <p className="text-xl font-medium pb-2">Useful Links</p>
          <p className="flex flex-col">
            <a
              href="https://state.bihar.gov.in/main/CitizenHome.html"
              target="_blank"
            >
              Bihar Government
            </a>
            <a
              href="https://state.bihar.gov.in/main/CitizenHome.html"
              target="_blank"
            >
              AICTE{" "}
            </a>
            <a
              href="https://state.bihar.gov.in/main/CitizenHome.html"
              target="_blank"
            >
              UGC{" "}
            </a>
            <a
              href="https://state.bihar.gov.in/main/CitizenHome.html"
              target="_blank"
            >
              NPTEL{" "}
            </a>
          </p>
        </div>
        <div className="w-2/12">
          <p className="text-xl font-medium pb-2">Contact Us</p>
          <p>Phone : 0612-2385475</p>
          <p>Email : beubihar@gmail.com</p>
        </div>
      </div>
      <Marquee speed={100} gradient={false} pauseOnHover={true}>
        <div className="flex gap-16 pt-2 scale-150 pt-2">
          <a
            href="https://state.bihar.gov.in/main/CitizenHome.html"
            target="_blank"
          >
            <img
              alt="Bihar Govt"
              src="https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651229/beu/unojg20l6cdam5ebs8z9.png"
            />
          </a>
          <a href="https://www.aicte-india.org/" target="_blank">
            <img
              alt="aicte"
              src="https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651334/beu/t1gj243hywvwcp0i67fy.png"
            />
          </a>
          <a href="https://www.ugc.gov.in/" target="_blank">
            <img
              alt="ugc"
              src="https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651367/beu/tu43svd5ktfp0va3cgls.png"
            />
          </a>

          <a href="https://aishe.gov.in/" target="_blank">
            <img
              alt="aishe"
              src="https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651409/beu/t1csglbirfbldzm9tywt.png"
            />
          </a>
          <a href="https://nptel.ac.in/" target="-blank">
            <img
              alt="nptel"
              src="https://res.cloudinary.com/dmzgb9hm5/image/upload/v1733651437/beu/pu0kv1yy3un8d7kma0un.png"
            />
          </a>
        </div>
      </Marquee>
    </div>
  );
};

export default Footer;
