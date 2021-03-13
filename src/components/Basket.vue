<template>
  <div>
    <div id="basketTitle">Menu</div>
    <ul>
      <li v-for="(item, index) in itemsSelected" :key="index">
        {{ item[0] }} x {{ item[1] }}
      </li>
    </ul>
    <button
      v-on:click="
        findTotal();
        sendOrder();
      "
    >
      Calculate Total
    </button>
    <div class="total" v-show="calculated">Subtotal: ${{ subTotal }}</div>
    <div class="total" v-show="calculated">Grand Total: ${{ grandTotal }}</div>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      calculated: false,
      subTotal: 0,
      grandTotal: 0,
    };
  },
  props: {
    itemsSelected: {
      type: Array,
    },
  },
  methods: {
    findTotal: function () {
      this.subTotal = 0;
      this.calculated = true;
      var item;
      for (item of this.itemsSelected) {
        this.subTotal += item[1] * item[2];
      }
    },
    sendOrder: function () {
      var order = {};
      var item;

      for (item of this.itemsSelected) {
        var itemName = item[0];
        var itemCount = item[1];
        order[itemName] = itemCount;
      }
      database.collection("orders").add(order).then(() => location.reload());
    },
  },
  watch: {
    subTotal: function () {
      this.grandTotal = (this.subTotal * 1.07).toFixed(2);
    },
  },
};
</script>

<style scoped>
ul {
  font-size: 24px;
}

button {
  background-color: pink;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
}

.total {
  background-color: rgb(154, 169, 235);
  text-transform: uppercase;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 24px;
}

#basketTitle {
  font-weight: bold;
  font-size: 36px;
  text-align: center;
}
</style>