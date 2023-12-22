<template>
    <q-page>
        <div class="wrapper">
            <div class="leftMenu">
                <q-list>
                    <q-item v-for="(furniture, furnitureIndex) in furnitures" :key="furnitureIndex" dense clickable
                        @click="selectedFurniture = furniture" class="q-pa-xs">{{ furniture.name }}</q-item>
                </q-list>
            </div>
            <div class="pageContent">
                <div v-if="selectedFurniture">
                    <Bar :data="chartData" :options="selectedFurniture.chartOptions" />
                </div>
                <div v-else class="noSelectionWrapper">
                    <div class="text-h6 q-ma-auto">Sélectionnez un meuble</div>
                </div>
            </div>
        </div>
    </q-page>
</template>
  
<script>
import { defineComponent } from 'vue'
import furnitureService from '../services/furniture.service'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
    name: 'IndexPage',
    components: {
        Bar
    },
    data() {
        return {
            furnitures: [],
            selectedFurniture: null,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    },
    methods: {
    },
    computed: {
        chartData() {
            return {
                labels: ['Chiffre d\'affaire', 'Coût de production', 'Marge'],
                    datasets: [
                        {
                            label: '€',
                            backgroundColor: '#f87979',
                            data: [this.getCA, this.getProductionCost, this.getMargin]
                        }
                    ]
            }
        },
        getCA() {
            return this.selectedFurniture.price * this.selectedFurniture.quantitySold
        },
        getProductionCost() {
            let totalMaterialsPrice = this.selectedFurniture.materials.reduce((acc, material) => {
                return acc + material.cost
            }, 0)
            return totalMaterialsPrice * this.selectedFurniture.quantitySold
        },
        getMargin() {
            return this.getCA - this.getProductionCost
        }
    },
    async created() {
        let response = await furnitureService.getAll()
        this.furnitures = response.data.furnitures
    }
})
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    height: calc(100vh - 50px);
}

.leftMenu {
    min-width: 300px;
    background-color: #f5f5f5;
    border-right: 1px solid #e0e0e0;
}

.pageContent {
    flex: 1;
    padding: 15px;
}

.noSelectionWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: lightgrey;
}
</style>
  