import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Qr = ({ id }: { id: string }) => {
  const [qrCodeImage, setQrCodeImage] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const response = await axios.get(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://face-share.vercel.app/${id}&color=fff&bgcolor=121212`,
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

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        width={160}
        height={160}
        src={`data:image/png;base64,${qrCodeImage}`}
        alt={id}
      />
      <p className="mt-5">face-share.vercel.app/{id}</p>
    </div>
  );
};

export default Qr;
