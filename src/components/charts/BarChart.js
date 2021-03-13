import { Bar } from 'vue-chartjs';
import database from '../../firebase.js';

export default {
    extends: Bar,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Total",
                    backgroundColor: ["#695858", "#8eb8ad", "#69838d", "#ffe9c8", "#dba79e", "#695858"],
                    data: []
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Total Number of Each Dish"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true //change the start value of vert axis
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            },
            orderSummary: {}, //key is name of dish, value is total count of each dish
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    var order = doc.data();
                    for (var item in order) {
                        if (item in this.orderSummary) {
                            this.orderSummary[item] = this.orderSummary[item] + order[item];
                        } else {
                            this.orderSummary[item] = order[item];
                        }
                    }
                })

                var ItemName = Object.keys(this.orderSummary);
                var ItemCount = Object.values(this.orderSummary);
                for (let i = 0; i < ItemName.length; i++) {
                    this.datacollection.labels.push(ItemName[i]);
                    this.datacollection.datasets[0].data.push(ItemCount[i]);
                }
                this.renderChart(this.datacollection, this.options)
            })
        }
    },
    created() {
        this.fetchItems()
    }
}