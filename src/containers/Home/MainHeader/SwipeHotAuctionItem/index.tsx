import { NavLink, useHistory } from 'react-router-dom';
import { IAuction } from '../../../../types/index';
import { SecLiveAuctionsIconfire } from '../../../../utils/allImgs';
import TimeAgo from 'react-timeago';
import { useSetRecoilState } from 'recoil';
import selectedAuctionAtom from '../../../../atoms/selectedAuction';
import BigNumber from 'bignumber.js';

import sample1 from '../../../../assets/img/sample1.png'
import puzzle from '../../../../assets/img/puzzle.png'
import diamond from '../../../../assets/img/photo.png';
import artwork from '../../../../assets/img/mnu2.png';
import digitalArt from '../../../../assets/img/mnu3.png';


function SwipeHotAuctionItem(props: IAuction) {
  const setSelectedAuction = useSetRecoilState(selectedAuctionAtom);
  const history = useHistory();
  let logoImg = puzzle;


  if(props.category === '1'){
    logoImg = diamond;
  }else if(props.category === '2'){
    logoImg = artwork;
  }else if(props.category === '3'){
    logoImg = digitalArt;
  }


  return (

    <li id={props.auctionId} >
      <div className="nftCont">
        <div className="ContFrame">
          <div className="timerArea" style={{display:'none'}}>
          <span >08</span><em>:</em><span>59</span><em>:</em><span>59</span>
          </div>
          <span className="frame">
            <img src={props.img} alt=""/>
            <input className='auctionTitle' type='hidden' value={props.auctionTitle} />
            <input className='buyNowPrice' type='hidden' value={props.buyNowPrice} />
            <input className='currentPrice' type='hidden' value={props.currentPrice} />
            <input className='description' type='hidden' value={props.description} />
          </span>
          <div className="infoArea">
            <span className="frame"><img src={props.profilePath !== null ? props.profilePath : sample1} alt=""/></span>
            <div className="txtbox">
              <p className="omit">{props.auctionTitle}</p>
              {/*<p className="omit">by {NFT title artist}</p>*/}
            </div>
            <div className="cateArea" >
              <span className="frame"><img src={logoImg} alt=""/></span>
              <em>{props.categoryNm}</em>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SwipeHotAuctionItem;
