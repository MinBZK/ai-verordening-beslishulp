import type {UserDecision} from "@/models/DecisionTree.ts";
import {ref, type Ref} from "vue";

export type UserDecisionsServiceType = ReturnType<typeof UserDecisionsService>;

/**
 * Deze service houdt bij welke keuzes een gebruiker gemaakt heeft, zodat genavigeerd
 * kan worden tussen de vragen zonder de gegeven antwoorden kwijt te raken.
 */
export function UserDecisionsService() {
  const previousUserDecisions: Ref<UserDecision[]> = ref([]);

  return {
    previousUserDecisions,

    getPreviousUserDecision(questionId: string) {
      return previousUserDecisions.value.find(decision => decision.questionId === questionId);
    },

    removeUserDecisionIfExists(questionId: string) {
      const decisionIndex = previousUserDecisions.value.findIndex(
        decision => decision.questionId === questionId
      );
      if (decisionIndex !== -1) {
        console.log("Removing index: " + decisionIndex);
        previousUserDecisions.value.splice(decisionIndex, 1);
      }
    },

    updatePreviousUserDecision(decision: UserDecision) {
      this.removeUserDecisionIfExists(decision.questionId);
      previousUserDecisions.value.push(decision);
    }
  };
}
