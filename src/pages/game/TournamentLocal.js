// TournamentLocal.jsx
import React from "react";
import "./TournamentLocal.css";
import { BiEditAlt } from "react-icons/bi";
import { GiPingPongBat } from "react-icons/gi";
import { Link } from "react-router-dom";


function TournamentLocal() {
  return (
    <div className="TournamentLocal-background">
        <div className="TournamentLocal-container">
            <div className="TournamentLocal-container">
                <div className="TournamentLocal-icon"></div>
                <div className="side-container">
                    <input type="text" className="name-r" placeholder="Your name"/>
                    <span className="edit-icon"><BiEditAlt /></span>
                </div>

            </div>
            <div className="TournamentLocal-container">
                <div className="TournamentLocal-icon"></div>
                <div className="side-container">
                    <input type="text" className="name-r" placeholder="Your name"/>
                    <span className="edit-icon"><BiEditAlt /></span>
                </div>

            </div>
        </div>
        <div className="vs">
            <span class="TLv">V</span>
            <span class="TLs">S</span>
        </div>
        <div className="TournamentLocal-container">
            <div className="TournamentLocal-container">
                <div className="TournamentLocal-icon"></div>
                <div className="side-container">
                    <input type="text" className="name-l" placeholder="Your name"/>
                    <span className="edit-icon"><BiEditAlt /></span>
                </div>
            </div>
            <div className="TournamentLocal-container">
                <div className="TournamentLocal-icon"></div>
                <div className="side-container">
                    <input type="text" className="name-l" placeholder="Your name"/>
                    <span className="edit-icon"><BiEditAlt /></span>
                </div>
            </div>
        </div>
        <div className="FVsF-button">
          <Link className="FVsF-b" to={`/game/Local/TournamentLocal/Tournament`}> <GiPingPongBat /> <span className="Play">PLAY</span></Link>
        </div>
    </div>
  );
}

export default TournamentLocal;
