import QRCode from "react-qr-code";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

interface Props {
  hash?: string
  name?: string
  style?: any
}

const QrCodeBox = ({ hash, name, style }: Props) => {

  const downloadQrCode = () => {
    const svg = document.getElementById("QRCode");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width + 50;
        canvas.height = img.height + 50;
        ctx?.drawImage(img, 25, 25);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = name ? name : "QRCode";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  }

  return (<>
      {hash
        ? <QRCode
          id="QRCode"
          style={{ width: 300, height: 300, padding: '0.7rem', backgroundColor: '#fff', ...style }}
          size={400}
          value={hash}
          onClick={downloadQrCode}
        />
        : <QrCodeScannerIcon style={{ width: 370, height: 370 }} color={'disabled'}/>
      }
    </>
  );
};

export default QrCodeBox;