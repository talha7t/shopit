class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          productName: {
            $regex: this.queryString.keyword,
            $options: "i", // case insensitive search
          },
        }
      : {}; // if no query is given return all products;

    this.query = this.query.find({ ...keyword }).sort({createdAt: -1, updatedAt: -1});
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };

    // Removing fields from the query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete queryCopy[field]);

    // Advanced filters for price, ratings etc.
    let queryString = JSON.stringify(queryCopy); // convert json object to string

    // add $ sign for gte and lte to use price filtering
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => {
      return `$${match}`;
    });

    this.query = this.query.find(JSON.parse(queryString)).sort({createdAt: -1, updatedAt: -1});
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skipResults = resultsPerPage * (currentPage - 1); // skip products for current the current page

    this.query = this.query.limit(resultsPerPage).skip(skipResults);
    // limit, limits the number of documents that will be returned, skips the number of results passed and returns the results within the limit
    return this;
  }
}

module.exports = ApiFeatures;
