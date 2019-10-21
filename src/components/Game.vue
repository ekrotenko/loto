<template>
  <div>
    <div class="content">
      <div :class="{circle: currentCan}">
        <span class="can-number">{{ canText }}</span>
      </div>
    </div>

    <div v-if="currentCan">
      <span>Осталось номеров: {{restNumbers}}</span>
    </div>

    <div>
      <b-form>
        <b-form-group>
          <b-form-checkbox type="checkbox" id="voice" v-model="shouldRead">C голосом</b-form-checkbox>
        </b-form-group>

        <b-form-group v-if="isStart">
          <b-button variant="outline-primary" @click="start">Старт</b-button>
        </b-form-group>

        <b-form-group v-else>
          <b-button @click="newGame" variant="outline-success">Новая Игра</b-button>
          <b-button v-if="!isEnd" @click="nextNumber" variant="outline-primary">Следующий Бочонок</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "game",
  data() {
    return {
      numbers: null,
      currentCan: null,
      pastNumbers: [],
      shouldRead: true
    };
  },
  computed: {
    restNumbers() {
      return this.numbers.length;
    },
    isStart() {
      return this.numbers.length === 90;
    },
    isEnd() {
      return this.pastNumbers.length === 90;
    },
    showNewGameButton() {
      return this.isEnd();
    },
    canText() {
      if (this.isStart) {
        return "Новая игра";
      }

      if (this.isEnd) {
        return "Конец";
      }

      return this.currentCan;
    }
  },
  methods: {
    getNumbers() {
      const numbers = [];
      for (let i = 1; i <= 90; i++) {
        numbers.push(i);
      }

      for (let i = numbers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }

      return numbers;
    },
    newGame() {
      this.numbers = this.getNumbers();
      this.currentCan = null;
      this.pastNumbers = [];
    },
    getCanFromBox() {
      this.currentCan = this.numbers.pop();
      this.read();
    },
    start() {
      this.getCanFromBox();
    },
    nextNumber() {
      if (this.currentCan) {
        this.pastNumbers.push(this.currentCan);
      }

      this.currentCan = this.numbers.pop();
      this.read();
    },
    read() {
      if (this.shouldRead) {
        const speechSynth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(this.currentCan);
        utterThis.lang = "ru-Ru";

        speechSynth.speak(utterThis);
      }
    }
  },
  created() {
    this.newGame();
  }
};
</script>

<style scoped>
.can-number {
  font-size: 100px;
}
.content {
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle {
  display: inline-flex;
  justify-content: center;
  padding: 15px;
  border: 9px solid #2c3e50;
  border-radius: 50%;
  min-width: 200px;
  margin: 30px;
}
.btn {
  margin: 0 3px;
}
</style>
