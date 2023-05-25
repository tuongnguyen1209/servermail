class ApiFeature {
  constructor(query, queryStr, countDocument) {
    this.query = query;
    this.queryStr = queryStr;
    this.countDocument = countDocument;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(lt|gt|lte|gte)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    this.countDocument = this.countDocument.countDocuments(
      JSON.parse(queryString)
    );
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("_id");
    }
    return this;
  }

  limitFields(options = null) {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select(options);
    }
    return this;
  }

  paginate() {
    const page = this.queryStr.page * 1 || 1;
    if (!this.queryStr.limit) this.queryStr.limit = 10;
    const limit = this.queryStr.limit * 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeature;
