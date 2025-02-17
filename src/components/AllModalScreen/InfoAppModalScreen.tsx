import React, { useEffect, useRef, useState } from "react";
import DirectionModalLayout from "@/components//modal/Modal";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { Spin } from "antd";
import Link from "next/link";
import styled from "styled-components";

interface InfoAppProps {
  showMap: boolean;
}

const appInfoName = [
  "weather",
  "tides",
  "parking",
  "news",
  "taxis",
  "sos",
  "radio",
];

const InfoAppScreen: React.FC<InfoAppProps> = ({ showMap }) => {
  const [frameLoaded, setFrameLoaded] = useState<boolean>(false);

  const { modalName, closeModal, modalClick, dataDetails, modalType, appName } =
    useMyContext();
  const [linkData, setLinkData] = useState("");

  const [loader, setloader] = useState(false);

  const formatNameWithSpaces = (name: any) => {
    // Use a regular expression to split the string into words
    // and then join them with spaces
    return name.replace(/([A-Z])/g, ' $1').trim();
  };

  const fetchDataAsync = async () => {
    try {
      setloader(true);
      const result = await Instance.get("/nav-links");
      if (result.status === 200) {
        setloader(false);
        setLinkData(result.data.data[0]);
      } else {
        setloader(false);
      }
    } catch (error: any) {
      setloader(false);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [appName]);

  useEffect(() => {
    const data = appInfoName.includes(appName);
    setFrameLoaded(data);
  }, [appName]);

  return (
    <>
      <DirectionModalLayout
        isOpen={modalType.infoApp}
        onClose={() => closeModal("infoApp")}
        name="infoApp"
        {...{ showMap }}
        title={formatNameWithSpaces(appName)}
      >
        {loader ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "500px",
            }}
          >
            <Spin tip="Loading" size="large" />
          </div>
        ) : (
          <div style={{ height: "84vh", width: "100%", overflow: 'hidden' }}>
            {/* {
                frameLoaded ?
                  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', background: '#2F80ED1F', margin: '25px', padding: '25px', borderRadius: '4px' }}>
                    <p style={{ fontSize: '16px', fontWeight: '600' }}>BETA:</p>
                    <p style={{ fontSize: '16px' }}>The below button will open <span style={{ textTransform: "capitalize" }}>‘{appName}’</span> in an external website. </p>
                    <p style={{ fontSize: '16px', fontWeight: '600' }}>Make sure to tap the back arrow to head back to ROC.</p>
                    <LInkBtn href={linkData[appName]} target="_blank">Open to <span style={{ textTransform: "capitalize" , color:"white" }}> {appName} </span></LInkBtn>
                  </div>
                  :
                  <iframe
                    style={{ border: 'none' }}
                    src={linkData[appName]} height="500px" width="100%" title={appName}>
                  </iframe>
              } */}
            <iframe
              style={{ border: "none", height: "100%", overflow: 'hidden' }}
              src={linkData[appName]}
              height="500px"
              width="100%"
              title={appName}
              className="iframe_body"
            ></iframe>
          </div>
        )}
      </DirectionModalLayout>
    </>
  );
};

export default InfoAppScreen;

const LInkBtn = styled.a`
  margin-top: 20px;
  text-align: center;
  /* height: 15px; */
  background: #2f80ed;
  padding: 10px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
`;
