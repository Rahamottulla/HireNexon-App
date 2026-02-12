import { Link } from "react-router-dom";
import useTitle from "@/shared/hooks/useTitle";

const Home = () => {
  useTitle();

  return (
      <section className="bg-gray-50 min-h-[80vh] flex items-center px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Hero Image */}
          <div className="flex justify-center order-1 md:order-2">
            <img
              src="/images/public/hirenexon-hero.png"
              alt="HireNexon Hero"
              className="w-full max-w-sm md:max-w-md"
            />
          </div>

          {/* Hero Text */}
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              A New Way to Find Opportunities
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              HireNexon helps job seekers and employers connect seamlessly,
              empowering candidates to find the right opportunities faster and
              land their dream jobs. Sign in to access job listings, dashboards,
              and much more.
            </p>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-emerald-600 hover:scale-105"
            >
              Create Account
            </Link>
          </div>

        </div>
      </section>
  );
};

export default Home;
