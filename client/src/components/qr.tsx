import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const Qr = ({ id }: { id: string }) => {
  const [qrCodeImage, setQrCodeImage] = useState("");

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

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        {qrCodeImage ? (
          <Image
            width={250}
            height={250}
            src={`data:image/png;base64,${qrCodeImage}`}
            alt={id}
            className="w-60 h-60"
          />
        ) : (
          <Skeleton className="w-60 h-60" />
        )}
      </div>
      <p className="mt-5 text-nowrap">faceshare.vercel.app/{id}</p>
    </div>
  );
};

export default Qr;
