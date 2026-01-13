import { useEffect } from 'react';
import { getMainWidth, handleTitle } from '../../utils';
import MainHeader from './MainHeader';
import SecLiveAuctions from '../../components/SecLiveAuctions';
import SecHotBid from '../../components/SecHotBid';
import DianmondExplorer from '../../components/DianmondExplorer';
import ArtworkRank from '../../components/ArtworkRank';
import DigitalArtExplorer from '../../components/DigitalArtExplorer';
import React from 'react';

import '../../assets/css/common.css';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';

import diaOn from '../../assets/img/diaOn.png';
import diaOff from '../../assets/img/diaOff.png';
import puzzleOn from '../../assets/img/puzzleOn.png';
import puzzleOff from '../../assets/img/puzzleOff.png';
import bcOn from '../../assets/img/bcOn.png';
import bcOff from '../../assets/img/bcOff.png';

import ftimg1 from '../../assets/img/ftimg1.png';
import ftimg2 from '../../assets/img/ftimg2.png';
import ftimg3 from '../../assets/img/ftimg3.png';
import ftimg4 from '../../assets/img/ftimg4.png';

import $ from 'jquery';
import { useRecoilState } from 'recoil';
import auctionCategoryAtom from '../../atoms/auctionCategory';
import { useHistory } from 'react-router-dom';

const HomeContainer = () => {
  
  const [auctionCategory, setAuctionCategory] = useRecoilState(auctionCategoryAtom);
  const history = useHistory();
  const [offset, setOffset] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(10);


  const goAuction = async (category) => {
    
		setAuctionCategory(Number(category));
    setOffset(0);
    setLimit(8);
		history.push("/auction");
		
	};

  useEffect(() => {
    handleTitle('WORLD-NFT');
    getMainWidth();
  }, []);
  

  return (

    <section>
      <div className="mainPage" style={{display:'block'}}>
        <MainHeader />
        <div style={{display: 'block', width: '100%', height: '50px', backgroundColor:"#F5F6FA"}}></div>
        <DianmondExplorer/>
        <ArtworkRank/>
        <DigitalArtExplorer/>
        <SecLiveAuctions />
        <SecHotBid />

        <div className="secCont7">
          <div className="contInner">
            <div className="contBox">
              <div className="box1">
                <p>How to enjoy with WORLD</p>
              </div>
              <div className="box2">
                <ul>
                  <li>
                    <span className="frame"><img src={ftimg1} alt=""/></span>
                    <p>Connect your Wallet</p>
                    <div className="txtbox">
                      <p>Once you’ve connected</p>
                      <p>your Metamask wallet</p>
                      <p>to WORLD, you are</p>
                      <p>ready to buy NFTs.</p>
                      <p> &nbsp; </p>
                    </div>
                  </li>
                  <li>
                    <span className="frame"><img src={ftimg2} alt=""/></span>
                    <p>Exchange to DUCKY</p>
                    <div className="txtbox">
                      <p>In order to trade NFT,</p>
                      <p>you need DUCKY.</p>
                      <p>You can get DUCKY by</p>
                      <p>exchanging from ETH</p>
                      <p>or DDS.</p>
                    </div>
                  </li>
                  <li>
                    <span className="frame"><img src={ftimg3} alt=""/></span>
                    <p>How to Buy & Sell</p>
                    <div className="txtbox">
                      <p>Buy or bid for your favorite</p>
                      <p>NFTs with DUCKY only.</p>
                      <p>Sell your NFTs</p>
                      <p>curated by WORLD.</p>
                      <p> &nbsp; </p>
                    </div>
                  </li>
                  <li>
                    <span className="frame"><img src={ftimg4} alt=""/></span>
                    <p>Certificate / Delivery</p>
                    <div className="txtbox">
                      <p>You can check the</p>
                      <p>certificate from your</p>
                      <p>profile.</p>
                      <p>For delivery, please</p>
                      <p>contact us by e-mail.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="contBox2">
              <div className="box1">
                <p>Explorer</p>
              </div>
              <div className="box2">
                <ul>
                  <li>
                    <a href="#none" onClick={()=> {goAuction(1);window.scrollTo(0, 0);}}>
                      <span className="frame type1"><img src={diaOn} alt=""/></span>
                      <span className="frame type2"><img src={diaOff} alt=""/></span>
                      <span className="txt">ORIGINAL</span>
                    </a>
                  </li>
                  <li>
                    <a href="#none" onClick={()=> {goAuction(2);window.scrollTo(0, 0);}}>
                      <span className="frame type1"><img src={puzzleOn} alt=""/></span>
                      <span className="frame type2"><img src={puzzleOff} alt=""/></span>
                      <span className="txt">ART</span>
                    </a>
                  </li>
                  <li>
                    <a href="#none" onClick={()=> {goAuction(3);window.scrollTo(0, 0);}}>
                      <span className="frame type1"><img src={bcOn} alt=""/></span>
                      <span className="frame type2"><img src={bcOff} alt=""/></span>
                      <span className="txt">ITEM</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default HomeContainer;
