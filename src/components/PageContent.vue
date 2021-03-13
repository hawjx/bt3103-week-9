<template>
  <div>
    <ul id="itemsList">
      <li v-for="item in items" :key="item.id">
        <div id="itemName">{{ item.name }}</div>
        <img :src="item.imageURL" />
        <div id="price">${{ item.price }}</div>
        <qtycount v-bind:item="item" v-on:counter="onCounter"></qtycount>
      </li>
    </ul>
    <basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter.vue";
import Basket from "./Basket.vue";
import database from "../firebase.js";

export default {
  data() {
    return {
      itemsSelected: [],
      items: [],
    };
  },
  components: {
    qtycount: QuantityCounter,
    basket: Basket,
  },
  methods: {
    onCounter: function (item, count) {
      if (this.itemsSelected.length == 0 && count > 0) {
        database.collection("menu").get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().name == item.name) {
              this.itemsSelected.push([item.name, count, item.price]);
            } else {
              this.itemsSelected.push([doc.data().name, 0, doc.data().price]);
            }
          })
        })
      } else {
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          if (item_name == item.name) {
            this.itemsSelected.splice(i, 1, [item.name, count, item.price]);
          }
        }
      }
    },
    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          let item = {};
          snapshot.forEach((doc) => {
            item = doc.data();
            item.show = false;
            this.items.push(item);
          });
        });
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
  width: 70%;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 40%;
  left: 78%;
}

#qtycount {
  margin-left: auto;
  margin-right: auto;
}
</style>