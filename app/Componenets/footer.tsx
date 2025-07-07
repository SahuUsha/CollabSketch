
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-gray-800">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-900"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Start Drawing?
          </h3>
          <p className="text-gray-300 text-lg mb-8">
            CollabSketch makes visual thinking easy and clear.
          </p>
        
          <button className="group inline-flex items-center gap-3  bg-gradient-to-r bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center  group/button shadow-lg hover:shadow-blue-500/25 hover:shadow-xl">
             <Link href="/dashboard" >
        
            Get Started
            
          </Link>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="pt-8 border-t border-gray-800 text-gray-500">
          <p className="mb-4">
            Built with 💜 for visual thinkers everywhere
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <a href="#" className="hover:text-purple-400 transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-purple-400 transition-colors duration-300">GitHub</a>
            <a href="#" className="hover:text-purple-400 transition-colors duration-300">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
