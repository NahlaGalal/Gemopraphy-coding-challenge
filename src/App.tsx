import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
// Components
import Navbar from "./components/Navbar";
import Card from "./components/Card";
// Interface data
import Irepos from "./types";

const App: React.FC<{}> = () => {
  // Repos data
  const [data, setData] = useState<Irepos[]>([]);
  // Reference for page
  const page = useRef<number>(0);
  // Reference for data to save the old data
  const dataRef = useRef<Irepos[]>([]);
  // Loading new Data
  const isLoading = useRef<boolean>(false);

  // Calculate last month date to use in query
  const lastMonthDate: Date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const dateString = `${lastMonthDate.getFullYear()}-${(
    lastMonthDate.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${lastMonthDate.getUTCDate()}`;

  const loadMore = (query?: string) => {
    // Start loading
    isLoading.current = true;
    // Fetch data
    axios
      .get(
        `https://api.github.com/search/repositories?q=${
          query ? query : `created:>${dateString}`
        }&sort=stars&order=desc&per_page=20&page=${page.current + 1}`
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
        // Stop loading
        isLoading.current = false;
        if (query) {
          setData(repos);
        } else {
          // Add page number
          page.current++;
          // Add new data
          setData([...dataRef.current, ...repos]);
          dataRef.current = [...dataRef.current, ...repos];
        }
      });
  };

  const searchRepo = (query: string) => {
    debounce(() => loadMore(query), 500)();
  };

  useEffect(() => {
    loadMore();
    // Event to load data on scrolling
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // Fetch new data
        loadMore();
      }
    });
  }, []);

  return (
    <div className="App">
      <header>
        <Navbar searchRepo={searchRepo} />
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
      {isLoading && (
        <footer>
          <p>Loading ...</p>
        </footer>
      )}
    </div>
  );
};

export default App;
