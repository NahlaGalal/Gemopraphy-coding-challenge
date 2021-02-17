import React from "react";
// Components
import Navbar from "./components/Navbar";
import Card from "./components/Card";

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <Navbar />
      <Card
        userAvatar="https://via.placeholder.com/175"
        repoName="Tensor flow"
        repoDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra feugiat sagittis dui interdum. Turpis et risus, faucibus et ultrices mi diam. Volutpat dui vel purus integer ornare pulvinar amet. Purus turpis sagittis, sagittis rhoncus purus nunc feugiat consequat. Tincidunt eu semper nec volutpat morbi. Arcu, donec lorem tortor mauris, nulla. Arcu ridiculus nibh tellus facilisi. Porttitor potenti quam arcu amet, egestas quis odio mi."
        starCount={2}
        issuesCount={2}
        createdAt={new Date()}
        author="Tensor flow"
      />
    </div>
  );
};

export default App;
