<template>
  <div>
    <div v-for="[index, item] in datapacket.entries()" v-bind:key="index">
      {{ item[0] }}: {{ item[1] }} <br /><br />
      <input type="number" v-bind:id="index" placeholder="0" min="0"/>
      <br /><br />
    </div>
    <button v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      datapacket: [],
    };
  },
  methods: {
    fetchItems: function () {
      var id = this.$route.params.id;
      database
        .collection("orders")
        .doc(id)
        .get()
        .then((snapshot) =>
          Object.entries(snapshot.data()).forEach((item) =>
            this.datapacket.push(item)
          )
        );
    },
    updateOrder: function() {
        var copy = {};
        for (let i = 0; i < this.datapacket.length; i++) {
            var item = this.datapacket[i]; //get item by looping through array
            var newCount = document.getElementById(i).value; //new input
            if (newCount == "") { 
                copy[item[0]] = item[1]; //keep original count
            } else {
                copy[item[0]] = Number(newCount); //update new count
            }
        }

        var id = this.$route.params.id;
        database
            .collection("orders")
            .doc(id)
            .set(copy)
            .then(() => this.$router.push({ path: "/orders" })); //return to order page
        },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

