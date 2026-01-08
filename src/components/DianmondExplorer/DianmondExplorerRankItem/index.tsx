import { useHistory } from 'react-router-dom';
import { IAuction } from '../../../types/index';
import BigNumber from 'bignumber.js';
import likeOn from '../../../assets/img/likeOn.png';
import likeOff from '../../../assets/img/likeOff.png';
import { isPropertyAccessChain } from 'typescript';

function LiveAuctionsItem(props: IAuction) {

  return (

    <li>
      <div className="ranklist">
        <div className="contbox">
          <span className="num">{props.rownum}</span>
          <ol>
            <li>
              <span className="frame"><img src={props.img} alt=""/></span>
            </li>
            <li>
              <p>High price</p>
              <p>Total</p>
            </li>
            <li>
              <p><span>{props.currentPrice}</span> DDP</p>
              <p><span>{props.totalBidPrice}</span> DDP</p>
            </li>
            <li>
              <p style={{display:'none'}}>{props.highestBidder}</p>
            </li>
          </ol>
        </div>
      </div>
    </li>

  );
}

export default LiveAuctionsItem;
