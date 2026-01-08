import React, { useEffect } from 'react';
import contracts from '../../constants/contracts';
import { IAuction } from '../../types/index';
import { getTokenInfo } from '../../utils';

import { getMainWidth, handleTitle } from '../../utils';
import { ExploreIcon2, ExploreIcon3 } from '../../utils/allImgs';

import Breadcrumb from '../../components/Breadcrumb';
import SecNewListed from '../../components/SecNewListed';
import SecLiveAuctions from '../../components/SecLiveAuctions';
import SectionHeading from '../../components/SectionHeading';

import sampleImage from '../../assets/img/sample.png';
import sampleImage2 from '../../assets/img/sample2.png';

import '../../assets/css/common.css';
import '../../assets/css/reset.css';
import '../../assets/css/swiper-bundle.css';
import '../../assets/css/style.css';

import $ from 'jquery';

import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import selectedAuctionAtom from '../../atoms/selectedAuction';



const ExploreContainer = () => {

  
  //const [auctions, setAuctions] = React.useState<IAuction[]>([]);
  //const [totalCount, setTotalCount] = React.useState<number>(0);
  //const [offset, setOffset] = React.useState<number>(0);
  //const [limit, setLimit] = React.useState<number>(12);
  //const [isLoadedAll, setIsLoadedAll] = React.useState<boolean>(false);
  //const setSelectedAuction = useSetRecoilState(selectedAuctionAtom);
  const history = useHistory();
 

  $("#explorePage>.content>.itemlistArea>.titleArea>.sortbyArea>a.sortbyBtn").on("click",function(evt){
    if ($(this).hasClass('off')) {
      $(this).removeClass('off').addClass('on').siblings().stop().slideDown('fast');
      $(this).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    } else if ($(this).hasClass('on')) {
      $(this).removeClass('on').addClass('off').siblings().stop().slideUp('fast');
      $(this).children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
    evt.preventDefault();
  });
  
  $("#explorePage>.content>.sortArea>ul>li>a.sortmnuBtn").on("click",function(evt){
    if ($(this).hasClass('off')) {
      $(this).removeClass('off').addClass('on').siblings().stop().slideDown('fast');
      $(this).children('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
    } else if ($(this).hasClass('on')) {
      $(this).removeClass('on').addClass('off').siblings().stop().slideUp('fast');
      $(this).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
    }
    evt.preventDefault();
  });

  


  
/**
  const getAuctions = async () => {
    if (offset > 0 && auctions.length >= totalCount) {
      setIsLoadedAll(true);
      return;
    }

    const result = await contracts.nftMarketContract.methods
      .getOpenAuctions(0, 1, '', offset, limit)
      .call();

    console.log('userAuctions', result);
    const openAuctions = result.resultAuctions;

    const promises = openAuctions.map(async (auction: IAuction) => {
      const tokenInfo = await getTokenInfo(parseInt(auction.tokenId));

      return {
        ...auction,
        tokenInfo,
      };
    });

    const data = await Promise.all(promises);
    console.log(data);
    setOffset(parseInt(result.nextOffset));
    setTotalCount(parseInt(result.totalCount));
    // @ts-ignore
    setAuctions((prev) => [...prev, ...data]);
  };
  */


  useEffect(() => {
    // document.title = 'Explore'
    //handleTitle('Explore');
    getMainWidth();
  }, []);


  return (
      <div id="explorePage">
      <div className="content">
        <div className="sortArea">
          <ul>
            <li><p>Filter<a href="#" className="resetBtn">Reset</a></p></li>
            <li>
              <a href="#" className="sortmnuBtn off">Category<i className="fas fa-chevron-right"></i></a>
              <div className="subsortMnu">
                <ol>
                  <li>
                    <p>All NFTs</p>
                    <input id="sortChk1" type="checkbox" value="All NFTs"/>
                    <label for="sortChk1"><i className="fas fa-check"></i></label>
                  </li>
                  <li><p>Art</p><input id="sortChk2" type="checkbox" value="Art"/><label for="sortChk2"><i className="fas fa-check"></i></label></li>
                  <li><p>Photography</p><input id="sortChk3" type="checkbox" value="Photography"/><label for="sortChk3"><i className="fas fa-check"></i></label></li>
                  <li><p>Collectibles</p><input id="sortChk4" type="checkbox" value="Collectibles"/><label for="sortChk4"><i className="fas fa-check"></i></label></li>
                  <li><p>Music</p><input id="sortChk5" type="checkbox" value="Music"/><label for="sortChk5"><i className="fas fa-check"></i></label></li>
                  <li><p>Sports</p><input id="sortChk6" type="checkbox" value="Sports"/><label for="sortChk6"><i className="fas fa-check"></i></label></li>
                  <li><p>Entertainment</p><input id="sortChk7" type="checkbox" value="Entertainment"/><label for="sortChk7"><i className="fas fa-check"></i></label></li>
                  <li><p>Trading Cards</p><input id="sortChk8" type="checkbox" value="Trading Cards"/><label for="sortChk8"><i className="fas fa-check"></i></label></li>
                </ol>
              </div>
            </li>
          </ul>
        </div>
        <div className="itemlistArea">
          <div className="titleArea">
            <p><span>0</span> items</p>
            <div className="sortbyArea">
              <a href="#" className="sortbyBtn off"><span>Sort by</span> <i className="fas fa-chevron-down"></i></a>
              <ul className="sortbyPop">
                <li><a href="#">Newest</a></li>
                <li><a href="#">Oldest</a></li>
                <li><a href="#">A to Z</a></li>
                <li><a href="#">Z to A</a></li>
                <li><a href="#">Ending Soon</a></li>
              </ul>
            </div>
          </div>
          <div className="sortchkList">
          </div>
          <div className="listArea">
            <ul>
              <li>
                {/*<div className="listCont" onClick={async () => history.push(`/itemdetails/${props.auctionId}`)} >*/}
                <div className="listCont" onClick={async () => history.push(`/itemdetails/123`)} >
                  <span className="frame"><img src={sampleImage} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listCont">
                  <span className="frame"><img src={sampleImage2} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listCont">
                  <span className="frame"><img src={sampleImage} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listCont">
                  <span className="frame"><img src={sampleImage2} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listCont">
                  <span className="frame"><img src={sampleImage} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listCont">
                  <span className="frame"><img src={sampleImage2} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listCont">
                  <span className="frame"><img src={sampleImage} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listCont">
                  <span className="frame"><img src={sampleImage2} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listCont">
                  <span className="frame"><img src={sampleImage} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listCont">
                  <span className="frame"><img src={sampleImage2} alt=""/></span>
                  <div className="txtBox">
                    <p>The title</p>
                    <p>PRICE<span><em>32.1512</em>ETH</span></p>
                    <p>HIGHST<span><em>12.213</em>ETH</span></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="btnArea">
            <a href="#">LOAD MORE</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreContainer;
