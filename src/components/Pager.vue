<template>
    <div id="pager">
        <div class="input-group mb-3">
            <input class="form-control" id="filterItems" type="text" @keyup="search(pageSize, 1)" :placeholder="filterPlaceholder" v-model.trim="filter"/>
        </div>
        <div>
            <span v-if="items.length < 1">{{noItemsLabel}}</span>
            <table class="table table-condensed table-striped" v-else>
                <th v-for="colName in colNames">
                    {{colName.label}}
                </th>
                <tbody>
                  <tr v-for="item in items" @click="onSelect(item[selectId])">
                      <td v-for="colName in colNames">{{item[colName.value]}}</td>
                  </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button class="btn btn-light" id="prev" v-bind:disabled="!hasPrevious" value="Prev" @click="search(pageSize, previousPageNumber)">Prev</button>
                    <span v-for="n in totalPages">
                          <span v-if="currentPage - n <= pageNumberModulus && n - currentPage <= pageNumberModulus" @click="search(pageSize, n)">
                              &nbsp;&nbsp;
                              <b v-if="n == currentPage" class="highlighted">{{n}}</b>
                              <b v-else>{{n}}</b>
                          </span>
                    </span>
            <button class="btn btn-light" id="next" v-bind:disabled="!hasNext" value="Next" @click="search(pageSize, nextPageNumber)">Next</button>
            <span>
                &nbsp;&nbsp;
                <label for="pageSize">Items Per Page -&nbsp;</label>
                <select id="pageSize" v-model="pageSize" @change="search(pageSize, 1)">
                    <option v-for="option in pageSizeOptions">{{option}}</option>
                </select>
            </span>
          <slot name="additionalButtons"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'pager',
  props: {

    /**
     * Label mapped values to item attributes. Expects an array of mapping objects
     * which define a label and value attributes where the value is the exact name
     * of the attribute in item object to be displayed under the labelled column
     * header name.
     */
    colNames: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * The page array of objects returned from the server from a request to search for and page on the given critera
     */
    items: {
      type: Array
    },

    /**
     * The total number of items to be paged by the server
     */
    totalItems: {
      type: Number,
      default () {
        return 0
      }
    },

    /**
     * The total number of pages calculated by the server based on the given search criteria and the given page size
     */
    totalPages: {
      type: Number,
      default () {
        return 0
      }
    },

    /**
     * A function which should call the remote service which must return paged data
     * and set the items, totalItems and totalPages properties
     */
    onSearch: {
      type: Function,
      default (pageSize, pageNumber, filter) {
      }
    },

    /**
     * A placeholder for a function which does something when an item in the tabulated
     * results is clicked
     */
    onSelect: {
      type: Function,
      default (id) {
      }
    },

    /**
     * Page size options
     */
    pageSizeOptions: {
      type: Array,
      default () {
        return ['5', '10', '20', '50', '100']
      }
    },

    /**
     * A label to display when no items are found
     */
    noItemsLabel: {
      type: String,
      default: 'No Results'
    },

    /**
     * Place holder for the filter input box
     */
    filterPlaceholder: {
      type: String,
      default: 'Filter Results'
    },

    /**
     * The label of the item attribute used to identify each row
     * in the tabulated results and passed into the default onSelect
     * function executed when a row item is selected
     */
    selectId: {
      type: String,
      default: ''
    },

    /**
     * The filter query value
     */
    filter: {
      type: String,
      default: ''
    },

    /**
     *
     */
    pageNumberModulus: {
      type: Number,
      default () {
        return 4
      }
    }
  },

  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      nextPageNumber: 1,
      hasNext: true,
      previousPageNumber: 1,
      hasPrevious: false,
      filter: this.filter
    }
  },

  methods: {

    /**
     * Set the current page and call the overridden onSearch method to
     * perform the function of getting items from the server
     */
    search: function (pageSize, pageNumber) {
      this.currentPage = pageNumber
      this.onSearch(pageSize, pageNumber, this.filter)
    },

    /**
     * Calculate the values to be displayed on the page from the
     * watched response object
     */
    calculatePage: function (data) {
      if (this.currentPage < this.totalPages) {
        this.nextPageNumber = this.currentPage + 1
        this.hasNext = true
      } else {
        this.hasNext = false
      }

      if (this.currentPage > 1) {
        this.previousPageNumber = this.currentPage - 1
        this.hasPrevious = true
      } else {
        this.hasPrevious = false
      }
    }
  },

  mounted: function () {
    this.onSearch(this.pageSize, this.currentPage, this.filter)
  },

  watch: {

     /**
     * When the items property in the parent changes then
     * recalculate the page
     */
    items: function (val) {
      this.calculatePage(val)
    }
  }
}
</script>

<style>
@import '../../node_modules/bootstrap/dist/css/bootstrap.css';

</style>
