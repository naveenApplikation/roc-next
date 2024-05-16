import React, { useEffect, useState } from "react";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import Instance from "@/app/utils/Instance";
import ShopBrachSkeleton from "@/components/skeleton Loader/ShopBrachSkeleton";
import { skeletonItems } from '@/app/utils/date'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import fallback from '../../../assets/images/fallbackimage.png'

interface DashboardProps {
  modalClick?: any;
  menuClick?: any;
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

const WalkContainer = styled.div`
  height: 120px;
  min-width: 120px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.01);
  display: flex;
  align-items: end;
  flex-direction: column;
  position: relative;

  justify-content: space-between;
  p {
    color: white;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    position: absolute;
    bottom: 8px;
    left: 12px;
  }
  img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
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

const ImageTag = styled.img`
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  height: 100%;
`;

const Shopping: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  const { filterUrls, showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    try {
      const result = await Instance.get("/shopping-lists");
      setData(result.data);
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);



  const ImageUrlData = data.map((item) => item?.acf?.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <MenuDetails isOpen={() => menuClick("Shopping", true, "shopping-lists")} title="Shopping" />
      <ScrollingMenu>
        {loader
          ? skeletonItems.map((item, index) => (
            <div key={index}>
              <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
            </div>
          ))
          :
          data.length ? data.map((item: any, index: any) => {
            return (
              <CommunityContainer
                key={index}
                style={{ background: item?.bgColor, cursor: 'pointer' }}
                onClick={() => menuClick(item?.listName, false, item?.categoryId)}
              >
                <p>{item?.image}</p>
                <p>{item?.listName}</p>
              </CommunityContainer>
            );
          }) : ""}
      </ScrollingMenu>
    </>
  )
};

export default Shopping;
