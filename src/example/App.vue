<template>
  <div class="myPager">
    <pager :on-search='getRemoteItems' :on-select='editUser' :col-names='colNames' :items='items' :pageNumberModulus="6" :total-pages="totalPages" :total-items="totalItems" :no-items-label='noUsers' :filter-placeholder="filterUsers" :select-id='selectedId'/>
  </div>
</template>

<script>
import pager from './../components/Pager.vue'
import 'bootstrap/dist/css/bootstrap.css'

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
      selectedId: 'username'
    }
  },
  methods: {
    getRemoteItems: function (pageSize, pageNumber, filter) {
      console.log(pageSize + ' ' + pageNumber)
      this.items = [
        {'username': 'user100', 'firstName': 'Bob', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'user101', 'firstName': 'Fred', 'lastName': 'Bloggs', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'user102', 'firstName': 'Mark', 'lastName': 'Miggins', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'user103', 'firstName': 'Dave', 'lastName': 'Smith', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'user104', 'firstName': 'Bob', 'lastName': 'Monkhouse', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'user105', 'firstName': 'Kevin', 'lastName': 'O\'Leary', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'user106', 'firstName': 'John', 'lastName': 'Hunsley', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'user107', 'firstName': 'Mike', 'lastName': 'Green', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'user108', 'firstName': 'Dan', 'lastName': 'Richardson', 'email': 'bob@bob.com', 'enabled': 'Yes'},
        {'username': 'user109', 'firstName': 'Rich', 'lastName': 'Everet', 'email': 'bob@bob.com', 'enabled': 'Yes'}
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


</style>
