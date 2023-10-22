import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { UrlAPI } from "../../api/global";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const CreatedUrls = () => {
  const [urlData, setUrlData] = useState([]);

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleRedirect = (shortUrlId) => {
    axios.get(`/api/redirect/${shortUrlId}`).catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    const fetchUrlData = async () => {
      try {
        const response = await axiosPrivate.get(`${UrlAPI}/created-url`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        if (response?.data) {
          console.log(response.data);
          setUrlData(response.data);
        }
      } catch (error) {
        console.error("Created Urls error: ", error);
      }
    };

    fetchUrlData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(`UrlData: ${JSON.stringify(urlData)}`);
  }, [urlData]);

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4 text-white bg-secondary p-2">
        URL Table
      </h4>
      <table className="table table-bordered table-striped table-secondary">
        <thead className="thead-light">
          <tr>
            <th className="text-dark text-center">Original URL</th>
            <th className="text-dark text-center">Shortened URL</th>
            <th className="text-dark text-center">Visit Counts</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {urlData.map((url, index) => (
            <tr key={index}>
              <td className="w-50 text-break">{url.origUrl}</td>
              <td className="w-25 text-break">
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success"
                  onClick={() => handleRedirect(url.shortUrlId)}
                >
                  {url.shortUrl}
                </a>
              </td>
              <td className="w-25 text-success">{url.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatedUrls;
