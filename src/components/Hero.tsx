
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-gray-900 text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                Beautiful templates for your
              </span>
              <span className="block text-blue-600 text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                next web project
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-500">
              Start your development with a modern, clean, and customizable template.
              Built with Vite, React, and Tailwind CSS for lightning-fast performance.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Get Started <ArrowRight size={16} className="ml-2" />
                </button>
                <button className="px-8 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                  Live Demo
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <div className="flex items-center justify-center h-64 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-opacity-80 text-xl">
                    Template Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
