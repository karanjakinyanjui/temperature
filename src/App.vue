<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h3>
          Welcome to KAYMAN Associates
        </h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <SelectFields />
    </v-main>
  </v-app>
</template>

<script>
  import SelectFields from "./components/SelectFields";

  export default {
    name: "App",

    components: {
      SelectFields,
    },

    data: () => ({
      //
    }),
  };
</script>

<style lang="scss">
  @import "../src/assets/snow/snow.scss";
</style>
