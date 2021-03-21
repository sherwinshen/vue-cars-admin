<template>
  <div class="member-detail-wrap" style="width: 100%">
    <p>略。</p>
  </div>
</template>

<script>
import { MemberDetailed } from "@/api/member";

export default {
  name: "MemberDetail",
  data() {
    return {
      id: this.$route.query.id,
      data: {}
    };
  },
  beforeMount() {
    this.id && this.detailed();
  },
  methods: {
    detailed() {
      MemberDetailed({ id: this.id }).then(response => {
        const data = response.data;
        data && (this.data = data);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
