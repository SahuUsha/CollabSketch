

const Feature = () => {
   
     const features = [
    {
      title: "Hand-drawn Feel",
      description: "Create diagrams that feel natural and organic with our unique hand-drawn aesthetic.",
      icon: "✏️"
    },
    {
      title: "Real-time Collaboration",
      description: "Work together with your friends in real-time. See changes instantly as they happen.",
      icon: "👥"
    },
  
  ];

  return (
     <section className="py-24  relative">
      {/* Background gradient */}
      <div className="absolute bg-black inset-0 bg-gradient-to-b from-gray-900 to-black/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose CollabSketch?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The perfect tool for visual thinking, brainstorming, and creating beautiful diagrams that don't look like they were made by a robot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 flex justify-center items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/30 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feature
