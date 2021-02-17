import React from "react";
// Images
import starIcon from "../images/star.svg";
import issueIcon from "../images/issue.svg";

interface Props {
  userAvatar: string;
  repoName: string;
  repoDesc: string;
  starCount: number;
  issuesCount: number;
  createdAt: Date;
  author: string;
}

const Card: React.FC<Props> = ({
  userAvatar,
  repoName,
  repoDesc,
  starCount,
  issuesCount,
  createdAt,
  author,
}) => {
  return (
    <section className="repo-card">
      <img src={userAvatar} alt="User avatar" />
      <div className="repo-data">
        <h2>{repoName}</h2>
        <p>{repoDesc}</p>
        <footer>
          <div className="label">
            <div>
              <img src={starIcon} alt="Number of stars"/>
              <span>Star</span>
            </div>
            <span>{starCount}</span>
          </div>
          <div className="label">
            <div>
              <img src={issueIcon} alt="Number of issues"/>
              <span>Issues</span>
            </div>
            <span>{issuesCount}</span>
          </div>
          <p>Submitted {createdAt.getHours()} days ago by <span>{author}</span></p>
        </footer>
      </div>
    </section>
  );
};

export default Card;
