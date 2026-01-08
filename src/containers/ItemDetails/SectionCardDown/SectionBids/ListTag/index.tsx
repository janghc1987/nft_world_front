import { IBid } from '../../../../../types';
import TimeAgo from 'react-timeago';
import BigNumber from 'bignumber.js';

function ListTag(props: IBid) {
  return (
    <li>
      <p>
        <span>{props.price}</span> DDP <em>by</em> 
        <span>{' '}
              {props.bidder.substr(0, 7)}...
              {props.bidder.substr(props.bidder.length - 7)}
          </span>
        <span style={{paddingLeft:'20px'}} ><TimeAgo date={props.timestamp} /></span>
      </p>
    </li>
  );
}

export default ListTag;
