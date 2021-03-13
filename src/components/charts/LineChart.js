import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: []
            },
            options: {
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: "PSI Twenty Four Hourly (By Region)"
                },
                responsive: true,
                maintainAspectRatio: false
            },
            colors: ["#695858", "#8eb8ad", "#69838d", "#ffe9c8", "#dba79e", "#695858"],
        }
    },
    methods: {
        fetchItems: function() {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
                .then(response => {
                    response.data.items.forEach(data => {
                        this.datacollection.labels.push(data.timestamp)

                        var readings = Object.entries(data.readings.psi_twenty_four_hourly); //[[region, readings]]

                        for (let i = 0; i < readings.length; i++) {
                            if (this.datacollection.datasets.length < readings.length) {
                                var region_psi = {
                                    data: [readings[i][1]],
                                    borderColor: this.colors[i],
                                    backgroundColor: this.colors[i],
                                    label: readings[i][0], //labels the region
                                    fill: false
                                }
                                this.datacollection.datasets.push(region_psi);
                            } else {
                                this.datacollection.datasets[i].data.push(readings[i][1]);
                            }
                        }
                    })
                    this.renderChart(this.datacollection, this.options)
                })
        }
    },
    created() {
        this.fetchItems()
    }
}