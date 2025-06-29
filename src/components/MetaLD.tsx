import React from "react";

function MetaLD({ game }: { game: import("../util/modes").Mode }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          (() => {
            let questions = game.meta.questions.map((q) => {
              let answers = q.answers.map((a, i) => ({
                "@type": "Answer",
                position: i,
                encodingFormat: "text/markdown",
                text: a.text,
                correct: a.correct,
              }));

              let suggestedAnswer1 = answers
                .filter((a) => !a.correct)
                .map((a) => {
                  let { correct: _, ...temp } = { ...a };
                  return temp;
                });
              let suggestedAnswer = suggestedAnswer1.length === 1 ? suggestedAnswer1[0] : suggestedAnswer1;

              let acceptedAnswer1 = answers
                .filter((a) => a.correct)
                .map((a) => {
                  let { correct: _, ...temp } = { ...a };
                  return temp;
                });
              let acceptedAnswer = acceptedAnswer1.length === 1 ? acceptedAnswer1[0] : acceptedAnswer1;

              return {
                "@type": "Question",
                eduQuestionType: "Multiple choice",
                learningResourceType: "Practice problem",
                name: game.name,
                text: q.text,
                comment: {
                  "@type": "Comment",
                  text: q.comment,
                },
                encodingFormat: "text/markdown",
                suggestedAnswer,
                acceptedAnswer,
              };
            });
            let hasPart = questions.length === 1 ? questions[0] : questions;

            return {
              "@context": "https://schema.org/",
              "@type": "Quiz",
              typicalAgeRange: `${game.meta.age - 1}-${game.meta.age + 1}`,
              educationalLevel: "intermediate",
              assesses: game.meta.skills,
              educationalAlignment: [
                {
                  "@type": "AlignmentObject",
                  alignmentType: "educationalSubject",
                  targetName: "Mathematics",
                },
                {
                  "@type": "AlignmentObject",
                  alignmentType: "educationalSubject",
                  targetName: "Algebra",
                },
              ],
              name: game.name,
              about: {
                "@type": "Thing",
                name: `Quiz about ${game.name}`,
              },
              hasPart,
            };
          })()
        ),
      }}
    />
  );
}

export default MetaLD;
