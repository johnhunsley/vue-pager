<template>
  <div class="myPager">
    <pager :on-search='getRemoteItems' :on-select='editUser' :col-names='colNames' :items='items' :total-pages="totalPages" :total-items="totalItems" :no-items-label='noUsers' :filter-placeholder="filterUsers" :select-id='selectedId'/>
  </div>
</template>

<script>
import pager from './../components/Pager.vue'

export default {
  name: 'myPager',
  components: {
    pager
  },
  data () {
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      colNames: [
        {'label': 'User Name', 'value': 'username'},
        {'label': 'First Name', 'value': 'firstName'},
        {'label': 'Last Name', 'value': 'lastName'},
        {'label': 'Email', 'value': 'email'},
        {'label': 'Enabled?', 'value': 'enabled'}
      ],
      noUsers: 'No Users',
      filterUsers: 'Filter Users',
      selectedId: 'id'
    }
  },
  methods: {
    getRemoteItems: function (pageSize, pageNumber, filter) {
      console.log(pageSize + ' ' + pageNumber)
      this.$http.get('https://simple-user-account-api.herokuapp.com/user/search/' + pageSize + '/' + pageNumber + '?query=' + filter,
        {headers: {'Cache-Control': 'no-cache', 'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huaHVuc2xleSIsInNjb3BlcyI6WyJBRE1JTiIsIkFQUF9VU0VSIl0sImlzcyI6Imh0dHA6Ly9zdmxhZGEuY29tIiwiaWF0IjoxNDg3MTY3NTU2LCJleHAiOjE0ODcxNjg0NTZ9.E3BVsp4me2d9FUJkfR3KFzAlV4oWk_ozSvQSCOxQoVtrBv-2S_r6xjKGPyTOwbJmgPpPvXu8HM9XQsvwILYKIw'}})
        .then(function successCallback (response) {
          console.log(response)
          this.items = response.body.pagedItems
          this.totalItems = response.body.totalItems
          this.totalPages = response.body.totalPages
        }, function errorCallback (response) {
          console.log('Token expired, forcing client to re-authenitcate')
        })
    },
    editUser: function (id) {
      console.log('you clicked user ' + id)
    }
  }
}
</script>

<style>
    #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

    h1, h2 {
    font-weight: normal;
  }

    ul {
    list-style-type: none;
    padding: 0;
  }

    li {
    display: inline-block;
    margin: 0 10px;
  }

    a {
    color: #42b983;
  }

</style>
