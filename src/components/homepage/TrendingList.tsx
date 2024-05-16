import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { community } from "@/app/utils/data";
import Image from "next/image";
import CommonButton from "@/components/button/CommonButton";
import { skeletonItems } from '@/app/utils/date'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface DashboardProps {
  modalClick?: any;
  menuClick?: any;
  listData?: any;
  loader: boolean;
}

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 40px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const CommunityContainer = styled.div`
  display: flex;
  width: 80px;
  padding: 0px 8px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: end;
  gap: 8px;
  flex-shrink: 0;
  height: 80px;
  border-radius: 8px;
  background: #bb6bd9;

  p {
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
  }
`;

const TrendingList: React.FC<DashboardProps> = ({ modalClick, menuClick, listData, loader }) => {

  const clickOnCreate = () => {
    const loginToken = typeof window !== "undefined" ? window.localStorage.getItem("loginToken") : null;
    if (loginToken) {
      menuClick("AddToCreate")
    } else {
      modalClick("LoginSignupModal")
    }
  }

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Trending Lists", true, "category-item")}
        title="Trending Lists"
      />
      
      <ScrollingMenu>
        {loader
          ? skeletonItems.map((item, index) => (
            <div key={index}>
              <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
            </div>
          ))
          :
          listData.length ? listData.map((item: any, index: any) => {
            return (
              <CommunityContainer
                key={index}
                style={{ background: item?.bgColor, cursor: 'pointer' }}
                onClick={() => menuClick(item?.listName, false, item?._id)}
              >
                {/* <Image src={item?.image} alt="right icon" />  */}
                <p style={{textAlign:"end"}}> {item?.image}</p>
                <p>{item?.listName}</p>
              </CommunityContainer>
            );
          }) : ""}
      </ScrollingMenu>
      <div
        style={{ padding: "0px 40px" }}
        onClick={() => clickOnCreate()}
      >
        <CommonButton text="Create a List" />
      </div>
    </>
  );
};

export default TrendingList;
