export interface IItem {
  id: number;
  title: string;
  description: string;
  category: number;
  img: string;
  isApproved: boolean;
  owner: string;
  nftLink : string;
  profilePath : string;
}

export interface IBid {
  bidId: string;
  bidder: string;
  price: string;
  timestamp: string;
}


export interface IBids {
  data: Array<IBid>;
}


export interface IAuction {
  auctionId: string;
  auctionTitle: string;
  auctionTypes: any;
  buyNowPrice: string;
  contractAddress: string;
  currentPrice: string;
  startPrice: string;
  expiryDate: string;
  highestBidder: string;
  totalBidPrice: string;
  seller: string;
  tokenId: string;
  tokenInfo?: IItem;
  mnb_nft_master?: IItem;
  biddingList?: Array<IBid>;
  img: string;
  favoriteYn: String;
  nftLink: String;
  categoryNm: String;
  category: String;
  description: String;
  rownum: String;
  status: String;
  profilePath: String;
}


export interface swapHistory {
  swapDate: string;
  swap_from: string;
  swap_to: string;
  from_amount: string;
  to_amount: string;
  txid: string;
}

