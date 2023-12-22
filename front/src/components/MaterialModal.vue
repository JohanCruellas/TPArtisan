<template>
    <q-dialog>
        <q-card class="card">
            <q-card-section class="flex justify-between">
                <div>
                    <div class="text-h6">{{ material.name }} <q-icon v-if="material.isEcoFriendly" name="eco"
                            color="green"><q-tooltip>Ce matériau est écologique !</q-tooltip></q-icon></div>
                </div>
            </q-card-section>
            <q-separator dark inset />
            <q-card-section>
                {{ material.description ? material.description : 'Pas de description' }}
            </q-card-section>
            <q-space></q-space>
            <q-card-section>
                Fabricants : <q-chip v-for="(manufacturer, manufacturerIndex) in material.manufacturers"
                    :key="manufacturerIndex"> {{ manufacturer.name }}</q-chip>
                <q-chip v-if="material.manufacturers.length === 0">Aucun</q-chip>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MaterialModal',
    props: {
        material: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
    },
    async created() {
    }
})
</script>
  
<style scoped lang="scss"></style>