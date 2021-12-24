<template>
    <section class="w-full" v-if="!project">
        <div class="flex flex-col justify-center items-center py-28 px-10">
            <img
                class="w-32 mb-4"
                alt="No investments yet"
                src="https://dashboard.agric.tritech.com.ng/img/box.1cace0d8.png"
            />
            <div class="text-xl">Project not found</div>
        </div>
    </section>
    <section v-else class="w-full">
        <PageHeading :title="project.title" subtitle />
        <div class>
            <div class>
                <div class="mb-8 rounded-2xl bg-white shadow-lg">
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class>
                            <img
                                :src="project.image"
                                class="w-full shadow h-full object-cover object-center rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
                                :alt="project.title"
                            />
                        </div>
                        <div class="px-4 pb-4 md:py-8 md:pr-4 md:pl-0">
                            <div
                                class="text-primary-500 font-semibold text-2xl"
                            >{{ toCurrency(project.fee) }}</div>
                            <div class="text-2xl leading-tight font-black mb-2">{{ project.title }}</div>
                            <div class="mb-4 text-lg">
                                <span class="text-primary-600">{{ project.roi }}%</span> returns in
                                <span class="text-primary-600">{{ project.duration }}</span> month(s)
                            </div>
                            <div class="prose prose-lg text-base">
                                <div>
                                    <div class="my-2">
                                        <span class="mr-2">
                                            <FontAwesomeIcon :icon="faShieldAlt" />
                                        </span>
                                        Insured by:
                                        <b>{{ project.insuredBy }}</b>
                                    </div>
                                    <div class="my-2">
                                        <span class="mr-2">
                                            <FontAwesomeIcon :icon="faMapMarkedAlt" />
                                        </span>
                                        Project Location:
                                        <b>{{ project.location }}</b>
                                    </div>
                                    <div class="my-2">
                                        <span class="mr-2">
                                            <FontAwesomeIcon :icon="faWarehouse" />
                                        </span>
                                        Slot Capacity:
                                        <b>{{ project.slotsCapacity }}</b>
                                    </div>
                                </div>
                                <div>
                                    <Markdown :source="project.shortDescription" />
                                </div>
                            </div>
                            <span class="flex justify-between">
                                <span
                                    class="bg-primary-100 text-primary-600 p-2 rounded mb-4"
                                >{{ project.availableSlots }} unit(s) left</span>
                                <span>
                                    <!--<Button class="p-button-text p-button-sm" onClick={() => showProfitSimulation()}>-->
                                    <!--View profit simulation-->
                                    <!-- </Button>-->
                                </span>
                            </span>
                            <div class="mt-4 p-formgroup-inline">
                                <div class="p-field">
                                    <InputNumber
                                        class="project-quantity"
                                        v-model="quantity"
                                        onValueChange="{(e) => setValue(e.value)}"
                                        :step="1"
                                        :min="1"
                                        :max="project.availableSlots"
                                        :showButtons="true"
                                    />
                                </div>
                                <div class="p-field">
                                    <Button
                                        icon="pi pi-chevron-right"
                                        iconPos="right"
                                        :onClick="fundProject"
                                        label="Fund Project"
                                        class="btn rounded-3xl mt-2 font-semibold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-sm uppercase bg-white shadow-lg mb-8">
                    <ProgressBar :value="progress" class="h-20 md:h-6">
                        <div
                            class="flex flex-wrap flex-col-reverse md:flex-row md:justify-between font-medium pt-1 pb-2 px-2"
                        >
                            <div>
                                <b>{{ toCurrency(current) }}</b> OF
                                <b>{{ toCurrency(total) }}</b> FUNDED BY
                                <b>{{ project.investments.length }}</b> INVESTMENT(S)
                            </div>
                            <div>{{ progress.toFixed(2) }}%</div>
                        </div>
                    </ProgressBar>
                </div>

                <div class="mb-8 rounded-2xl bg-white shadow-lg py-8 px-6">
                    <ProfitSimulation :project="project" :quantity="quantity" />
                </div>
                <div class="mb-8 rounded-2xl bg-white shadow-lg py-8 px-6">
                    <h3 class="text-2xl mb-4">Details</h3>
                    <div class="content">
                        <Markdown :source="project.description" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "vue";
import Button from "primevue/button"
import InputNumber from "primevue/inputnumber"
import ProgressBar from "primevue/progressbar"
import { faMapMarkedAlt, faWarehouse, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { toCurrency } from "../utils/Helpers";
import ProfitSimulation from "./ProfitSimulation.vue";
import Markdown from "./Markdown.vue";
import PageHeading from "./PageHeading.vue";
import axios from 'axios';

const url = 'https://tritech-agric.herokuapp.com'

export default defineComponent({
    name: "ProjectDetails",
    components: { PageHeading, FontAwesomeIcon, Markdown, ProfitSimulation, Button, InputNumber, ProgressBar },
    setup() {
        return {
            toCurrency,
            faMapMarkedAlt,
            faWarehouse,
            faShieldAlt,
        }
    },
    data: () => ({
        quantity: 1,
        project: null,
    }),
    methods: {
        async getProject() {
            const response = (await axios.get(`${url}/projects?${this.query}`));
            if (response.data.length > 0) {
                this.project = response.data[0];
            }
        },
        fundProject() {
            // sessionStorage.setItem("quantity", this.quantity + "")
            // this.$router.push({ name: "Invest", params: { slug: this.$route.params.slug } })
        },
    },
    computed: {
        progress() {
            return ((this.project.totalSlots - this.project.availableSlots) / this.project.totalSlots) * 100
        },
        total() {
            return this.project.totalSlots * this.project.fee;
        },
        current() {
            return (this.project.totalSlots - this.project.availableSlots) * this.project.fee;
        },
        query() {
            return `slug=${this.$route.params.slug}&join=investments&join=categories&join=updates&sort=id,ASC`;
        },
    },
    beforeMount() {
        console.log(this.$route.params.slug)
    },
    mounted() {
        this.getProject().then(() => console.log('done'));
        console.log(this.$route.params.slug)
    },
})
</script>

<style scoped>
</style>