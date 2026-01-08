import { useHistory } from 'react-router-dom';
import { IAuction } from '../../../types/index';
import BigNumber from 'bignumber.js';
import likeOn from '../../../assets/img/likeOn.png';
import likeOff from '../../../assets/img/likeOff.png';

function LiveAuctionsItem(props: IAuction) {
  const history = useHistory();

  return (

    <div className="ContFrame" style={{ cursor: 'pointer' }} onClick={async () => {history.push(`/itemdetails/${props.auctionId}/Y`);window.scrollTo(0, 0);}}>
      <span className="frame"><img src={props.img} alt=""/></span>
      <div className="textArea">
        <p className="nftName">
          <span>{props.auctionTitle}</span>
          <span className="likeArea on">
            <em className="frame"><img src={likeOn} alt=""/></em>
          </span>
        </p>
        <p><span>Highest</span><span><em>{props.currentPrice}</em>DDP</span></p>
        <p><span>Buy now</span><span>Current Price</span></p>
        <p><span><em>{props.buyNowPrice}</em>DDP</span><span><em>{props.currentPrice}</em>DDP</span></p>
      </div>
    </div>

  );
}

export default LiveAuctionsItem;
