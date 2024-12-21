import React from "react";
import CountUp from "react-countup";

const UniversityStats = () => {
  const stats = [
    {
      icon: "🏛️",
      number: 9,
      label: "Colleges",
      suffix: "",
    },
    {
      icon: "🔄",
      number: 111,
      label: "Departments",
      suffix: "+",
    },
    {
      icon: "📚",
      number: 300,
      label: "Programs",
      suffix: "+",
    },
    {
      icon: "👥",
      number: 3200,
      label: "Academicians",
      suffix: "+",
    },
  ];

  return (
    <div className="w-full bg-[#0B192C]  py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Learning For Career Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center text-white"
            >
              <span className="text-4xl mb-4">{stat.icon}</span>
              <h3 className="text-5xl font-bold mb-2">
                <CountUp
                  end={stat.number}
                  duration={2.5}
                  separator=","
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
                {stat.suffix}
              </h3>
              <p className="text-xl">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityStats;
