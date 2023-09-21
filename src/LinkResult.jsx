import axios from "axios";
import { useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
    //     setShortenLink(res.data.result.full_short_link);
    //   } catch(err) {
    //     setError(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // }

    // try {
    //   const response = await axios.post('http://localhost:3000/url/shorten', {
    //     longUrl: inputValue
    //   });

    //   // Assuming the server responds with the shortened URL
    //   setShortenLink(response.data.shortUrl);
    // } catch (err) {
    //   setError(err);
    // } finally {
    //   setLoading(false);



    try {
      console.log("input balue",inputValue)
      const response = await fetch('http://localhost:5000/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           longUrl:inputValue
           }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('backend r3esponse',data)
        // setShortUrl(data.shortUrl);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="noData">Loading...</p>
  }
  if (error) {
    return <p className="noData">Something wne t wrong :(</p>
  }


  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard
            text={shortenLink}
            onCopy={() => setCopied(true)}
          >
            <button className={copied ? "copied" : ""}>Copy to Clipboard</button>
          </CopyToClipboard>
        </div>
      )}
    </>
  )
}

export default LinkResult