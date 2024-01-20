// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "./ui/button";

// const Qr = ({ id }: { id: string }) => {
//   const [qrCodeImage, setQrCodeImage] = useState("");

//   useEffect(() => {
//     const generateQRCode = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://faceshare.vercel.app/${id}&color=fff&bgcolor=000000`,
//           {
//             responseType: "arraybuffer", // Ensure binary data is correctly received
//           }
//         );

//         const base64Image = Buffer.from(response.data, "binary").toString(
//           "base64"
//         );
//         setQrCodeImage(base64Image);
//       } catch (error) {
//         console.error("Error generating QR code:", error);
//       }
//     };

//     generateQRCode();
//   }, [id]);

//   const handleDownload = () => {
//     // Create an anchor element
//     const downloadLink = document.createElement("a");

//     // Set the href attribute with the data URL of the QR code image
//     downloadLink.href = `data:image/png;base64,${qrCodeImage}`;

//     // Set the download attribute with the desired file name
//     downloadLink.download = "faceshare_qr.png";

//     // Append the link to the body and trigger the click event
//     document.body.appendChild(downloadLink);
//     downloadLink.click();

//     // Remove the link from the DOM
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div>
//         {qrCodeImage ? (
//           <Image
//             width={250}
//             height={250}
//             src={`data:image/png;base64,${qrCodeImage}`}
//             alt={id}
//             className="w-60 h-60"
//           />
//         ) : (
//           <Skeleton className="w-60 h-60" />
//         )}
//       </div>
//       <p className="mt-5 text-nowrap">faceshare.vercel.app/{id}</p>
//       <Button className="mt-4 w-full" onClick={handleDownload}>
//         Download
//       </Button>
//     </div>
//   );
// };

// export default Qr;

import React, { useEffect, useState } from "react";
import axios from "axios";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import domtoimage from "dom-to-image";

const Qr = ({ id }: { id: string }) => {
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const response = await axios.get(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://faceshare.vercel.app/${id}&color=fff&bgcolor=000000`,
          {
            responseType: "arraybuffer", // Ensure binary data is correctly received
          }
        );

        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        setQrCodeImage(base64Image);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [id]);

  const handleQrCodeLoad = () => {
    setQrCodeLoaded(true);
  };

  const handleDownload = () => {
    if (!qrCodeLoaded || !qrCodeImage) {
      console.error("QR code not loaded yet.");
      return;
    }

    const downloadContainer = document.createElement("div");

    // Create a new HTML template for download
    const downloadTemplate = `
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FaceShare QR Code</title>
    <style>
      body {
        font-family: "Arial", sans-serif;
        margin: 0;
        display: flex;
        justify-items: center;
        align-items: center;
        padding: 0;
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 1080px;
        height: 1920px;
        margin: 0 auto;
        padding: 20px;
        background-color: #000000;
        color: white;
      }

      h1 {
        color: #0070f3;
      }

      strong {
        font-weight: bold;
        color: #0070f3;
      }

      p {
        margin: 10px 0;
      }

      .icon {
        width: 60px;
        padding: 0 0.7rem 0 0;
      }

      .box0 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .box1 {
        padding: 3rem 0 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
      }

      .qr {
        width: 25rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box0">
        <img
          class="qr"
          src="data:image/png;base64,${qrCodeImage}"
          alt="qr-code"
        />
        <div class="box1">
          <p>faceshare.vercel.app/${id}</p>
        </div>
      </div>
    </div>
  </body>
</html>

    `;

    downloadContainer.innerHTML = downloadTemplate;
    document.body.appendChild(downloadContainer);

    // Use dom-to-image to convert the container content to a data URL
    domtoimage
      .toPng(downloadContainer)
      .then((dataUrl: any) => {
        // Create an anchor element
        const link = document.createElement("a");

        // Set the href attribute with the data URL
        link.href = dataUrl;

        // Set the download attribute with the desired file name
        link.download = "faceshare_template.png";

        // Append the link to the body and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the DOM
        document.body.removeChild(link);

        // Remove the hidden div
        document.body.removeChild(downloadContainer);
      })
      .catch((error: any) => {
        console.error("Error generating image:", error);
        // Cleanup on error
        document.body.removeChild(downloadContainer);
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div>
          {qrCodeImage ? (
            <NextImage
              width={250}
              height={250}
              src={`data:image/png;base64,${qrCodeImage}`}
              alt={id}
              className="w-60 h-60"
              onLoad={handleQrCodeLoad}
            />
          ) : (
            <Skeleton className="w-60 h-60" />
          )}
        </div>
        <p className="mt-5 text-nowrap">faceshare.vercel.app/{id}</p>
        <Button className="mt-4 w-full" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default Qr;
