<template>
    <div id="pager" class="pager-container">
        <div class="pager-section">
            <input id="filterItems" class="pager-filter" type="text" @keyup="search(pageSize, 1)" v-model.trim="filter"/>
        </div>
        <div class="pager-section fixed-height">
            <span v-if="items.length < 1">{{noItemsLabel}}</span>
            <table v-else>
                <th v-for="colName in colNames">
                    {{colName.label}}
                </th>
                <tr v-for="item in items">
                    <td v-for="colName in colNames">{{item[colName.value]}}</td>
                </tr>
            </table>
        </div>
        <div class="pager-section">
            <button id="prev" v-bind:disabled="!hasPrevious" value="Prev" @click="search(pageSize, previousPageNumber)">Prev</button>
                    <span v-for="n in totalPages">
                        &nbsp;&nbsp;
                        <span @click="search(pageSize, n)">
                            <b v-if="n == currentPage" class="highlighted">{{n}}</b>
                            <b v-else>{{n}}</b>
                        </span>
                    </span>
            <button id="next" v-bind:disabled="!hasNext" value="Next" @click="search(pageSize, nextPageNumber)">Next</button>
            <span>
                &nbsp;&nbsp;
                <label class="left" for="pageSize">Items Per Page -&nbsp;&nbsp;</label>
                <select id="pageSize" v-model="pageSize" @change="search(pageSize, 1)">
                    <option v-for="option in pageSizeOptions">{{option}}</option>
                </select>
            </span>
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
     * The response object from the server which must contain the following
     * - pagedItems : An Array of objects with attributes referenced in colNames
     * - totalItems : The total number of items to be paged
     * - totalPages : The total number of pages as defined by the total items and page size
     */
    response: {
      type: Object,
      default: null
    },

    /**
     * A function which should call the remote service which must return paged data
     * and set the the response object
     */
    onSearch: {
      type: Function,
      default (pageSize, pageNumber) {
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
    }
  },

  data () {
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      pageSize: 10,
      currentPage: 1,
      nextPageNumber: 1,
      hasNext: true,
      previousPageNumber: 1,
      hasPrevious: false,
      filter: ''
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
      this.items = data.body.pagedItems
      this.totalItems = data.body.totalItems
      this.totalPages = data.body.totalPages

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
     * When the response property in the parent changes then
     * recalculate the page
     */
    response: function (val) {
      this.calculatePage(val)
    }
  }
}
</script>

<style>
    <style>
        .pager-container {
        width:80%;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 20px;
        background-color: rgba(170, 204, 170, 0.33);
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 0 30px #3e4d3e;
        font-family:Arial, sans-serif;
        font-size:14px;
        color: #3e4d3e;
    }

        .pager-section {
        margin-left: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 20px;
        background-color: rgba(170, 204, 170, 0.33);
        box-shadow: 0 0 10px #86a186;
    }

        .fixed-height {
        min-height: 420px;
    }

        .pager-filter {
        min-width: 100%;
    }

        table {
        margin-right: auto;
        table-layout: auto;
        min-width: 100%;
        float: none;
        border-collapse:collapse;
        border-spacing:0;
        border-color:#aaa;
    }

        tr:nth-child(even) {
        background-color:#FCFBE3;
        vertical-align:top
    }

        tr:nth-child(odd) {
        vertical-align:top
    }

        tr:hover {
        background-color: aqua;
    }

        td {
        font-family:Arial, sans-serif;
        font-size:14px;
        padding:10px 5px;
        border-style:solid;
        border-width:1px;
        overflow:hidden;
        word-break:normal;
        border-color:#aca;
        color:#333;
        background-color:#fff;
    }

        th {
        font-family:Arial, sans-serif;
        font-size:14px;
        font-weight:normal;
        padding:10px 5px;
        border-style:solid;
        border-width:1px;
        overflow:hidden;
        word-break:normal;
        border-color:#aaa;
        color:#fff;
        background-color:#aca;
    }
        .highlighted {
        color:#00b300;
    }

</style>