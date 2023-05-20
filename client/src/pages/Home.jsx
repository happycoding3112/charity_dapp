import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typed from "react-typed"
import Aos from "aos";
import "aos/dist/aos.css"


const Home = () => {

  useEffect(() => {
    Aos.init(
      {
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
        mirror: "true"
      }
    );
  })

  const navigate = useNavigate()

  const text = ["Let's build a better world one step at a time!"]

  return (
    <div className="min-h-screen g-gray-900 pt-28">
      <section
        className="flex items-center text-center text-white mt-6 py-14 px-8 mx-8 gap-4 bg-gradient-to-r
        from-sky-600 via-sky-700 to-black">
        <div className="flex w-1/2 justify-center flex-col" data-aos="fade-right">
          <h1 className="text-4xl tracking-tight font-bold mb-6 uppercase">
            <Typed
              strings={text}
              typeSpeed={50}
              loop
            />
          </h1>
          <div className="flex justify-center">
            <button
              className="bg-green-600 text-white text-2xl font-bold uppercase rounded-md py-2 px-8 hover:bg-green-500 my-10"
              onClick={() => navigate("/viewCamps")}>
              CLICK HERE TO DONATE!
            </button>
          </div>
          <p
            className="text-xl">To be able to create campaigns first Register your NGO
          </p>
          <p
            className="text-xl">If you already have an account Login to create campaigns!
          </p>
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              className="bg-green-600 text-white font-bold uppercase rounded-md p-2 hover:bg-green-500 w-36"
              onClick={() => navigate("/registerNGO")}
            >
              REGISTER
            </button>
            <button
              className="bg-green-600 text-white font-bold uppercase rounded-md p-2 hover:bg-green-500 w-36"
              onClick={() => navigate("/ngoLogin")}
            >
              LOGIN
            </button>
          </div>
        </div>
        <div className="flex w-1/2 justify-center" data-aos="flip-right">
          <img width="400px" src="/assets/img.png" alt="/assets/img.png" />
        </div>
      </section>

      <section
        className="flex flex-row-reverse items-center text-center text-blue-900 py-14 px-8 mx-8 gap-4 bg-gradient-to-r
        from-sky-200 via-sky-400 to-sky-200 my-2">
        <div className="flex w-1/2 justify-center flex-col" data-aos="fade-left">
          <h1 className="text-4xl tracking-tight font-bold mb-6 uppercase">
            About Us!
          </h1>
          <p className="text-xl text-left font-semibold">
            Blockchain technology is revolutionizing the way we approach charitable giving.
            <br />
            <br />
            Cause✌️Care is a blockchain-based charity tracking application which is designed to help donors and NGOs collaborate in a more streamlined and accountable way.
            <br />
            <br />
            With our platform, donors can easily make contributions and track the impact of their donations in real time, while NGOs can access comprehensive data on donations, expenditures, and impact.
            <br />
            <br />
            Cause✌️Care platform is built on a foundation of transparency, accountability, and efficiency, allowing us to create a more equitable and effective system for charitable giving.
          </p>
        </div>
        <div className="flex w-1/2 justify-center" data-aos="flip-left">
          <img width="400px" src="/assets/img2.png" alt="/assets/img2.png" />
        </div>
      </section>

      <div className="text-white py-14 px-8 mx-8 gap-4 bg-gradient-to-l
        from-sky-600 via-sky-700 to-black">
        <h1 className="text-4xl tracking-tight font-bold mb-6 uppercase text-center">
          What we provide
        </h1>
        <section
          className="flex items-center justify-around text-center text-white gap-4">
          <div className="flex w-1/3 justify-center items-left flex-col p-4" data-aos="fade-right">
            <h1 className="text-4xl tracking-tight font-bold uppercase text-white">
              NGO
            </h1>
            <ol className="text-left ml-4">
              <li className="gap-4 my-4 flex items-center text-xl">
                <span className="text-2xl font-semibold h-12 w-12 bg-white bg-opacity-25 rounded-2xl p-2 text-white">01</span>
                Create Campaigns
              </li>
              <li className="gap-4 my-4 flex items-center text-xl">
                <span className="text-2xl font-semibold h-12 w-12 bg-white bg-opacity-25 rounded-2xl p-2 text-white">02</span>
                Easily track all the campaigns and their status
              </li>
              <li className="gap-4 my-4 flex items-center text-xl">
                <span className="text-2xl font-semibold h-12 w-12 bg-white bg-opacity-25 rounded-2xl p-2 text-white">03</span>
                View who donated to the campaigns
              </li>
              <li className="gap-4 my-4 flex items-center text-xl">
                <span className="text-2xl font-semibold h-12 w-12 bg-white bg-opacity-25 rounded-2xl p-2 text-white">04</span>
                Edit or Delete the campaigns
              </li>
            </ol>
          </div>
          <div className="flex w-1/3 justify-center items-left flex-col p-4" data-aos="fade-left">
            <h1 className="text-4xl tracking-tight font-bold uppercase text-white">
              DONOR
            </h1>
            <ol className="text-left ml-4">
              <li className="gap-4 my-4 flex items-center text-xl">
                <span className="text-2xl font-semibold h-12 w-12 bg-white bg-opacity-25 rounded-2xl p-2 text-white">01</span>
                Connect to their CryptoWallet
              </li>
              <li className="gap-4 my-4 flex items-center text-xl">
                <span className="text-2xl font-semibold h-12 w-12 bg-white bg-opacity-25 rounded-2xl p-2 text-white">02</span>
                Search for Campaigns and view the Campaign details
              </li>
              <li className="gap-4 my-4 flex items-center text-xl">
                <span className="text-2xl font-semibold h-12 w-12 bg-white bg-opacity-25 rounded-2xl p-2 text-white">03</span>
                Track the impact of their donations in real-time
              </li>
              <li className="gap-4 my-4 flex items-center text-xl">
                <span className="text-2xl font-semibold h-12 w-12 bg-white bg-opacity-25 rounded-2xl p-2 text-white">04</span>
                Make Donations to the campaigns
              </li>
            </ol>
          </div>
        </section>
      </div>

      <div className="py-4 flex justify-center items-center h-10 bg-gray-900 text-white">
        ©Copyright Cause✌️Care
      </div>

    </div>
  );
};

export default Home;
