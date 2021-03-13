<template>
    <div>
        <button v-on:click="decrement()">-</button>
        <span id="counter">{{ counter }}</span>
        <button v-on:click="increment()">+</button>
    </div>
</template>

<script>
export default {
    name: 'QuantityCounter',
    data() {
        return {
            counter: 0,
        }
    },
    props: {
        item: {},
    },
    methods: {
        decrement: function() {
            if (this.counter-1 >= 0) {
                this.counter = this.counter-1;
            }
            this.$emit('counter', this.item, this.counter);
        },
        increment: function() {
            if (this.counter+1 > 10) {
                alert("You cannot buy more than 10 items.");
            } else {
                this.counter = this.counter+1;
            }
            this.$emit('counter', this.item, this.counter);
        }
    }
}
</script>

<style scoped>
button {
    background-color: pink;
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 5px;
    display: inline;
    height: 30px;
    width: 30px;
}

#counter {
    font-size: 25px;
    vertical-align: middle;
}
</style>