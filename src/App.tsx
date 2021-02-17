import React, { useState, useEffect } from "react";
import axios from "axios";
// Components
import Navbar from "./components/Navbar";
import Card from "./components/Card";
// Interface data
import Irepos from "./types";

const App: React.FC<{}> = () => {
  const [data, setData] = useState<Irepos[]>([]);

  useEffect(() => {
    const lastMonthDate: Date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const dateString = `${lastMonthDate.getFullYear()}-${(
      lastMonthDate.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${lastMonthDate.getUTCDate()}`;

    axios
      .get(
        `https://api.github.com/search/repositories?q=created:>${dateString}&sort=stars&order=desc`
      )
      .then((res) => {
        let repos: Irepos[] = res.data.items.map((repo: any) => ({
          userAvatar: repo.owner.avatar_url,
          repoName: repo.name,
          repoDesc: repo.description,
          starCount: repo.stargazers_count,
          issuesCount: repo.open_issues_count,
          createdAt: new Date(repo.created_at),
          author: repo.owner.login,
          authorUrl: repo.owner.html_url,
          repoUrl: repo.html_url,
        }));
        setData(repos);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <Navbar />
        <h2>Most Starred Repos</h2>
      </header>
      <main>
        {data.map((repo) => (
          <Card
            key={`${repo.repoName}-${repo.createdAt.toString()}`}
            userAvatar={repo.userAvatar}
            repoName={repo.repoName}
            repoDesc={repo.repoDesc}
            starCount={repo.starCount}
            issuesCount={repo.issuesCount}
            createdAt={repo.createdAt}
            author={repo.author}
            repoUrl={repo.repoUrl}
            authorUrl={repo.authorUrl}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
