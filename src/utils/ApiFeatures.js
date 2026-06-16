export class ApiFeature {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }

  pagination() {
    //=================== 1- Pagination ===================
    let pageNumber = this.searchQuery.page * 1 || 1;
    if (this.searchQuery.page < 1) pageNumber = 1;
    const limit = 3;
    this.pageNumber = pageNumber;
    let skip = (parseInt(pageNumber) - 1) * limit;
    this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  filter() {
    //=================== 2- Filter ===================
    let filterObject = structuredClone(this.searchQuery); //deep clone

    filterObject = JSON.stringify(filterObject);
    filterObject = filterObject.replace(
      /\b(lt|lte|gt|gte)\b/g,
      (value) => `$${value}`,
    );
    filterObject = JSON.parse(filterObject);

    console.log(filterObject);

    let excludedObject = ["page", "sort", "fields", "search"];
    excludedObject.forEach((val) => delete filterObject[val]);
    this.mongooseQuery.find(filterObject);
    return this;
  }

  sort() {
    //=================== 3- Sort ===================

    if (this.searchQuery.sort) {
      let sortedBy = this.searchQuery.sort.split(",").join(" ");
      console.log(sortedBy);
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }
  fields() {
    //=================== 4- Selected fields ===================
    if (this.searchQuery.fields) {
      let selectedFields = this.searchQuery.fields.split(",").join(" ");
      console.log(selectedFields);
      this.mongooseQuery.select(selectedFields);
    }
    return this;
  }
  search() {
    //=================== 5- search ===================

    if (this.searchQuery.search) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.searchQuery.search, $options: "i" } },
          { desc: { $regex: this.searchQuery.search, $options: "i" } },
        ],
      });
    }
    return this;
  }
}
