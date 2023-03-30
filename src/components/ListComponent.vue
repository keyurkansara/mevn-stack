<template>
  <section>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr class="main-head">
              <th class="header" colspan="2">Clients</th>
              <th class="header" colspan="2">
                <input class="form-control" type="text" placeholder="Search" v-model="filterKeys" @change="filterClients">
              </th>
              <th>
                <button type="button" class="btn btn-light create-button" @click="showModal = true">Create</button>
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Providers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients" :key="client.id">
              <td>{{ client.name }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.phone }}</td>
              <td>{{ providerName(client.providers) }}</td>
              <td>
                <button type="button" @click="editClient(client)" class="btn btn-success mr-10">
                  Edit
                </button>
                <button type="button" @click="deleteClient(client.id)" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal fade" :class="{ 'show': showModal }" id="exampleModal" role="dialog"
      aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editID ? 'Edit' : 'Create' }} Client</h5>
            <button type="button" class="btn" @click="closeModal">
              <i class="fa fa-close"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" v-model="editClientData.name" required />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="editClientData.email" required />
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input type="text" class="form-control" v-model="editClientData.phone" required />
            </div>

            <div class="form-group">
              <label>Providers</label>
              <div class="input-group mb-10">
                <input type="text" class="form-control" v-model="addProviderName" />
                <button type="button" @click="saveProvider" class="btn btn-outline-secondary">
                  {{ editProviderID ? 'Update' : 'Add' }} Provider
                </button>
              </div>
              <ul class="list-group">
                <li class="list-group-item" v-for="(provider, index) in providers" :key="index">
                  <input class="form-check-input me-1" v-model="selectedProviders" type="checkbox" :value="provider.id" />
                  <span>{{ provider.name }}</span>
                  <button type="button" class="btn btn-sm btn-light float-right" @click="deleteProvider(provider.id)">
                    <i class="fa fa-trash"></i>
                  </button>
                  <button type="button" class="btn btn-sm btn-light float-right mr-10"
                    @click="editProvider(provider.id);">
                    <i class="fa fa-edit"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="saveClient">
              {{ editID ? 'Save' : 'Add' }} Client
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      clients: [],
      providers: [],
      selectedProviders: [],
      addProviderName: null,
      editClientData: {},
      editProviderData: {},
      showModal: false,
      editID: 0,
      editProviderID: 0,
      filterKeys: null
    };
  },
  created() {
    let endpoints = [
      'http://localhost:4000/api/clients',
      'http://localhost:4000/api/providers'
    ];

    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(axios.spread((...allData) => {
      this.clients = allData[0].data;
      this.providers = allData[1].data;
    }));
  },
  methods: {
    editClient(clientData) {
      this.editID = clientData.id;
      this.editClientData = clientData;
      this.selectedProviders = this.editClientData.providers;
      this.showModal = true;
    },
    editProvider(id) {
      this.editProviderID = id;
      this.editProviderData = this.providers.filter(a => a.id == id)[0];
      this.addProviderName = this.editProviderData.name;
    },
    closeModal() {
      this.showModal = false;
      this.editClientData = {};
      this.editProviderData = {};
      this.selectedProviders = [];
      this.editID = 0;
      this.editProviderID = 0;
    },
    providerName(providers) {
      let that = this;
      let names = [];
      providers.forEach(a => that.providers.filter(b => b.id == a).map(c => names.push(c.name)));
      return names.toString();
    },
    filterClients() {
      this.filterKeys;
    },
    saveClient() {
      this.editClientData.providers = this.selectedProviders;
      if (this.editID !== 0) {
        axios.put(`http://localhost:4000/api/client/${this.editID}`, this.editClientData).then((res) => {
          this.clients.filter(a => a.id == res.data.id).map(b => res.data[b.id] ? res.data[b.id] : b);
          this.closeModal();
        }).catch((error) => {
          console.log(error);
        });
      } else {
        axios.post(`http://localhost:4000/api/client`, this.editClientData).then((res) => {
          this.clients.push(res.data)
          this.closeModal();
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    deleteClient(id) {
      let indexOfArrayItem = this.clients.findIndex((i) => i.id === id);

      if (window.confirm("Do you really want to delete?")) {
        axios.delete(`http://localhost:4000/api/client/${id}`).then(() => {
          this.clients.splice(indexOfArrayItem, 1);
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    saveProvider() {
      let that = this;
      let providerData = { name: this.addProviderName };
      if (this.editProviderID) {
        axios.put(`http://localhost:4000/api/provider/${this.editProviderID}`, providerData).then(() => {
          this.providers.forEach(a => a.name = a.id == that.editProviderID ? that.addProviderName : a.name);
          this.addProviderName = null;
        }).catch((error) => {
          console.log(error);
        }).finally(() => { this.editProviderID = 0; });
      } else {
        axios.post(`http://localhost:4000/api/provider`, providerData).then((res) => {
          this.providers.push(res.data);
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    deleteProvider(id) {
      let indexOfArrayItem = this.providers.findIndex((i) => i.id === id);

      if (window.confirm("Do you really want to delete?")) {
        axios.delete(`http://localhost:4000/api/provider/${id}`).then(() => {
          this.providers.splice(indexOfArrayItem, 1);
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  },
};
</script>

<style>
.header {
  font-weight: 600;
  font-size: 25px;
  color: darkblue;
}

.mr-10 {
  margin-right: 10px;
}

.mb-10 {
  margin-bottom: 10px;
}

.m-0 {
  margin: 0px;
}

.float-right {
  float: right;
}

table {
  border-collapse: collapse;
}

.main-head th {
  background-color: lightblue;
  padding: 10px;
  text-align: left;
}

td,
th {
  border: 1px solid black;
  padding: 10px;
}

.create-button {
  float: right;
  margin-right: 10px;
}

.modal.show {
  display: block;
  padding-right: 17px;
}
</style>
