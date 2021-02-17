import React from "react";
// Images
import starIcon from "../images/star.svg";
import issueIcon from "../images/issue.svg";
// Props interface
import Props from "../types";

const Card: React.FC<Props> = ({
  userAvatar,
  repoName,
  repoDesc,
  starCount,
  issuesCount,
  createdAt,
  author,
  authorUrl,
  repoUrl,
}) => {
  return (
    <section className="repo-card">
      <img src={userAvatar} alt="User avatar" />
      <div className="repo-data">
        <h3>
          <a href={repoUrl} target="_blank" rel="noreferrer">
            {repoName}
          </a>
        </h3>
        <p>{repoDesc}</p>
        <footer>
          <div className="label">
            <div>
              <img src={starIcon} alt="Number of stars" />
              <span>Star</span>
            </div>
            <span>{starCount}</span>
          </div>
          <div className="label">
            <div>
              <img src={issueIcon} alt="Number of issues" />
              <span>Issues</span>
            </div>
            <span>{issuesCount}</span>
          </div>
          <p>
            Submitted {new Date(Date.now() - createdAt.getTime()).getDate()}{" "}
            days ago by{" "}
            <a href={authorUrl} target="_blank" rel="noreferrer">
              {author}
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Card;
