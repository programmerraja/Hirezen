import { Download, FileText, MessageSquare, Printer, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass backdrop-blur-xl border-b border-white/10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MessageSquare className="h-8 w-8 text-emerald-500" />
              <div className="absolute -inset-1 bg-emerald-500/20 rounded-lg blur-sm"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              HireZen
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium  hover:text-emerald-600 transition-all duration-300 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium  hover:text-emerald-600 transition-all duration-300 relative group"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#support"
              className="text-sm font-medium  hover:text-emerald-600 transition-all duration-300 relative group"
            >
              Support
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

          <div className="container relative z-10 grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-semibold border border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="mr-2">🚀</span>
                  AI-Powered Interview Assistant
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight prim-color ">
                  Conduct{" "}
                  <span className="gradient-text">Better Interviews</span>{" "}
                  with AI Assistance
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-medium">
                  Generate tailored interview questions, track feedback, and
                  create professional reports with our Chrome extension powered by
                  cutting-edge AI technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 glow group px-8 py-4 text-lg font-semibold"
                >
                  <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  <a href="/hirezen/hirezen.zip" download={"hirezen.zip"} className="flex items-center">
                    Download Extension
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="default"
                  className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 px-8 py-4 text-lg font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Watch Demo
                </Button>
              </div>

              {/* <div className="flex items-center gap-6 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 border-3 border-white shadow-lg"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 border-3 border-white shadow-lg"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 border-3 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Trusted by 1000+ professionals</div>
                    <div className="text-xs text-gray-500">Join the growing community</div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-3xl opacity-20 floating"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
                <div className="space-y-6">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">HireZen Extension</div>
                  </div>

                  {/* Extension Interface */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">H</span>
                      </div>
                      <div>
                        <div className="h-3 bg-gray-800 rounded w-20 mb-1"></div>
                        <div className="h-2 bg-gray-400 rounded w-16"></div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3">
                      <div className="h-4 bg-emerald-100 rounded-lg w-full border border-emerald-200"></div>
                      <div className="h-4 bg-gray-100 rounded-lg w-4/5 border border-gray-200"></div>
                      <div className="h-4 bg-gray-100 rounded-lg w-3/4 border border-gray-200"></div>
                    </div>

                    {/* Generated Questions */}
                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                      <div className="h-3 bg-emerald-600 rounded w-1/3 mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-emerald-200 rounded w-full"></div>
                        <div className="h-2 bg-emerald-200 rounded w-5/6"></div>
                        <div className="h-2 bg-emerald-200 rounded w-4/5"></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <div className="h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg w-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
                ✨ Powerful Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 prim-color ">
                Everything You Need for{" "}
                <span className="gradient-text">Perfect Interviews</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our AI-powered extension streamlines the interview process from
                preparation to reporting with cutting-edge technology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageSquare className="h-12 w-12 text-emerald-600" />}
                title="AI Question Generation"
                description="Generate relevant interview questions based on the candidate's resume and the position requirements with advanced AI algorithms."
              />
              <FeatureCard
                icon={<FileText className="h-12 w-12 text-emerald-600" />}
                title="Feedback Tracking"
                description="Record and organize your feedback during the interview in a structured format with real-time synchronization."
              />
              <FeatureCard
                icon={<Printer className="h-12 w-12 text-emerald-600" />}
                title="Professional Reports"
                description="Generate professional PDF reports to share with HR and other stakeholders with customizable templates."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="container">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-6">
                🔄 Simple Process
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 prim-color ">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our extension simplifies the interview process in just four easy steps.
                Get started in minutes and transform your hiring process.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connection Lines */}
              {/* <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200"></div> */}

              <StepCard
                number="1"
                title="Enter Details"
                description="Input the interview name, candidate details, and position requirements with our intuitive interface."
              />
              <StepCard
                number="2"
                title="Upload Resume"
                description="Upload the candidate's resume for advanced AI analysis and question generation."
              />
              <StepCard
                number="3"
                title="Generate Questions"
                description="Get tailored interview questions based on the candidate's profile and role requirements."
              />
              <StepCard
                number="4"
                title="Record & Export"
                description="Add your feedback and export a professional PDF report with comprehensive insights."
              />
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="support" className="py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-full floating">
                    <Coffee className="h-16 w-16 text-emerald-600" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-lg opacity-20"></div>
                </div>
              </div>

              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
                ☕ Support Development
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 prim-color ">
                Support <span className="gradient-text">HireZen</span> Development
              </h2>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                HireZen is a free, open-source tool built with passion to help improve the interview process.
                If you find it valuable and would like to support continued development and new features,
                consider buying me a coffee! ☕
              </p>

              <div className="flex justify-center mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 glow group px-8 py-4 text-lg"
                  onClick={() => window.open('https://buymeacoffee.com/programmerraja', '_blank')}
                >
                  <Coffee className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Buy Me a Coffee
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  <span>Every contribution helps keep this project alive and growing!</span>
                </div>
              </div>

              {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-4">
                  <div className="text-2xl mb-2">💡</div>
                  <p className="text-sm text-gray-600">Fund new features</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl mb-2">🔧</div>
                  <p className="text-sm text-gray-600">Maintain & improve</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl mb-2">🌟</div>
                  <p className="text-sm text-gray-600">Keep it free for everyone</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section id="testimonials" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Interviewers Say</h2>
              <p className="text-sksy-500 max-w-2xl mx-auto">
                Hear from professionals who have transformed their interview
                process with our tool.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="This extension has saved me hours of preparation time. The questions it generates are spot-on and help me assess candidates more effectively."
                author="Sarah Johnson"
                role="Technical Recruiter"
              />
              <TestimonialCard
                quote="The feedback tracking feature is a game-changer. I can focus on the candidate instead of taking notes, and still have comprehensive documentation."
                author="Michael Chen"
                role="Engineering Manager"
              />
              <TestimonialCard
                quote="The PDF reports look so professional. Our HR team loves the consistency and detail they provide for candidate evaluations."
                author="Jessica Williams"
                role="HR Director"
              />
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

          <div className="container text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                Ready to Transform Your Interview Process?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Join thousands of professionals who are conducting better
                interviews and making smarter hiring decisions with AI-powered assistance.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 glow group px-8 py-4 text-lg"
                >
                  <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  <a href="/hirezen/hirezen.zip" download={"hirezen.zip"} className="flex items-center">
                    Download Chrome Extension
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="default"
                  className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300 font-semibold"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">HireZen</h3>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-400" />
                <span className="text-sm">Making interviews better</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            &copy; {new Date().getFullYear()} HireZen. All rights reserved.
          </div>
        </div>
      </footer> */}
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 card-hover group">
      <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="text-center group">
      <div className="relative">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
          {number}
        </div>
        <div className="absolute -inset-2 bg-gradient-to-r rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// interface TestimonialCardProps {
//   quote: string;
//   author: string;
//   role: string;
// }

// function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
//   return (
//     <div className=" p-6 rounded-lg shadow-md border border-gray-100">
//       <div className="mb-4 text-emerald-600">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="h-8 w-8 opacity-50"
//         >
//           <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
//           <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
//         </svg>
//       </div>
//       <p className="text-sksy-500 mb-4">{quote}</p>
//       <div>
//         <p className="font-bold">{author}</p>
//         <p className="text-sm text-gray-500">{role}</p>
//       </div>
//     </div>
//   );
// }
