import React from 'react';
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return (
      <div>
          <AppBanner></AppBanner>
          <ComicsList></ComicsList>
      </div>
    );
};

export default ComicsPage;
