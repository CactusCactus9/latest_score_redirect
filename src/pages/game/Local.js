import './Local.css';
// import Banner from '../../components/Banner';
import { SlControlPlay } from "react-icons/sl";
import { Link } from "react-router-dom";
// import Game from './Game';


function Local() {
  return (
    <>
    <div className='menu-background'>
      {/* <div className="Ban_Local"><Banner/></div> */}
      <div className='menu-container'>
        <div className='logo'>
          <p>
            <sup>
              <span>P</span>
              <span className='o'></span>
              <span>N</span>

            </sup>
            <span className='g'>G</span>
            <span>AME</span>
          </p>
        </div>
        <div className='menu-buttons'>
          <Link className='button' to={`/game/Local/SingleGame`}><span className='icon' ><SlControlPlay /></span>Single Game</Link>
          <Link className='button' to={`/game/Local/TournamentLocal`}><span className='icon'><SlControlPlay /></span>Tournament</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Local;
