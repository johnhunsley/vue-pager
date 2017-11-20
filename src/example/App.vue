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
      items: [0],
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
      this.items = [
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'bob100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'}
      ]
      this.totalItems = 150
      this.totalPages = 15
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
