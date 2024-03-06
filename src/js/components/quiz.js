export const quiz = (function () {
  const init = function () {
    const quizForm = document.getElementById('quiz-form');
    if (quizForm === null) {
      return;
    }
    const quizStart = document.querySelector('.js-quiz-start');
    const quizQuestionIntro = document.querySelector('.quiz__intro');
    const quizQuestionWrap = document.querySelector('.quiz__question-wrap');
    const quizQuestions = document.querySelectorAll('.quiz__question');
    const nextQuestions = document.querySelectorAll('.quiz__next');
    const prevQuestions = document.querySelectorAll('.quiz__prev');
    const quizSubmitButton = document.querySelector('.quiz__submit');
    const quizProgressLine = document.querySelector('.progress__line');
    // const quizProgressDividers = document.querySelector(".progress__dividers");
    const quizProgressCurrent = document.querySelector(
      '.progress__questions-current',
    );
    const quizProgressTotal = document.querySelector(
      '.progress__questions-total',
    );
    const quizProgressStats = document.querySelector('.progress__questions');
    let currentQuestionNumber = 1;
    const questionsAmount = quizQuestions.length;
    const progressLineRatio = 100 / questionsAmount;

    quizProgressTotal.textContent = questionsAmount;

    quizStart.addEventListener('click', () => {
      quizQuestionWrap.classList.toggle('active');
      quizQuestionIntro.classList.toggle('hidden');
      quizQuestions[0].classList.add('active');
      quizProgressStats.classList.add('active');
      quizProgressLine.setAttribute(
        'value',
        currentQuestionNumber * progressLineRatio,
      );
      quizProgressCurrent.textContent = currentQuestionNumber;
      quizQuestions[0].querySelectorAll(
        '.quiz__question-number',
      )[0].textContent = `${currentQuestionNumber}. `;
    });

    nextQuestions.forEach((button, index) => {
      button.addEventListener('click', () => {
        quizQuestions.forEach(() => {
          quizQuestions[index].classList.remove('active');
          quizQuestions[index + 1].classList.add('active');
        });
        currentQuestionNumber += 1;
        quizProgressLine.setAttribute(
          'value',
          currentQuestionNumber * progressLineRatio,
        );
        quizProgressCurrent.textContent = currentQuestionNumber;
        quizQuestions[index + 1].querySelectorAll(
          '.quiz__question-number',
        )[0].textContent = `${currentQuestionNumber}. `;
      });
    });

    prevQuestions.forEach((button, index) => {
      let prevIndex = index + 1; // Adjust index since first question doesn't have prev button
      button.addEventListener('click', () => {
        quizQuestions.forEach(() => {
          quizQuestions[prevIndex].classList.remove('active');
          quizQuestions[prevIndex - 1].classList.add('active');
        });
        currentQuestionNumber -= 1;
        quizProgressLine.setAttribute(
          'value',
          currentQuestionNumber * progressLineRatio,
        );
        quizProgressCurrent.textContent = currentQuestionNumber;
        quizQuestions[prevIndex - 1].querySelectorAll(
          '.quiz__question-number',
        )[0].textContent = `${currentQuestionNumber}. `;
      });
    });

    quizSubmitButton.addEventListener('click', (event) => {
      event.preventDefault();
      const formData = new FormData(quizForm);
      for (let [key, value] of formData) {
        console.log(`${key} - ${value}`);
      }
    });
  };

  return {
    init,
  };
})();
