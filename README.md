[![Circle CI](https://circleci.com/gh/johnhunsley/vue-pager.svg?style=svg)](https://circleci.com/gh/johnhunsley/vue-pager)
# vue-pager

> A server side paging Vue component with results filtering and adjustable page size

## Screenshot
![](./vue-pager.png "Paging Users")

## Build Setup

``` bash
# install dependencies
npm install johnhunsley/vue-pager

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Properties

**colNames** - Names of the attributes of objects in the items array to display
Expects an array of mapping objects
which define a label and value attributes where the value is the exact name
of the attribute in item object to be displayed under the labelled column
header name.

``` javascript
 colNames: {
    type: Array,
    default () {
    return []
  }
 },
```

**Items** - The page array of objects returned from the server from a
request to search for and page on the given critera
```javascript
    items: {
      type: Array
    },
```

**totalItems** -  The total number of items to be paged by the server
```javascript
totalItems: {
      type: Number,
      default () {
        return 0
      }
    },
```

**totalPages** - The total number of pages calculated by the server based on the given search
criteria and the given page size
```javascript
totalPages: {
      type: Number,
      default () {
        return 0
      }
    },
```

**onSearch** - A function which should call the remote service and sets the items, totalItems and totalPages values from
response. The function should accept the pageSize and pageNumber as parameters
```javascript
onSearch: {
      type: Function,
      default (pageSize, pageNumber) {
      }
    },
```

**onSelect** - A function to execute when an item in the tabulated results is clicked
accepts the selectId property as a parameter
```javascript
onSelect: {
      type: Function,
      default (id) {
      }
    },
```

**selectId** - The name of the unique id of each item in the items array. Passed
into the onSelect function as a parameter
```javascript
 selectId: {
      type: String,
      default: ''
    }
  },
```
**pageSizeOptions** - An array containing the values and labels of the page size options
 ```javascript
  pageSizeOptions: {
       type: Array,
       default () {
         return ['5', '10', '20', '50', '100']
       }
     },
 ```
 **noItemsLabel** - Label to be displayed when no items are returned in the pagedItems value of
 the response
 ```javascript
     noItemsLabel: {
       type: String,
       default: 'No Results'
     },
 ```

**filterPlaceholder** - Input box place holder for the filter
 ```javascript
 filterPlaceholder: {
       type: String,
       default: 'Filter Results'
     },
 ```

## Example Usage

**Html**
```html
<pager :on-search='getRemoteItems' :on-select='editUser' :col-names='colNames' :items='items' :total-pages="totalPages" :total-items="totalItems" :no-items-label='noUsers' :filter-placeholder="filterUsers" :select-id='selectedId'/>
```

**Javascript**
```javascript
export default {

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

        this.$http.get('https://simple-user-account-api.herokuapp.com/user/search/' + pageSize + '/' + pageNumber + '?query=' + filter,
          .then(function successCallback (response) {
            this.items = response.body.pagedItems
            this.totalItems = response.body.totalItems
            this.totalPages = response.body.totalPages

          }, function errorCallback (response) {
            console.log(response)
          })
      },
      editUser: function (id) {
        console.log('you clicked user ' + id)
      }
    }
}
```

