<template>
    <q-page>
        <div class="flex">
            <q-card class="q-ma-sm flex column smallCard" v-for="(furniture, furnitureKey) in furnitures"
                :key="furnitureKey" @click="openEditionModal(furniture)">
                <q-card-section class="flex justify-between">
                    <div>
                        <div class="text-h6">{{ furniture.name }}</div>
                        <div class="text-subtitle2">Créateur : {{ furniture.creator.username }}</div>
                    </div>
                </q-card-section>
            </q-card>
            <div class="smallCard addCard q-ma-sm" @click="openEditionModal({
                name: '',
                description: '',
                price: 0,
                category: null,
                materials: []
            }, true)">
                <q-icon name="add" size="35px" />
            </div>
        </div>
    </q-page>
</template>
  
<script>
import { defineComponent } from 'vue'
import furnitureService from '../services/furniture.service'
import EditionModal from '../components/EditionModal.vue'

export default defineComponent({
    name: 'IndexPage',
    data() {
        return {
            furnitures: []
        }
    },
    methods: {
        openEditionModal(furniture, createMode = false) {
            this.$q.dialog({
                component: EditionModal,
                componentProps: {
                    furniture: furniture,
                    createMode: createMode
                }
            }).onOk(async () => {
                let response = await furnitureService.getAll()
                this.furnitures = response.data.furnitures
            })
        }
    },
    async created() {
        let response = await furnitureService.getAll()
        this.furnitures = response.data.furnitures
    }
})
</script>

<style scoped lang="scss">
.smallCard {
    width: 250px;
    height: 150px;
    cursor: pointer;
}

.addCard {
    border: 2px dashed lightgrey;
    color: lightgrey;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
}
</style>
  