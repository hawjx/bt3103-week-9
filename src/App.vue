<template>
  <div>
    <h1>Jcheez's Zi Char</h1>
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
      <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
h1 {
  background-color: rgb(154, 169, 235);
  color: white;
  text-align: center;
  font-size: 60px;
  padding: 20px;
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

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>