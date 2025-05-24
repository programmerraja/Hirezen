import { Chrome, FileText, MessageSquare, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">HireZen</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              How It Works
            </a>
            {/* <a
              href="#testimonials"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Testimonials
            </a> */}
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20  from-emerald-50 to-white">
          <div className="container grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Conduct Better Interviews with AI Assistance
              </h1>
              <p className="text-lg text-sksy-500">
                Generate tailored interview questions, track feedback, and
                create professional reports with our Chrome extension powered by
                AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button> */}
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Chrome className="mr-2 h-4 w-4" />{" "}
                  <a href="/hirezen/hirezen.zip" download={"hirezen.zip"}>
                    Download Extension
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1  from-emerald-600 to-teal-600 rounded-lg blur opacity-25"></div>
              {/* <div className="relative  rounded-lg shadow-xl">
                <img
                  src="./placeholder.png?height=100&width=500"
                  alt="HireZen Extension Screenshot"
                  className="rounded-lg w-full"
                />
              </div> */}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-sksy-500 max-w-2xl mx-auto">
                Our AI-powered extension streamlines the interview process from
                preparation to reporting.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-emerald-600" />}
                title="AI Question Generation"
                description="Generate relevant interview questions based on the candidate's resume and the position requirements."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-emerald-600" />}
                title="Feedback Tracking"
                description="Record and organize your feedback during the interview in a structured format."
              />
              <FeatureCard
                icon={<Printer className="h-10 w-10 text-emerald-600" />}
                title="Professional Reports"
                description="Generate professional PDF reports to share with HR and other stakeholders."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-sksy-500 max-w-2xl mx-auto">
                Our extension simplifies the interview process in just a few
                steps.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <StepCard
                number="1"
                title="Enter Details"
                description="Input the interview name, candidate details, and position requirements."
              />
              <StepCard
                number="2"
                title="Upload Resume"
                description="Upload the candidate's resume for AI analysis."
              />
              <StepCard
                number="3"
                title="Generate Questions"
                description="Get tailored interview questions based on the candidate's profile."
              />
              <StepCard
                number="4"
                title="Record & Export"
                description="Add your feedback and export a professional PDF report."
              />
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
        <section className="py-20  text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Interview Process?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join thousands of professionals who are conducting better
              interviews and making smarter hiring decisions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className=" text-emerald-600 hover:bg-gray-100"
              >
                <Chrome className="mr-2 h-4 w-4" />
                <a href="/hirezen/hirezen.zip" download={"hirezen.zip"}>
                  Download Chrome Extension
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white bg-emerald-700"
              >
                Learn More
              </Button>
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
    <div className=" p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sksy-500">{description}</p>
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
    <div className="text-center">
      <div className=" text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold bg-emerald-600">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sksy-500">{description}</p>
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
