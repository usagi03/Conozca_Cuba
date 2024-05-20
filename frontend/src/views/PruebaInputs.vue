
import CheckBox from '@/components/CheckBox.vue';
<template>
    <div>
        <input type="checkbox" values="" class="input-checkbox"/>
        <input id="country-option-1" type="radio" name="countries" value="USA" class="input-radio mx-4">
        <CheckBox :value="''">Tocame</CheckBox>
        <input type="email" class="input-text-password-email"/>
        <input type="text" class="input-text-password-email"/>
        <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12/23" required />
        
    </div>
</template>
<script setup>
import CheckBox from '@/components/CheckBox.vue';
</script>