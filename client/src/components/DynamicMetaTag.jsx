import React from "react";
import { Helmet } from "react-helmet";

function DynamicMetaTag({ title, description, author, keyword }) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      <meta charSet="UTF-8" />

      {description && <meta name="description" content={description} />}
      {keyword && <meta name="keywords" content={keyword} />}
      {author && <meta name="author" content={author} />}
    </Helmet>
  );
}

export default DynamicMetaTag;
