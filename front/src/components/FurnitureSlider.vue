<template>
    <div class="wrapper scroll">
        <q-card class="card q-ma-sm flex column" v-for="(furniture, furnitureKey) in furnitures" :key="furnitureKey">
            <q-card-section class="flex justify-between">
                <div>
                    <div class="text-h6">{{ furniture.name }}</div>
                    <div class="text-subtitle2">Créateur : {{ furniture.creator.username }}</div>
                </div>
                <div class="flex column">
                    <q-chip dense color="green-4">
                        {{ furniture.price ? furniture.price : '0' }} €
                    </q-chip>
                    <q-chip dense>
                        Vendus : {{ furniture.quantitySold }}
                    </q-chip>
                </div>
            </q-card-section>
            <q-separator dark inset />
            <q-card-section>
                {{ furniture.description ? furniture.description : 'Pas de description' }}
            </q-card-section>
            <q-space></q-space>
            <q-card-section>
                Catégorie : <q-chip>{{ furniture.category.label }}</q-chip>
            </q-card-section>
            <q-card-section>
                Matériaux : <q-chip v-for="(material, materialIndex) in furniture.materials" :key="materialIndex" clickable
                    @click="openMaterialModal(material)"> {{ material.name }}</q-chip>
                <q-chip v-if="furniture.materials.length === 0">Aucun</q-chip>
            </q-card-section>
            <q-card-actions class="flex justify-center">
                <q-btn label="Ajouter aux ventes" color="primary" @click="AddToSales(furniture)" />
            </q-card-actions>
        </q-card>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import MaterialModal from '../components/MaterialModal.vue'
import furnitureService from '../services/furniture.service'

export default defineComponent({
    name: 'FurnitureSlider',
    props: {
        furnitures: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        openMaterialModal(material) {
            this.$q.dialog({
                component: MaterialModal,
                componentProps: {
                    material: material
                }
            })
        },
        async AddToSales(furniture) {
            let response = await furnitureService.update(furniture.id, {
                ...furniture,
                quantitySold: furniture.quantitySold + 1
            })
            if (response.status === 200) {
                this.$q.notify({
                    message: 'Le meuble a bien été ajouté aux ventes !',
                    color: 'green'
                })
                furniture.quantitySold++
            } else {
                this.$q.notify({
                    message: 'Erreur lors de l\'ajout aux ventes',
                    color: 'red'
                })
            }
        }
    },
    async created() {
    }
})
</script>
  
<style scoped lang="scss">
.wrapper {
    padding: 15px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    max-width: 100vw;
}
</style>