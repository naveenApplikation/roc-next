import React from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  logoBlack,
  mapBlack,
  mapIcon,
  profileBlack,
  NewLogoRoc,
  homeBlack,
  CloseModal
} from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import GoogleMapComp from "@/components/googleMap/page";
import MapNavigator from "@/components/mapNavigator/page";
import SearchInput from "../../components/searchInput/SearchInput";
import CommonButton from "../button/CommonButton";

const RightSideHeadMenu = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    /* padding: 0px 16px; */
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
`;

const HeaderMapProfileContainer = styled.div`
  display: flex;
  /* align-items:center; */
  gap: 16px;
`;

const MapSection = styled.div<{
  $showMap: boolean;
}>`
  position: relative;
  .googleMap {
    height: 100vh;
    width: ${({ $showMap }) =>
    $showMap
      ? "calc(100vw - 480px)"
      : "calc(100vw - 580px)"}; /* Adjust width based on $showMap */
    transition: width 0.6s ease; /* Adjust transition timing function and duration */
    z-index: 0;
    @media screen and (max-width: 800px) {
      width: 100vw;
    }
    div {
      outline: none !important;
    }
  }
  .mapHeader {
    position: absolute;
    top: 43px;
    z-index: 3;
    width: 100%;
    padding: 0px 10px 0px 10px;
  }

  @media screen and (max-width: 800px) {
    position: fixed;
    top: 0;
    z-index: 2;
  }
`;

const SearchFilterSection = styled.div`
  position: absolute;
  min-height:300px;
  bottom: 410px;
  width: 100%;
  overflow: auto;
  display: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 6px;
  box-shadow: 0px 0px 0px 0px #5229001a;
  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
  }
`;

const MapSearch = styled.div`
  background-color: white !important;
  width: 100%;
  position: absolute;
  bottom: 0px;
  border-radius: 24px 24px 0px 0px;
  box-shadow: 0px -8px 40px 0px #00000040;
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;
const MapBetaContainer = styled.div`
  padding: 10px 24px;
  `

const MapWithMenu = () => {
  const { modalClick, showMap, iconClick } = useMyContext();

  return (
    <MapSection $showMap={showMap}>
      <RightSideHeadMenu className="mapHeader">
        <Image
          style={{ width: "48.615px", height: "48px" }}
          src={NewLogoRoc}
          alt="Logo Outline"
          onClick={() => iconClick("mapClick")}
        />
        <HeaderMapProfileContainer>
          <Image
            style={{ width: "48px", height: "48px" }}
            src={profileBlack}
            alt="Logo Outline"
            onClick={() => modalClick("createAccountModal")}
          />
          <Image
            style={{ width: "48px", height: "48px" }}
            src={homeBlack}
            alt="Logo Outline"
            onClick={() => iconClick("mapClick")}
          />

        </HeaderMapProfileContainer>
      </RightSideHeadMenu>
      <GoogleMapComp />
      <SearchFilterSection>
        <MapNavigator />
      </SearchFilterSection>
      <MapSearch>
        {/* <InputWrapper className="filterInput">
          <SearchInput />
        </InputWrapper> */}

        <MapBetaContainer>
          <HeaderContainer>
            <h4>MAP BETA</h4>
            <Image
              style={{ width: 40, height: 40, cursor: "pointer" }}
              src={CloseModal}
              alt="Logo Outline"
              onClick={() => iconClick("mapClick")}
            />
          </HeaderContainer>
          <MapBetaBody>
            <p style={{ marginBottom: "10px", color: 'black' }} >Coming Soon:</p>
            <ul>
              <li style={{ color: 'black' }} >Filter what’s around you</li>
              <li style={{ color: 'black' }} >Open business profiles in our profile panel</li>
              <li style={{ color: 'black' }} >View categories</li>
            </ul>
            <CloseButton onClick={() => iconClick("mapClick")}>
              <CommonButton className="map_common_btn" text="Close" />
            </CloseButton>
          </MapBetaBody>
        </MapBetaContainer>
      </MapSearch>
    </MapSection>
  );
};

export default MapWithMenu;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h4 {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const MapBetaBody = styled.div`
height:400px;
    p{
      font-size:16px;
      margin-bottom:10px;
    }
    ul{
      padding-left:10px;
      padding-bottom: 30px;
    }
    ul li{
      font-size:16px;
    }
    .map_common_btn{
      p{
        margin-bottom:0px;
      }
      margin-bottom:20px;
    }

`

const CloseButton = styled.div`
  padding-top: 5px;
`;