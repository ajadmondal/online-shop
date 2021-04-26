import React from 'react';
import "./Footer.css";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";



export default function Footer() {
    return (
      <div className="footer">
        <div className="footer__container">
          <div className="intro">
            <img
              src="https://media-exp1.licdn.com/dms/image/C5103AQHM9wyoc5e7lQ/profile-displayphoto-shrink_400_400/0/1571596554431?e=1625097600&v=beta&t=8GATVmZqLbasRhKupJkjcCUavPn-2fJCPTN9PIPc__k"
              alt="Developer's Profile"
              className="profile"
            />
            <div className="description">
              

              <h5>Developer Intro</h5>
              <div className="name">
                <h3>Sk Ajad Mondal</h3>
                <h4>React Developer</h4>
              </div>

              <p>
                I am an undergraduate Computer Science Engineer. I am passionate
                about Web Development, and love to make Web Apps in React. I
                also have a great interest in Algorithms and Data Structures :)
              </p>
              <a
                href="https://github.com/ajadmondal/online-shop"
                target="_blank"
                title="Fork this project"
              >
                <GoRepoForked />
              </a>
            </div>
          </div>
          <div className="reach-me">
            <a
              href="https://github.com/ajadmondal"
              target="_blank"
              className="tooltip"
            >
              <FaGithub />
              <p className="tooltiptext">My GitHub Profile</p>
            </a>
            <a
              href="https://www.linkedin.com/in/sk-ajad-mondal-454995167/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B7Q4rs6TMSXCnpzFmtAaPOw%3D%3D"
              target="_blank"
              className="tooltip"
            >
              <FaLinkedin />
              <span className="tooltiptext">My LinkedIn Profile</span>
            </a>
            <a
              href="mailto:ajadmondal99@gmail.com"
              target="_blank"
              className="tooltip"
            >
              <HiOutlineMail />
              <span className="tooltiptext">Mail Me</span>
            </a>
            <a
              href="https://leetcode.com/ajadmondal/"
              target="_blank"
              className="tooltip"
            >
              <SiLeetcode />
              <span className="tooltiptext">My LeetCode Profile</span>
            </a>
            <a
              className="tooltip"
              href="https://www.instagram.com/sam.ajad/"
              target="_blank"
            >
              <FaInstagram />
              <span className="tooltiptext">My Instagram Profile</span>
            </a>
          </div>
        </div>
      </div>
    );
}
