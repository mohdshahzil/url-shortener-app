import React, { useState } from "react";
import { Input, Button, Spinner, Link } from "@nextui-org/react";
import axios from "axios";
import { motion } from "framer-motion";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    setError(""); // Reset error state
    setLoading(true); // Set loading to true

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHost = "url-shortener-service.p.rapidapi.com";

    const encodedParams = new URLSearchParams();
    encodedParams.set("url", originalUrl);

    const options = {
      method: "POST",
      url: "https://url-shortener-service.p.rapidapi.com/shorten",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setShortenedUrl(response.data.result_url);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      setError("Error shortening URL. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <div className="w-screen flex flex-col gap-4 h-screen items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-white text-5xl mb-2"
      >
        Simplify your URL
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex md:w-2/5 w-96 flex-wrap md:flex-nowrap mb-6 md:mb-0 md:gap-4"
      >
        <Input
          type="url"
          variant="flat"
          label="URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="text-white h-full"
        />
        <Button
          className="md:h-full h-14"
          color="default"
          onClick={shortenUrl}
          disabled={loading} // Disable the button while loading
        >
          {loading ? <Spinner color="white" /> : "Simplify"}
        </Button>
      </motion.div>
      {shortenedUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white mt-4 text-2xl">
            Shortened URL:{" "}
            <Link className="text-2xl" isExternal href={shortenedUrl}>
              {" "}
              {shortenedUrl}{" "}
            </Link>{" "}
          </p>
        </motion.div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <footer className="text-white fixed bottom-0 w-full p-2 flex items-center justify-center mb-2 ">
        Made with ❤️ by Mohammad Shahzil
      </footer>
    </div>
  );
};

export default App;
