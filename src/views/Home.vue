<template>
  <div class="home">
    <img src="../assets/loto-small.svg" />
    <game />
  </div>
</template>

<script>
// @ is an alias to /src
import Game from "@/components/Game.vue";

export default {
  name: "home",
  components: {
    Game
  }
};
</script>
