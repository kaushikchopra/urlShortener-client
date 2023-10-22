import React, { useState } from "react";
import { UrlAPI } from "../../api/global";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        `${UrlAPI}/short-url`,
        {
          origUrl: originalUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setShortenedUrl(data.shortUrl);
      } else {
        setShortenedUrl("");
      }
    } catch (error) {
      console.error(error);
      setShortenedUrl("Error occurred while shortening the URL.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-dark text-white">URL Shortener</div>
            <div className="card-body">
              <p className="card-text">
                Welcome to our URL Shortener! This tool allows you to convert
                long, cumbersome URLs into shorter, more manageable links.
                Whether you need to share a link or just want to keep things
                tidy, our URL Shortener has you covered. Simply enter your
                original URL, click "Shorten URL," and get a neat and concise
                link in return.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="originalUrl">Original URL:</label>
                  <div className="input-group">
                    <input
                      type="url"
                      className="form-control"
                      id="originalUrl"
                      placeholder="Enter the URL to shorten"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-secondary">
                        Shorten URL
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {shortenedUrl && (
                <div className="mt-3">
                  <p>
                    <strong>Shortened URL:</strong>
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={shortenedUrl}
                      readOnly
                    />
                    <div className="input-group-append">
                      <button
                        className={`btn ${
                          isCopied ? "btn-success" : "btn-secondary"
                        }`}
                        onClick={() => copyToClipboard(shortenedUrl)}
                      >
                        {isCopied ? "Copied!" : "Copy to Clipboard"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
