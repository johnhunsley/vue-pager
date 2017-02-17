import Vue from 'vue'
import pager from 'src/components/Pager'

describe('ExamplePager.vue', () => {
   it('should render correct contents', () => {
    const vm = new Vue({
      template: '<pager :on-search="getRemoteItems" :on-select="editUser" :col-names="colNames" :items="items" :total-pages="totalPages" :total-items="totalItems" :no-items-label="noUsers" :filter-placeholder="filterUsers" :select-id="selectedId"/>',
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
            {'label': 'First Name', 'value': 'firstName'}
          ],
          noUsers: 'No Users',
          filterUsers: 'Filter Users',
          selectedId: 'id'
        }
      },
      methods: {
        getRemoteItems: function (pageSize, pageNumber, filter) {
           this.items = [
             {'username': 'bob', 'firstName': 'Bob'},
             {'username': 'fred', 'firstName': 'Fred'},
             {'username': 'jane', 'firstName': 'Jane'},
             {'username': 'mike', 'firstName': 'Mike'}
           ]
           this.totalItems = 4
           this.totalPages = 1

        },
        editUser: function (id) {
          console.log('you clicked user ' + id)
        }
    }
   }).$mount()
   //expect(vm.$children[0].mutableValue).toEqual(vm.value)
  })
})
