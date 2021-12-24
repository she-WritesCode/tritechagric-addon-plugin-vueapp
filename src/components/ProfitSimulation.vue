<template>
  <div>
    <div class="grid md:grid-cols-5 gap-6">
      <div class="md:col-span-3 md:p-4">
        <div class>
          <div class="slots mb-8">
            <div class="flex justify-between items-center text-lg md:text-xl mb-6">
              <div class>
                <input
                  type="number"
                  v-model="slots"
                  :min="1"
                  :max="project.availableSlots"
                  class="p-inputtext p-component p-filled w-20 md:w-28 p-inputnumber-input py-1 mr-2"
                />
                <label for="slots">Slots</label>
              </div>
              <div class>
                <div class="text-primary">{{ toCurrency(totalInvestment) }}</div>
                <div class="text-primary text-sm text-gray-400 text-right -mt-2">Total Investment</div>
              </div>
            </div>
            <Slider id="slots" v-model="slots" :min="1" :max="project.availableSlots" />
            <div class="flex justify-between text-gray-400 mt-3">
              <span>1</span>
              <span>{{ project.availableSlots }}</span>
            </div>
          </div>
          <div class="others grid grid-cols-2 gap-8">
            <div class="flex flex-col items-center">
              <Knob
                id="roi"
                :modelValue="project.roi"
                :valueTemplate="'{value}%'"
                readonly
                :min="0"
                :max="100"
              />
              <label for="roi" class="md:text-lg">Returns</label>
            </div>
            <div class="flex flex-col items-center">
              <Knob id="duration" :modelValue="+project.duration" readonly :min="1" :max="12" />
              <label for="duration" class="md:text-lg">Month(s)</label>
            </div>
          </div>
        </div>
      </div>

      <div class="md:col-span-2 text-center md:text-left md:p-4">
        <div class>
          <div class="flex flex-col justify-center">
            <div class="return mb-8">
              <div class="text-xl md:text-2xl">Total Profit</div>
              <div class="text-3xl md:text-4xl">{{ toCurrency(profit) }}</div>
            </div>
            <div class="invest">
              <div class="p-field">
                <Button
                  icon="pi pi-chevron-right"
                  iconPos="right"
                  onclick
                  label="Fund Project"
                  class="rounded-3xl p-button-raised font-semibold md:p-button-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Knob from "primevue/knob";
import Button from "primevue/button";
import Slider from "primevue/slider";
import { toCurrency } from "../utils/Helpers";

export default defineComponent({
  name: "ProfitSimulation",
  props: {
    project: {
      type: Object,
      required: true,
    },
    quantity: Number,
  },
  components: { Knob, Slider, Button },
  data() {
    return {
      slots: 1,
    };
  },
  computed: {
    totalInvestment() {
      if (!this.project) return 0;
      return this.slots * (this.project?.fee ?? 0);
    },
    profit() {
      if (!this.project) return 0;
      return (this.totalInvestment * (this.project?.roi ?? 0)) / 100;
    }
  },
  methods: {

  },
  setup() {
    return {
      toCurrency,
    }
  },
})
</script>

<style scoped>
</style>