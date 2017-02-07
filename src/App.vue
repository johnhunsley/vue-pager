<template>
  <div class="myPager">
    <pager :on-search='getItems' :col-names='colNames' :response='response'/>
  </div>
</template>

<script>
import pager from './components/Pager.vue'

export default {
  name: 'myPager',
  components: {
    pager
  },
  data () {
    return {
      response: null,
      colNames: ['username', 'firstName', 'lastName', 'email', 'enabled']
    }
  },
  methods: {
    getItems: function (pageSize, pageNumber, filter) {
      console.log(pageSize + ' ' + pageNumber)
      this.$http.get('http://localhost:8080/user/search/' + pageSize + '/' + pageNumber + '?query=' + filter,
        {headers: {'Cache-Control': 'no-cache', 'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huaHVuc2xleSIsInNjb3BlcyI6WyJBRE1JTiIsIkFQUF9VU0VSIl0sImlzcyI6Imh0dHA6Ly9zdmxhZGEuY29tIiwiaWF0IjoxNDg2NDYxMzYyLCJleHAiOjE0ODY0NjIyNjJ9.vKCD-myboywgH2cMYQcOjiwYtgrtkYQ63Jc5wm-1QiRST2TIKS7OQEBYeme4BjlVpZ-7QKLdUf1ZJOOoe7EeJA'}})
        .then(function successCallback (response) {
          this.response = response
        }, function errorCallback (response) {
          console.log('Token expired, forcing client to re-authenitcate')
        })
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
