class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keywordSearch = this.queryStr.keywordSearch
      ? {
          name: {
            $regex: this.queryStr.keywordSearch,
            $options: "i",
          },
        }
      : {};

    console.log(keywordSearch);
    this.query = this.query.find({ ...keywordSearch });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    console.log(queryCopy);

    //Remoing fields from the query
    const removeFields = ["keywordSearch", "limit", "page"];
    removeFields.forEach((element) => delete queryCopy[element]);

    //Advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    console.log(queryStr);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
