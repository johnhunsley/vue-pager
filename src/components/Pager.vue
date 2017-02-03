<template>
    <div id="pager" class="pager-container">
        <div class="pager-section">
            <input id="filterUsers" class="pager-filter" type="text" @keyup="onSearch(pageSize, 1)" v-model.trim="filter"/>
        </div>
        <div class="pager-section fixed-height">
            <table >
                <tr v-for="colName in colNames">
                    <th>{{colName}}</th>
                </tr>
                <tr v-for="item in items">
                    <td v-for="colName in colNames">{{item[colName]}}</td>
                </tr>
            </table>
        </div>
        <div class="pager-section">
            <button id="prev" v-bind:disabled="!hasPrevious" value="Prev" @click="onSearch(pageSize, previousPageNumber)">Prev</button>
                    <span v-for="n in totalPages">
                        &nbsp;&nbsp;
                        <span @click="onSearch(pageSize, n)">
                            <b v-if="n == currentPage" class="highlighted">{{n}}</b>
                            <b v-else>{{n}}</b>
                        </span>
                    </span>
            <button id="next" v-bind:disabled="!hasNext" value="Next" @click="onSearch(pageSize, nextPageNumber)">Next</button>
            <span>
                &nbsp;&nbsp;
                <label class="left" for="pageSize">Items Per Page -&nbsp;&nbsp;</label>
                <select id="pageSize" v-model="pageSize" @change="onSearch(pageSize,1)">
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
            </span>
        </div>
</template>

<script>
export default {
  name: 'pager',
  props: {
    /**
     * Name of the item attributes to be displayed in the table.
     * Each name in the given array must be exactly equal to a valid
     * attribute of the type returned in the items array.
     */
    colNames: {
      type: Array,
      default () {
        return []
      }
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    onSearch: {
      type: Function,
      default (pageSize, pageNumber) {
      }
    }
  },
  data () {
    return {
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
    calculatePage: function (data, pageNumber) {
      this.currentPage = pageNumber
      this.items = data.body.pagedItems
      this.totalItems = data.body.totalItems
      this.totalPages = data.body.totalPages

      if (pageNumber < this.totalPages) {
        this.nextPageNumber = pageNumber + 1
        this.hasNext = true
      } else {
        this.hasNext = false
      }

      if (pageNumber > 1) {
        this.previousPageNumber = pageNumber - 1
        this.hasPrevious = true
      } else {
        this.hasPrevious = false
      }
    }
  },
  mounted: function () {
    this.onSearch(this.pageSize, this.currentPage)
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
        /*box-shadow: 0 0 10px #86a186;*/
    }

        .fixed-height {
        min-height: 420px;
    }

        .filter {
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

        tr {

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

</style>