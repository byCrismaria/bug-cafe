<template>
  <div>
    <HeroBanner />
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" class="pa-6">
          <Profile />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import HeroBanner from '../components/home/HeroBanner.vue';
import Profile from '../components/auth/Profile.vue';

</script>

<style scoped>
</style>