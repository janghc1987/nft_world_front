import { NavLink } from "react-router-dom";
import ITag from '../../ITag'
import './SidenavFooter.css'


import sns1Off from '../../../assets/img/sns1Off.png';
import sns1On from '../../../assets/img/sns1On.png';
import sns2Off from '../../../assets/img/sns2Off.png';
import sns2On from '../../../assets/img/sns2On.png';
import sns3Off from '../../../assets/img/sns3Off.png';
import sns3On from '../../../assets/img/sns3On.png';
import sns4Off from '../../../assets/img/sns4Off.png';
import sns4On from '../../../assets/img/sns4On.png';
import footerlogo from '../../../assets/img/footerlogo.png';
import xangle from '../../../assets/img/Xangle.svg';
import twitter from '../../../assets/img/twitter-brands.svg';
import telegram from '../../../assets/img/telegram-plane-brands.svg';
import explorer from '../../../assets/img/internet-explorer-brands.svg';
import medium from '../../../assets/img/medium.png';

import privacy_ko from '../../../documents/TVS.LAND_PRIVACY_Kor.pdf';
import privacy_en from '../../../documents/TVS.LAND_PRIVACY_Eng.pdf';
import service_ko from '../../../documents/TVS.LAND_SERVICE_Kor.pdf';
import service_en from '../../../documents/TVS.LAND_SERVICE_Eng.pdf';



import { useRecoilState } from 'recoil';
import auctionCategoryAtom from '../../../atoms/auctionCategory';
import { useHistory } from 'react-router-dom';
import isCategoryFinishAtom from '../../../atoms/isCategoryFinish';


function SidenavFooter() {

  const [auctionCategory, setAuctionCategory] = useRecoilState(auctionCategoryAtom);
  const history = useHistory();
  const [categoryFinish, setCategoryFinish] = useRecoilState(isCategoryFinishAtom);

  const goAuction = async (category) => {
		await setAuctionCategory(Number(category));
    setCategoryFinish(categoryFinish+1);
		history.push("/auction");
	};
  
  const termService = async () => {
  

    if(document.getElementById("terms").value === 'ko'){
      window.open(service_ko);
    }else if(document.getElementById("terms").value === 'en'){
      window.open(service_en);
    }
    
	};

  const privacyService = async () => {
    if(document.getElementById("privacy").value === 'ko'){
      window.open(privacy_ko);
    }else if(document.getElementById("privacy").value === 'en'){
      window.open(privacy_en);
    }
	};
  

  return (
        <footer>
          <div className="footerConts">
            <div className="footerCont">
              <div className="footerCont1">
                <span className="frame"><img src={footerlogo} alt=""/></span>
              </div>
              <div className="footerCont2">
                <p>Marketplace</p>
                <ul>
                  <li><a href="#" onClick={() => {goAuction(0);window.scrollTo(0, 0);}}>ALL</a></li>
                  <li><a href="#" onClick={() => {goAuction(1);window.scrollTo(0, 0);}}>Photo</a></li>
                  <li><a href="#" onClick={() => {goAuction(2);window.scrollTo(0, 0);}}>Artwork</a></li>
                  <li><a href="#" onClick={() => {goAuction(3);window.scrollTo(0, 0);}}>Digital Art</a></li>
                </ul>
              </div>
              <div className="footerCont3">
                <p>Community</p>
                <ul>
                  <li onClick={()=>window.open('https://dodogocoin.net/')}>
                    <a href="#"><img src={explorer} alt=""/></a>
                    <a href="#"><img src={explorer} alt=""/></a>
                  </li>
                  <li onClick={()=>window.open('hhttps://t.me/dodogoglobal')}>
                    <a href="#"><img src={telegram} alt=""/></a>
                    <a href="#"><img src={telegram} alt=""/></a>
                  </li>
                  <li onClick={()=>window.open('https://twitter.com/GlobalDodogo')}>
                    <a href="#"><img src={twitter} alt=""/></a>
                    <a href="#"><img src={twitter} alt=""/></a>
                  </li>
                  <li onClick={()=>window.open('https://t.me/addstickers/DODOGO_STICKER')}>
                    <a href="#"><img src={medium} alt=""/></a>
                    <a href="#"><img src={medium} alt=""/></a>
                  </li>
                  <li onClick={()=>window.open('https://dodo-7.gitbook.io/dodos-whitepaper')}>
                    <a href="#"><img src={xangle} alt=""/></a>
                    <a href="#"><img src={xangle} alt=""/></a>
                  </li>
                </ul>
              </div>
            </div>
            <p>
              <span>
                <select id="terms" onChange={termService}>
                  <option value="">Terms of Service</option>
                  <option value="ko">Korea</option>
                  <option value="en">English</option>
                </select>
              </span>
              <span>
                <select id="privacy" onChange={privacyService}>
                  <option value="">Privacy Policy</option>
                  <option value="ko">Korea</option>
                  <option value="en">English</option>
                </select>  
              </span>
            </p>
          </div>
        </footer>

        )
}

export default SidenavFooter
