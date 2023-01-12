import Button, { ButtonColor } from "../../components/Button";
import { NavLink } from "react-router-dom";

export default function MarketingPage() {
  return (
    <div className="flex justify-center flex-col">
      <section
        id="hero"
        className="app-height w-full flex flex-col justify-center items-center relative bg-gradient-to-b from-white to-gray-100"
      >
        <span className="bg-clip-text h-fit py-1 lg:py-3 text-transparent bg-gradient-to-br from-red-600 to-blue-600">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl">
            Find what you need
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-6xl mt-2">
            Right around the corner.
          </h3>
          <span className="w-full flex justify-center items-center mt-16">
            <NavLink to={"/app"}>
              <Button
                buttonColor={ButtonColor.Gold}
                buttonText="Start Browsing Now"
              />
            </NavLink>
          </span>
        </span>
      </section>

      <section
        id="details"
        className="app-height w-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-white"
      >
        <ul className="w-full">
          <li className="bg-blue-400 w-fit px-2 py-4 mb-8 rounded-md shadow-md md:ml-20 mr-auto">
            Advanced Search Feature: Find exactly what you're looking for with
            our powerful search tool.
          </li>
          <li className="bg-blue-400 w-fit px-2 py-4 mb-8 rounded-md shadow-md md:mr-20 ml-auto">
            Geolocation Search: Narrow your search results to a specific area or
            location.
          </li>
          <li className="bg-blue-400 w-fit px-2 py-4 mb-8 rounded-md shadow-md md:ml-20 mr-auto">
            Filter by User Rating: Search for products and services with high
            ratings from other users.
          </li>
        </ul>
      </section>
    </div>
  );
}
