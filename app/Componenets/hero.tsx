
import HomeNavbar from './HomeNavbar'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
    
 

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute bg-black inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 ">
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center">
        <HomeNavbar />
      </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 ">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative pt-32 z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo/Brand */}
        <div className="mb-8">
        
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
            CollabSketch
          </h1>
       
           

          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Virtual whiteboard for sketching hand-drawn like diagrams
          </p>
        </div>

        {/* Main CTA */}
        <div className="mb-12">

          <Link href={"/dashboard"} className="inline-block">

          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            Let's Start
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          </Link>
        </div>

        {/* Preview mockup */}
        <div className="relative max-w-4xl mx-auto mb-7">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700/50 backdrop-blur-sm  before:content-[''] before:absolute before:w-32 before:h-32 before:bg-purple-500 before:top-[-4rem] before:left-[-4rem] before:blur-3xl before:rounded-full before:opacity-50">
            <div className="bg-gray-900 rounded-lg h-80 md:h-96 border border-gray-600/30 relative overflow-hidden ">
              {/* Simulated drawing canvas */}
              <div className="absolute inset-4">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Simulated hand-drawn shapes */}
                  <path
                    d="M50,100 Q100,50 150,100 T250,100"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    fill="none"
                    className="animate-pulse"
                    style={{ animationDuration: '3s' }}
                  />
                  <rect
                    x="80"
                    y="140"
                    width="80"
                    height="60"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    fill="none"
                    rx="5"
                    className="animate-pulse"
                    style={{ animationDelay: '0.5s', animationDuration: '3s' }}
                  />
                  <circle
                    cx="280"
                    cy="170"
                    r="30"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                    style={{ animationDelay: '1s', animationDuration: '3s' }}
                  />
                  <path
                    d="M200,200 L250,240 L300,200 L350,240"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                    style={{ animationDelay: '1.5s', animationDuration: '3s' }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-red-300">
        hwllo
      </div> */}
      {/* <Feature/> */}
    </section>
  )
}

export default Hero
