<template>
    <q-dialog ref="dialog">
        <q-card class="card">
            <q-card-section>
                <q-form ref="form">
                    <q-input v-model="editedFurniture.name" placeholder="Nom"
                        :rules="[val => val && val.length > 0 || 'Entrez un nom']"></q-input>
                    <q-input v-model="editedFurniture.description" placeholder="Description" autogrow></q-input>
                    <q-input v-model="editedFurniture.price" placeholder="Prix" type="number">
                        <template v-slot:append>€</template>
                    </q-input>
                    <q-select v-model="editedFurniture.category" :options="categories" option-label="label"
                        option-value="id" label="Catégorie"></q-select>
                    <q-select v-model="editedFurniture.materials" :options="materials" multiple option-label="name"
                        option-value="id" label="Matériaux"></q-select>
                </q-form>
            </q-card-section>
            <q-card-actions class="flex justify-center">
                <q-btn label="Valider" color="primary" @click="saveFurniture()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
  
<script>
import { defineComponent } from 'vue'
import categoryService from '../services/category.service'
import materialService from '../services/material.service'
import furnitureService from '../services/furniture.service'

export default defineComponent({
    name: 'EditionModal',
    props: {
        furniture: {
            type: Object,
            required: true
        },
        createMode: {
            type: Boolean,
            default: false
        }
    },
    emits: [
        'ok', 'hide'
    ],
    data() {
        return {
            editedFurniture: this.furniture,
            categories: [],
            materials: []
        }
    },
    methods: {
        saveFurniture() {
            this.$refs.form.validate().then(async success => {
                if (success) {
                    if (!this.createMode) {
                        let response = await furnitureService.update(this.editedFurniture.id, this.editedFurniture)
                        if (response.status === 200) {
                            this.$q.notify({
                                message: 'Meuble modifié',
                                color: 'positive',
                                icon: 'check'
                            })
                            this.$emit('ok')
                            this.$refs.dialog.hide()
                        }
                        else {
                            this.$q.notify({
                                message: 'Erreur lors de la modification',
                                color: 'negative',
                                icon: 'warning'
                            })
                        }
                    }
                    else {
                        let response = await furnitureService.create(this.editedFurniture)
                        if (response.status === 200) {
                            this.$q.notify({
                                message: 'Meuble créé',
                                color: 'positive',
                                icon: 'check'
                            })
                            this.$emit('ok')
                            this.$refs.dialog.hide()
                        }
                        else {
                            this.$q.notify({
                                message: 'Erreur lors de la création',
                                color: 'negative',
                                icon: 'warning'
                            })
                        }

                    }
                }
                else {
                    this.$q.notify({
                        message: 'Veuillez remplir tous les champs',
                        color: 'negative',
                        icon: 'warning'
                    })
                }
            })

        }
    },
    async created() {
        let categoryResponse = await categoryService.getAll()
        this.categories = categoryResponse.data.categories
        let materialResponse = await materialService.getAll()
        this.materials = materialResponse.data.materials
    }
})
</script>
  
<style scoped lang="scss"></style>