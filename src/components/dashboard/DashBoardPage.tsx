import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchNFilter from "@/components/homepage/SearchNFilter";
import InfoApp from "@/components/homepage/InfoApp";
import LocalCusine from "@/components/homepage/LocalCusine";
import FamilyEvent from "@/components/homepage/FamilyEvent";
import EnjoyTheSunshine from "@/components/homepage/EnjoyTheSunshine";
import TrendingList from "@/components/homepage/TrendingList";
import TopAttractions from "@/components/homepage/TopAttractions";
import Directory from "@/components/homepage/Directory";
import Bars from "@/components/homepage/Bars";
import Shopping from "@/components/homepage/Shopping";
import Community from "@/components/homepage/Community";
import BeachLife from "@/components/homepage/BeachLife";
import Sustainability from "@/components/homepage/Sustainability";
import Heritage from "@/components/homepage/Heritage";
import Walks from "@/components/homepage/Walks";
import Wellbeing from "@/components/homepage/Wellbeing";
import WW2 from "@/components/homepage/WW2";
import CycleRoutes from "@/components/homepage/CycleRoutes";
import DeliciousDine from "@/components/homepage/DeliciousDine";
import Outout from "@/components/homepage/Outout";
import Surfing from "@/components/homepage/Surfing";
import CommonButton from "@/components/button/CommonButton";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { icons } from "@/app/utils/iconList";
import { ApiResponse } from "@/app/utils/types";
import { iconsHome } from "@/app/utils/homeIcon";

const LeaveFeedbackButton = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 20px;
`;

const DashBoard = () => {
  const specificSectionRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const token = window.localStorage.getItem('token')
  const loginToken = window.localStorage.getItem('loginToken')
  const { showMap, modalClick, dataDetails } = useMyContext();
  const [listData, setListData] = useState<any>([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [data, setData] = useState<any[]>([]);
  const [loader, setloader] = useState(true);

  const fetchDataAsync:any = async () => {
    setloader(true);
    try {
      const response = await Instance.get("/category?limit=10")
      if (response.status === 200) {
        response.data.forEach((list: any) => {
          const matchedIcon = iconsHome.find(icon => icon.name === list.iconName);
          if (matchedIcon) {
            list.image = matchedIcon.image;
          }
        })
        setListData(response?.data)
      } else {
        setListData([])

      }
    } catch (error) {
      setloader(false);
      setListData([])
    }finally {
      setloader(false);
    }
  }

  const menuClick = (item: any, condition?: boolean, id?: any) => {
    if (condition) {
      router.push(`/categories/${item}?search=${id}`);
    } else if (item === "directoryList") {
      router.push("/screens/directoryList");
    } else if (item === "Shop") {
      router.push("/screens/wellbeing");
    } else if (item === "Category") {
      // router.push(`/screens/${item}?categoryID=${id}`);
    } else if (item === "Tours") {
      router.push("/screens/stays");
    } else if (item === "Hotels") {
      router.push("/screens/scaffolding");
    } else if (item === "Activities") {
      router.push("/screens/experiences");
    } else if (item === "Travel") {
      router.push("/screens/attractions");
    } else if (item === "Nightlife") {
      router.push("/screens/financial");
    } else if (item === "AddToCreate") {
      router.push("/screens/createList");
    } else if (item === "CategorieList") {
      router.push("/screens/categorieList");
    } else if (item === "TrendingList") {
      router.push("/screens/trendingList");
    } else if (item === "LeaveFeedback") {
      window.open("https://forms.gle/rMb2fNQPgHiSWPBq7")
    } else {
      router.push(`/screens/${item}?categoryID=${id}`);
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (
      specificSectionRef.current &&
      !specificSectionRef.current.contains(event.target as Node)
    ) {
    }
  };
  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const { filterUrls, showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [homeGoogleLoader, setHomeGoogleLoader] = useState(true);

  const homeGooglefetchDataAsync = async () => {
    setHomeGoogleLoader(true);
    try {
      const result = await Instance.get("/homescreen-google");
      setData(result.data);
    } catch (error: any) {
      console.log(error.message);
      setHomeGoogleLoader(false);
    } finally {
      setHomeGoogleLoader(false);
    }
  };

  useEffect(() => {
    fetchDataAsync()
    homeGooglefetchDataAsync();
  }, []);

  console.log(data[8],"dssdsd")

  return (
    <>
      <SearchNFilter menuClick={menuClick} modalClick={modalClick} />
      <InfoApp menuClick={menuClick} modalClick={modalClick} {...{ showMap }} />
      <LocalCusine menuClick={menuClick} modalClick={modalClick} data={data[0]} loader={homeGoogleLoader} />
      <FamilyEvent menuClick={menuClick} modalClick={modalClick} />
      <EnjoyTheSunshine menuClick={menuClick} modalClick={modalClick} />
      <TrendingList menuClick={menuClick} modalClick={modalClick} {...{ listData }} loader={loader} />
      <TopAttractions menuClick={menuClick} modalClick={modalClick} data={data[7]} loader={homeGoogleLoader} />
      {/* <Directory menuClick={menuClick} modalClick={modalClick} /> */}
      <Bars menuClick={menuClick} modalClick={modalClick} data={data[1]} loader={homeGoogleLoader} listData={listData[0]?._id}  />
      <Shopping menuClick={menuClick} modalClick={modalClick} />
      <BeachLife menuClick={menuClick} modalClick={modalClick} data={data[2]} loader={homeGoogleLoader}  />
      <Community menuClick={menuClick} modalClick={modalClick} {...{ listData }} loader={loader} />
      <Sustainability menuClick={menuClick} modalClick={modalClick} data={data[3]} loader={homeGoogleLoader} />
      {/* <Jerseyisms menuClick={menuClick} modalClick={modalClick} /> not working */}
      <Heritage menuClick={menuClick} modalClick={modalClick} data={data[4]} loader={homeGoogleLoader} />
      <Walks menuClick={menuClick} modalClick={modalClick} />
      <Wellbeing menuClick={menuClick} modalClick={modalClick} />
      {/* <WW2 menuClick={menuClick} modalClick={modalClick} /> */}
      {/* <DeliciousDine menuClick={menuClick} modalClick={modalClick} /> not working */}
      <Outout menuClick={menuClick} modalClick={modalClick} data={data[8]} loader={homeGoogleLoader} />
      <CycleRoutes menuClick={menuClick} modalClick={modalClick} />
      <Surfing menuClick={menuClick} modalClick={modalClick} data={data[6]} loader={homeGoogleLoader} />
      <LeaveFeedbackButton onClick={() => menuClick("LeaveFeedback")}>
        <CommonButton text="Leave feedback" />
      </LeaveFeedbackButton>
      {/* <BetaExploreModal /> */}
    </>
  );
};
export default DashBoard;
// export default DashBoard;
