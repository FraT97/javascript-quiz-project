document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/

  let timer;


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);



  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results



  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }
  
    // Clear previous question and choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";
  
    // Get the current question
    const question = quiz.getQuestion();
    question.shuffleChoices(); // Shuffle choices
  
    // 1. Show the question
    questionContainer.innerText = question.text;
  
    // 2. Update the green progress bar
    const percentage = ((quiz.currentQuestionIndex + 1) / quiz.totalQuestions) * 100;
    progressBar.style.width = `${percentage}%`; // Update progress bar width dynamically
  
    // 3. Update the question count
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.totalQuestions}`;
  
    // 4. Display the choices
    question.choices.forEach(choice => {
      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = "choice";
      choiceInput.value = choice;
  
      choiceLabel.innerText = choice;
      choiceContainer.appendChild(choiceInput);
      choiceContainer.appendChild(choiceLabel);
      choiceContainer.appendChild(document.createElement("br"));
    });
  }
  

  
  function nextButtonHandler() {
    let selectedAnswer; // Store selected answer value
  
    // 1. Get all the choice elements (radio buttons)
    const choices = document.querySelectorAll('input[name="choice"]');
  
    // 2. Loop through all choice elements to find the selected one
    choices.forEach(choice => {
      if (choice.checked) {
        selectedAnswer = choice.value; // Store the selected answer
      }
    });
  
    // 3. If an answer is selected, check if it's correct and move to the next question
    if (selectedAnswer) {
      const isCorrect = quiz.checkAnswer(selectedAnswer); // Check if the selected answer is correct
      quiz.moveToNextQuestion(); // Move to the next question
  
      // Show the next question
      showQuestion();
    } else {
      alert("Please select an answer before proceeding.");
    }
  }
  




  function showResults() {
    // 1. Hide the quiz view
    quizView.style.display = "none";
  
    // 2. Show the end view
    endView.style.display = "flex";
  
    // 3. Update the result container with the score
    const correctAnswers = quiz.getCorrectAnswersCount(); // Get the number of correct answers
    resultContainer.innerText = `You scored ${correctAnswers} out of ${quiz.totalQuestions} correct answers!`;
  }
});  